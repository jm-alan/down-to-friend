const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Conversation, Event, Notification } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isLength({ min: 2 })
    .withMessage('Please provide a name with at least 2 characters.'),
  check('username').not().isEmail().withMessage('Name cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

router.patch('/me/firstName', requireAuth, asyncHandler(async (req, res) => {
  const { user, body: { firstName } } = req;
  try {
    await user.update({ firstName });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    console.error('Short:', err.toString());
    res.json({ success: false });
  }
}));

router.post('/me/settings', requireAuth, asyncHandler(async (req, res) => {
  const { user, body: { pins: maxPins } } = req;
  try {
    user.update({ maxPins });
    return res.json({ success: true });
  } catch (err) {
    return res.json({ success: false });
  }
}));

router.get('/me/notifications', requireAuth, asyncHandler(async (req, res) => {
  const { user } = req;
  let notifications = await user.getNotifications({
    include: Conversation,
    order: [['createdAt', 'DESC']]
  });
  await notifications.asyncForEach(async notif => {
    const mostRecentMessage = (await notif.Conversation.getMessages({
      include: ['Sender'],
      order: [['createdAt', 'DESC']],
      limit: 1
    }))[0];
    notif.sender = mostRecentMessage.Sender.firstName;
    notif.content = mostRecentMessage.content;
  });
  notifications = notifications.map(notif => ({ ...notif.dataValues, sender: notif.sender, content: notif.content }));
  res.json({ notifications });
}));

router.delete('/me/notifications/:conversationId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const { user, params: { conversationId } } = req;
  const notif = await Notification.findOne({
    where: {
      userId: user.id,
      conversationId
    }
  });
  notif && await notif.destroy();
  return res.json({ success: true });
}));

router.delete('/me/notifications', requireAuth, asyncHandler(async (req, res) => {
  const { user } = req;
  const notifs = await user.getNotifications();
  await notifs.asyncForEach(async notif => await notif.destroy());
  return res.json({ success: true });
}));

router.get('/me/conversations', requireAuth, asyncHandler(async (req, res) => {
  const { user } = req;
  const conversations = await user.getChats({
    include: ['ChattingUsers']
  });
  return res.json({ conversations });
}));

router.get('/me/conversations/:id(\\d+)/messages', requireAuth, asyncHandler(async (req, res) => {
  const { user, params: { id } } = req;
  const convo = await Conversation.findByPk(id);
  if (!convo || !(await convo.hasChattingUser(user))) return res.json({ messages: [] });
  const messages = await convo.getMessages({
    include: [{
      model: User,
      as: 'Sender',
      include: ['Avatar']
    }],
    order: [['createdAt', 'ASC']]
  });
  return res.json({ messages });
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const { params: { id } } = req;
  const user = await User.findByPk(id, {
    include: ['Avatar']
  });
  return res.json({ user });
}));

router.get('/me', requireAuth, asyncHandler(async (req, res) => {
  const { user } = req;
  return res.json({ user });
}));

router.get('/me/locale', requireAuth, asyncHandler(async (req, res) => {
  const { user: { defaultLocale } } = req;
  if (defaultLocale) return res.json(JSON.parse(defaultLocale));
  return res.json({ lng: -98.5795, lat: 39.8283 });
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

router.get('/me/events/hosting', requireAuth, asyncHandler(async (req, res) => {
  const { user } = req;
  let events = await user.getHostedEvents({
    include: [
      'AttendingUsers',
      {
        model: User,
        as: 'Host',
        include: ['Avatar']
      }
    ]
  });
  events = events.map(event => ({ ...event.dataValues, isAttending: true }));
  return res.json({ events });
}));

router.get('/me/events/attending', requireAuth, asyncHandler(async (req, res) => {
  const { user } = req;
  let events = await user.getAttendingEvents({
    include: [
      'AttendingUsers',
      {
        model: User,
        as: 'Host',
        include: ['Avatar']
      }
    ]
  });
  events.sort(({ Attendee: { createdAt: a } }, { Attendee: { createdAt: b } }) => {
    return Date.parse(b) - Date.parse(a);
  });
  await events.asyncForEach(async event => {
    event.isAttending = await event.hasAttendingUser(user);
  });
  events = events.map(event => ({ ...event.dataValues, isAttending: event.isAttending }));
  return res.json({ events });
}));

router.get('/me/events/attending/:eventId(\\d+)/attendees', requireAuth, asyncHandler(async (req, res) => {
  const { user, params: { eventId } } = req;
  const event = await Event.findByPk(eventId);
  if (!event || !(await event.hasAttendingUser(user))) return res.json({ people: [] });
  let people = await event.getAttendingUsers();
  people = people.filter(person => person.id !== user.id);
  return res.json({ people });
}));

router.get('/:id(\\d+)/events/hosting', restoreUser, asyncHandler(async (req, res) => {
  const { params: { id }, user: loggedInUser } = req;
  const user = await User.findByPk(id);
  let events = await user.getHostedEvents({
    include: [
      'AttendingUsers',
      {
        model: User,
        as: 'Host',
        include: ['Avatar']
      }
    ]
  });
  loggedInUser && await events.asyncForEach(async event => {
    event.isAttending = await event.hasAttendingUser(loggedInUser);
  });
  events = events.map(event => ({ ...event.dataValues, isAttending: event.isAttending }));
  return res.json({ events });
}));

router.get('/:id(\\d+)/events/attending', restoreUser, asyncHandler(async (req, res) => {
  const { params: { id }, user: loggedInUser } = req;
  const user = await User.findByPk(id);
  let events = await user.getAttendingEvents({
    include: [
      'AttendingUsers',
      {
        model: User,
        as: 'Host',
        include: ['Avatar']
      }
    ]
  });
  loggedInUser && await events.asyncForEach(async event => {
    event.isAttending = await event.hasAttendingUser(loggedInUser);
  });
  events = events.map(event => ({ ...event.dataValues, isAttending: event.isAttending }));
  return res.json({ events });
}));

router.post('/', validateSignup, asyncHandler(async (req, res) => {
  const { email, password, firstName } = req.body;
  const user = await User.signup({
    email,
    firstName,
    password,
    maxPins: 50
  });

  setTokenCookie(res, user);

  return res.json({ user });
})
);

module.exports = router;
