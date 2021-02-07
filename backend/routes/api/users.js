const express = require('express');
const { check, body } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.get('/me/locale', requireAuth, asyncHandler(async (req, res) => {
  const { user: { defaultLocale } } = req;
  if (defaultLocale) return res.json(JSON.parse(defaultLocale));
  res.json({ lat: null, lng: null });
}));

router.post('/me/locale', requireAuth, asyncHandler(async (req, res) => {
  const { user, body: { locale } } = req;
  try {
    await user.update({
      defaultLocale: JSON.stringify(locale)
    });
    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    console.error(err.toString());
    console.error('The above error occured during User locale update @ POST/api/users/me/locale');
    return res.json({ success: false });
  }
}));

router.post('/', validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });

  await setTokenCookie(res, user);

  return res.json({ user });
})
);

module.exports = router;
