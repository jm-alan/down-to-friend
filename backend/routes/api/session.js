const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateLogin = [
  check('identification')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

router.post('/', validateLogin, asyncHandler(async (req, res, next) => {
  const {
    body:
    { identification, password }
  } = req;

  const user = await User.login({ identification, password });

  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The email or password provided is incorrect.'];
    return next(err);
  }

  setTokenCookie(res, user);

  return res.json({ user });
}));

router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  return user
    ? res.json({ user: user.toSafeObject() })
    : res.json({});
});

module.exports = router;
