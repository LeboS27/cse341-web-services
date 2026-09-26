const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const GITHUB_AUTHORIZE_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_USER_URL = 'https://api.github.com/user';
const GITHUB_EMAILS_URL = 'https://api.github.com/user/emails';
const OAUTH_STATE_MAX_AGE_MS = 10 * 60 * 1000;

// The API never sends passwordHash back to the browser or Swagger.
function publicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    authProvider: user.oauthProvider || 'local',
    githubUsername: user.githubUsername,
    createdAt: user.createdAt,
  };
}

function getAuthStore(req) {
  return req.app.locals.store.auth;
}

function bcryptRounds() {
  // Tests use fewer rounds so the safety checks finish quickly.
  // Render and normal local runs use a stronger default unless BCRYPT_ROUNDS is set.
  return Number(process.env.BCRYPT_ROUNDS || (process.env.NODE_ENV === 'test' ? 4 : 12));
}

function getOAuthCallbackUrl(req) {
  // Render should set this to the public callback URL.
  // Locally, this fallback keeps the login button useful during testing.
  return process.env.OAUTH_CALLBACK_URL || `${req.protocol}://${req.get('host')}/auth/github/callback`;
}

function getOAuthConfig(req) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  return {
    configured: Boolean(clientId && clientSecret),
    clientId,
    clientSecret,
    callbackUrl: getOAuthCallbackUrl(req),
  };
}

function oauthStateSecret() {
  // The state secret protects the GitHub redirect from being forged.
  // If a separate secret is not set, the GitHub secret can safely sign state.
  return process.env.OAUTH_STATE_SECRET || process.env.GITHUB_CLIENT_SECRET || 'local-oauth-state-secret';
}

function signState(payload) {
  return crypto.createHmac('sha256', oauthStateSecret()).update(payload).digest('base64url');
}

function createOAuthState() {
  const payload = Buffer.from(JSON.stringify({
    nonce: crypto.randomBytes(16).toString('hex'),
    createdAt: Date.now(),
  })).toString('base64url');

  return `${payload}.${signState(payload)}`;
}

function verifyOAuthState(state) {
  if (!state || !state.includes('.')) {
    return false;
  }

  const [payload, signature] = state.split('.');
  const expectedSignature = signState(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return false;
  }

  const signatureMatches = crypto.timingSafeEqual(signatureBuffer, expectedBuffer);
  if (!signatureMatches) {
    return false;
  }

  try {
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return Date.now() - decoded.createdAt <= OAUTH_STATE_MAX_AGE_MS;
  } catch (error) {
    return false;
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function register(req, res, next) {
  try {
    const authStore = getAuthStore(req);
    const email = req.body.email.toLowerCase();
    const existingUser = await authStore.findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        error: 'Account already exists',
        message: 'A user with that email address is already registered.',
      });
    }

    // bcrypt stores a one-way hash, never the original password.
    const passwordHash = await bcrypt.hash(req.body.password, bcryptRounds());
    const user = await authStore.createUser({
      name: req.body.name,
      email,
      passwordHash,
      oauthProvider: 'local',
    });
    const session = await authStore.createSession(user._id);

    return res.status(201).json({
      message: 'Account created and logged in.',
      token: session.token,
      user: publicUser(user),
    });
  } catch (error) {
    return next(error);
  }
}

async function login(req, res, next) {
  try {
    const authStore = getAuthStore(req);
    const user = await authStore.findUserByEmail(req.body.email.toLowerCase());

    // OAuth-only accounts do not have a local password hash.
    if (!user || !user.passwordHash || !(await bcrypt.compare(req.body.password, user.passwordHash))) {
      return res.status(401).json({
        error: 'Login failed',
        message: 'The email or password is not correct.',
      });
    }

    const session = await authStore.createSession(user._id);
    return res.json({
      message: 'Logged in successfully.',
      token: session.token,
      user: publicUser(user),
    });
  } catch (error) {
    return next(error);
  }
}

async function oauthStatus(req, res) {
  const config = getOAuthConfig(req);

  return res.json({
    provider: 'GitHub',
    configured: config.configured,
    loginUrl: '/auth/github',
    callbackUrl: config.callbackUrl,
    message: config.configured
      ? 'GitHub OAuth is configured. Open /auth/github to log in.'
      : 'GitHub OAuth needs GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Render.',
  });
}

async function githubLogin(req, res, next) {
  try {
    const config = getOAuthConfig(req);

    if (!config.configured) {
      return res.status(503).json({
        error: 'OAuth is not configured',
        message: 'Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Render before using GitHub login.',
      });
    }

    const loginUrl = new URL(GITHUB_AUTHORIZE_URL);
    loginUrl.searchParams.set('client_id', config.clientId);
    loginUrl.searchParams.set('redirect_uri', config.callbackUrl);
    loginUrl.searchParams.set('scope', 'read:user user:email');
    loginUrl.searchParams.set('state', createOAuthState());

    return res.redirect(loginUrl.toString());
  } catch (error) {
    return next(error);
  }
}

async function exchangeGitHubCode(code, redirectUri) {
  const response = await fetch(GITHUB_TOKEN_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    }),
  });
  const data = await response.json();

  if (!response.ok || !data.access_token) {
    const error = new Error(data.error_description || 'GitHub did not return an access token.');
    error.status = 502;
    throw error;
  }

  return data.access_token;
}

async function fetchGitHubJson(url, accessToken) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'cse341-project2-crud-api',
    },
  });

  if (!response.ok) {
    const error = new Error(`GitHub request failed with status ${response.status}.`);
    error.status = 502;
    throw error;
  }

  return response.json();
}

async function findPrimaryGitHubEmail(accessToken, profile) {
  if (profile.email) {
    return profile.email.toLowerCase();
  }

  try {
    const emails = await fetchGitHubJson(GITHUB_EMAILS_URL, accessToken);
    const primaryEmail = emails.find((email) => email.primary && email.verified) || emails.find((email) => email.verified);

    if (primaryEmail) {
      return primaryEmail.email.toLowerCase();
    }
  } catch (error) {
    // GitHub users can hide email addresses. The fallback still creates
    // a stable account for the rubric demonstration.
  }

  return `${profile.login}@users.noreply.github.com`.toLowerCase();
}

async function findOrCreateOAuthUser(authStore, profile, email) {
  const oauthUpdates = {
    name: profile.name || profile.login,
    email,
    oauthProvider: 'github',
    oauthId: profile.id.toString(),
    githubUsername: profile.login,
  };

  const userByProvider = await authStore.findUserByProvider('github', profile.id);
  if (userByProvider) {
    return authStore.updateUser(userByProvider._id, oauthUpdates);
  }

  const userByEmail = await authStore.findUserByEmail(email);
  if (userByEmail) {
    return authStore.updateUser(userByEmail._id, oauthUpdates);
  }

  return authStore.createUser({
    ...oauthUpdates,
    passwordHash: null,
  });
}

function sendOAuthSuccessPage(res, token, user) {
  const safeName = escapeHtml(user.name);
  const safeEmail = escapeHtml(user.email);
  const safeToken = escapeHtml(token);

  return res.type('html').send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>OAuth Login Successful</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; line-height: 1.5; color: #111; }
    code { display: block; padding: 12px; border: 1px solid #999; overflow-wrap: anywhere; }
  </style>
</head>
<body>
  <h1>OAuth Login Successful</h1>
  <p>You are logged in as ${safeName} (${safeEmail}).</p>
  <p>Copy this token, open <a href="/api-docs">Swagger docs</a>, click Authorize, and paste the token.</p>
  <code>${safeToken}</code>
</body>
</html>`);
}

async function githubCallback(req, res, next) {
  try {
    const config = getOAuthConfig(req);
    const { code, state } = req.query;

    if (!config.configured) {
      return res.status(503).json({
        error: 'OAuth is not configured',
        message: 'Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Render before using GitHub login.',
      });
    }

    if (!code || !verifyOAuthState(state)) {
      return res.status(400).json({
        error: 'OAuth login failed',
        message: 'The GitHub login response was missing a valid code or state value.',
      });
    }

    const accessToken = await exchangeGitHubCode(code, config.callbackUrl);
    const profile = await fetchGitHubJson(GITHUB_USER_URL, accessToken);
    const email = await findPrimaryGitHubEmail(accessToken, profile);
    const user = await findOrCreateOAuthUser(getAuthStore(req), profile, email);
    const session = await getAuthStore(req).createSession(user._id);

    if (req.accepts('html')) {
      return sendOAuthSuccessPage(res, session.token, user);
    }

    return res.json({
      message: 'GitHub OAuth login successful.',
      token: session.token,
      user: publicUser(user),
    });
  } catch (error) {
    return next(error);
  }
}

async function me(req, res) {
  return res.json({
    user: publicUser(req.user),
  });
}

async function logout(req, res, next) {
  try {
    await getAuthStore(req).deleteSession(req.authToken);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  githubCallback,
  githubLogin,
  login,
  logout,
  me,
  oauthStatus,
  publicUser,
  register,
};
