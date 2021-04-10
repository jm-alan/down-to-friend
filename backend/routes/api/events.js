const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');

const { User, Event, EventPost } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

router.get('/:eventId(\\d+)/posts', asyncHandler(async (req, res) => {
  const { params: { eventId } } = req;
  const posts = await EventPost.findAll({
    where: { eventId },
    include: {
      model: User,
      as: 'Author',
      include: ['Avatar']
    }
  });
  return res.json({ posts });
}));

router.get('/tagged/:tag(\\w+)', asyncHandler(async (req, res) => {
  const { params: { tag } } = req;
  const events = Event.findAll({
    where: {
      tags: {
        [Op.regexp]: `^${tag}(?= )|(?<= )${tag}(?= )|(?<= )${tag}$`
      }
    }
  });
  return res.json({ events });
}));

router.post('/:eventId(\\d+)/posts', requireAuth, asyncHandler(async (req, res) => {
  const { user, params: { eventId }, body: { body } } = req;
  const event = await Event.findByPk(eventId);
  if (!event) return res.json({ success: false, reason: 'That event does not exist.' });
  try {
    if (await event.hasAttendingUser(user)) {
      await user.createEventComment({ eventId, body });
      return res.json({ success: true });
    }
    return res.json({
      success: false,
      reason: 'You must be attending an avent to comment.'
    });
  } catch (err) {
    console.error(err);
    console.error(err.toString());
    return res.json({
      success: false,
      reason: 'Something went wrong. Please refresh the page and try again.'
    });
  }
}));

router.delete('/:eventId(\\d+)/posts/:postId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const { user, params: { eventId, postId } } = req;
  const event = Event.findByPk(eventId);
  if (!event) return res.json({ success: false, reason: 'That event does not exist.' });
  const post = await EventPost.findByPk(postId);
  if (!post) return res.json({ success: false, reason: 'That post does not exist.' });
  if (!(post.ownerId === user.id)) {
    return res.json({
      success: false,
      reason: 'That post belongs to another user.'
    });
  }
  await post.destroy();
  return res.json({ success: true });
}));

router.patch('/:eventId(\\d+)/posts/:postId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const { user, body: { body }, params: { eventId, postId } } = req;
  const event = await Event.findByPk(eventId);
  if (!event) return res.json({ success: false, reason: 'That event does not exist.' });
  const post = await EventPost.findByPk(postId);
  if (!post) return res.json({ success: false, reason: 'That post does not exist.' });
  if (!(post.ownerId === user.id)) {
    return res.json({
      success: false,
      reason: 'That post belongs to another user.'
    });
  }
  await post.update({ body });
  return res.json({ success: true });
}));

router.delete('/:eventId(\\d+)/attendees/me', requireAuth, asyncHandler(async (req, res) => {
  const { user, params: { eventId } } = req;
  const event = await Event.findByPk(eventId);
  if (!event) return res.json({ success: false });
  event.removeAttendingUser(user);
  return res.json({ success: true });
}));

router.post('/:eventId(\\d+)/attendees', requireAuth, asyncHandler(async (req, res) => {
  const { user, params: { eventId } } = req;
  const event = await Event.findByPk(eventId);
  if (!event) return res.json({ success: false, reason: 'That event does not exist.' });
  if (
    (await event.countAttendingUsers()) < event.maxGroup &&
    !(await event.hasAttendingUser(user))
  ) {
    event.addAttendingUser(user);
    return res.json({ success: true });
  } else return res.json({ success: false, reason: 'That event is full, or you are already attending.' });
}));

router.get('/:eventId', restoreUser, asyncHandler(async (req, res) => {
  const { user, params: { eventId } } = req;
  let event = await Event.findByPk(eventId, {
    include: [
      'AttendingUsers',
      {
        model: User,
        as: 'Host',
        include: ['Avatar']
      }
    ]
  });
  const isAttending = await event.hasAttendingUser(user);
  event = { ...event.dataValues, isAttending };
  return res.json({ event });
}));

router.post('/', requireAuth, asyncHandler(async (req, res) => {
  const { user, body: { event } } = req;
  try {
    const newEvent = await user.createHostedEvent(event);
    res.json({ success: true, newEvent });
  } catch (err) {
    res.json({ success: false, reason: 'Event creation failed.' });
  }
}));

router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const {
    query: {
      centerLng, centerLat,
      lowerLng, upperLng,
      lowerLat, upperLat
    },
    user
  } = req;
  if (!lowerLng || !upperLat) return res.json({ success: false });
  if (lowerLng) {
    const list = await Event.findAll({
      limit: 100,
      where: {
        longitude: {
          [Op.between]: [+lowerLng, +upperLng]
        },
        latitude: {
          [Op.between]: [+lowerLat, +upperLat]
        }
      },
      include: ['AttendingUsers',
        {
          model: User,
          as: 'Host',
          include: ['Avatar']
        }
      ]
    });
    await list.asyncMapInPlace(async event => ({
      ...event.dataValues,
      isAttending: !!(user && await event.hasAttendingUser(user)),
      distance: haversineDiff({ longitude: centerLng, latitude: centerLat }, event)
    }));
    list.sort((event1, event2) => event1.distance - event2.distance);
    return res.json({ list });
  }
}));

function haversineDiff (locationObject1, locationObject2) {
  const radiusOfTheEarthInDesiredUnits = 3958.8;
  const latitudeDifferentialInRadians = rad(locationObject2.latitude - locationObject1.latitude);
  const longitudeDifferentialInRadians = rad(locationObject2.longitude - locationObject1.longitude);
  const noIdea =
    Math.sin(latitudeDifferentialInRadians / 2) * Math.sin(latitudeDifferentialInRadians / 2) +
    Math.cos(rad(locationObject1.latitude)) * Math.cos(rad(locationObject2.latitude)) *
    Math.sin(longitudeDifferentialInRadians / 2) * Math.sin(longitudeDifferentialInRadians / 2)
    ;
  const noIdea2 = 2 * Math.atan2(Math.sqrt(noIdea), Math.sqrt(1 - noIdea));
  return radiusOfTheEarthInDesiredUnits * noIdea2;
}

function rad (deg) {
  return deg * (Math.PI / 180);
}

module.exports = router;
