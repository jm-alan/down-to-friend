const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.post('/', requireAuth, asyncHandler(async (req, res) => {
  let { user, body: { userId, name } } = req;
  name ?? (name = '');
  const otherUser = await User.findByPk(userId);
  const convo = await user.createOwnedConversation({ name });
  await convo.addChattingUser(user);
  await convo.addChattingUser(otherUser);
  return res.json({ convo });
}));

module.exports = router;
