const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');

const { User, Event, Image } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');

router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const {
    query: {
      centerLng,
      centerLat,
      lowerLng,
      upperLng,
      lowerLat,
      upperLat
    }
  } = req;
  if (!lowerLng || !upperLat) return res.json({ success: false });
  if (lowerLng) {
    const localEvents = await Event.findAll({
      limit: 100,
      where: {
        longitude: {
          [Op.between]: [+lowerLng, +upperLng]
        },
        latitude: {
          [Op.between]: [+lowerLat, +upperLat]
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
