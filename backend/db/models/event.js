'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    ownerId: DataTypes.INTEGER,
    dateTime: DataTypes.DATE,
    minGroup: DataTypes.INTEGER,
    maxGroup: DataTypes.INTEGER,
    location: DataTypes.INTEGER,
    description: DataTypes.INTEGER,
    closes: DataTypes.DATE,
    tags: DataTypes.STRING
  }, {});
  Event.associate = function (models) {
    const attendeeMap = {
      as: 'Attendees',
      through: models.Attendee,
      foreignKey: 'eventId',
      otherKey: 'userId'
    };
    const detailImageMap = {
      as: 'DetailPhotos',
      through: models.EventDetailImage,
      foreignKey: 'eventId',
      otherKey: 'imageId'
    };
    Event.hasMany(models.Attendee, { foreignKey: 'eventId' });
    Event.belongsTo(models.User, { foreignKey: 'ownerId' });
    Event.belongsToMany(models.User, attendeeMap);
    Event.hasMany(models.EventDetailImage, { foreignKey: 'eventId' });
    Event.belongsToMany(models.EventDetailImage, detailImageMap);
    Event.hasMany(models.EventPost, { foreignKey: 'eventId' });
  };
  return Event;
};
