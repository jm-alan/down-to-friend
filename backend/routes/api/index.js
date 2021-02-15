const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const sessionRouter = require('./session');
const usersRouter = require('./users');
const eventsRouter = require('./events');
const searchRouter = require('./search');
const convoRouter = require('./convo');

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');
router.get(
  '/set-token-cookie',
  asyncHandler(async (req, res) => {
    const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
    setTokenCookie(res, user);
    return res.json({ user });
  })
);

const { restoreUser } = require('../../utils/auth.js');
router.get('/restore-user', restoreUser, (req, res) => {
  return res.json(req.user);
});

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/events', eventsRouter);

router.use('/search', searchRouter);

router.use('/conversations', convoRouter);

module.exports = router;
