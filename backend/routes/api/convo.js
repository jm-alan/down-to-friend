const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

router.post('/', requireAuth, asyncHandler(async (req, res) => {
  let { user, body: { userIds, name } } = req;
  if (
    !userIds.length ||
    (userIds.length === 1 && userIds[0] === user.id)
  ) return res.json({ convo: null });
  name ?? (name = '');
  const convo = await user.createOwnedConversation({ name });
  await convo.addChattingUser(user);
  await userIds.asyncForEach(async userId => {
    const userToAdd = await User.findByPk(userId);
    userToAdd && (await convo.addChattingUser(userToAdd));
  });
  return res.json({ convo });
}));

module.exports = router;
