const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn }
  );

  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('token', token, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'Lax'
  });

  return token;
};

const restoreUser = (req, res, next) => {
  const token = req.cookies.token ?? req.params.mobileToken;

  jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) return next();

    try {
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id, {
        include: ['Avatar']
      });
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.user) {
      res.clearCookie('token');
    }

    next();
  });
};

const socketRequireAuth = (socket, next) => {
  try {
    const patternMatch = string => string.match(/(?<=(^)token=)([a-zA-Z0-9-._]+)/);
    const token = socket.handshake.headers.cookie.split('; ').filter(patternMatch)[0].split('=')[1];
    jwt.verify(token, secret, null, async (err, payload) => {
      if (err) {
        return socket.disconnect(true);
      }

      try {
        const { id } = payload.data;
        socket.user = await User.scope('currentUser').findByPk(id, {
          include: ['Avatar']
        });
      } catch (payloadErr) {
        return socket.disconnect(true);
      }

      if (!socket.user) return socket.disconnect(true);

      return next();
    });
  } catch (err) {
    return socket.disconnect(true);
  }
};

const requireAuth = [
  restoreUser,
  function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
  }
];

module.exports = {
  setTokenCookie,
  restoreUser,
  requireAuth,
  socketRequireAuth
};
