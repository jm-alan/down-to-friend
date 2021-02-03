const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');

const { User, Event, Image } = require('../../db/models');
const { restoreUser } = require('../../utils/auth');

router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const { user, query: { longitude, latitude } } = req;
  if (!user && !longitude) return res.json({ success: false });
  if (longitude) {
    const localEvents = await Event.findAll({
      where: {
        longitude: {
          [Op.between]: [+longitude - 0.5, +longitude + 0.5]
        },
        latitude: {
          [Op.between]: [+latitude - 0.5, +latitude + 0.5]
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
    return res.json({ list: localEvents });
  }
}));

module.exports = router;
