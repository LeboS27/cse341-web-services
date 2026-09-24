const bcrypt = require('bcryptjs');

// The API never sends passwordHash back to the browser or Swagger.
function publicUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
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

    if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) {
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
  login,
  logout,
  me,
  publicUser,
  register,
};
