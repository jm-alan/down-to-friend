const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');

const { User, Event, Image } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');

router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const { user, query: { longitude, latitude, lngDiff, latDiff } } = req;
  if (!longitude || !latitude) return res.json({ success: false });
  const lngSpread = +lngDiff / 2;
  const latSpread = +latDiff / 2;
  if (longitude) {
    const localEvents = await Event.findAll({
      limit: 100,
      where: {
        longitude: {
          [Op.between]: [+longitude - lngSpread, +longitude + lngSpread]
        },
        latitude: {
          [Op.between]: [+latitude - latSpread, +latitude + latSpread]
        }
      },
      include: [
        {
          model: User,
          include: {
            model: Image,
            as: 'Avatar'
          }
        },
        {
          model: User,
          as: 'EventAttendees'
        }
      ]
    });
    localEvents.sort((event1, event2) => {
      const event1distance = Math.sqrt(
        (event1.longitude - longitude) ** 2 + (event1.latitude - latitude) ** 2
      );
      const event2distance = Math.sqrt(
        (event2.longitude - longitude) ** 2 + (event2.latitude - latitude) ** 2
      );
      return event1distance - event2distance;
    });
    return res.json({ list: localEvents });
  }
}));

module.exports = router;
