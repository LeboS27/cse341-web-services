async function requireAuth(req, res, next) {
  try {
    const header = req.get('authorization') || '';
    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'Log in with GitHub OAuth, then send the token as Authorization: Bearer <token>.',
      });
    }

    const result = await req.app.locals.store.auth.findSession(token);
    if (!result) {
      return res.status(401).json({
        error: 'Authentication required',
        message: 'The login token is missing, expired, or invalid.',
      });
    }

    req.authToken = token;
    req.user = result.user;
    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = { requireAuth };
