const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');

const { User, Event } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');

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
  console.log('Event found at POST/attendees:', event);
  if (!event) return res.json({ success: false });
  if ((await event.countAttendingUsers()) < event.maxGroup && !(await event.hasAttendingUser(user))) {
    event.addAttendingUser(user);
    return res.json({ success: true });
  } else return res.json({ success: false });
}));

router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const {
    query: {
      centerLng,
      centerLat,
      lowerLng,
      upperLng,
      lowerLat,
      upperLat
    },
    user
  } = req;
  if (!lowerLng || !upperLat) return res.json({ success: false });
  if (lowerLng) {
    let localEvents = await Event.findAll({
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
    if (user) {
      await localEvents.asyncForEach(async event => {
        event.isAttending = await event.hasAttendingUser(user);
      });
      localEvents = localEvents.map(({
        id,
        tags,
        Host,
        title,
        closes,
        maxGroup,
        dateTime,
        latitude,
        longitude,
        createdAt,
        description,
        isAttending,
        AttendingUsers
      }) => ({
        id,
        tags,
        Host,
        title,
        closes,
        maxGroup,
        dateTime,
        latitude,
        longitude,
        createdAt,
        description,
        isAttending,
        AttendingUsers
      }));
    }
    localEvents.sort((event1, event2) => {
      const event1distance = Math.sqrt(
        (event1.longitude - centerLng) ** 2 + (event1.latitude - centerLat) ** 2
      );
      const event2distance = Math.sqrt(
        (event2.longitude - centerLng) ** 2 + (event2.latitude - centerLat) ** 2
      );
      return event1distance - event2distance;
    });
    return res.json({ list: localEvents });
  }
}));

module.exports = router;
