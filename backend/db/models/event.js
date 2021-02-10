'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    ownerId: DataTypes.INTEGER,
    dateTime: DataTypes.DATE,
    minGroup: DataTypes.INTEGER,
    maxGroup: DataTypes.INTEGER,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    closes: DataTypes.DATE,
    tags: DataTypes.STRING
  }, {});
  Event.associate = function (models) {
    const attendeeMap = {
      as: 'AttendingUsers',
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
    const fKey = { foreignKey: 'eventId' };

    [models.Attendee, models.EventPost, models.EventDetailImage]
      .forEach(model => Event.hasMany(model, fKey));
    Event.belongsTo(models.User, { as: 'Host', foreignKey: 'ownerId' });
    Event.belongsToMany(models.User, attendeeMap);
    Event.belongsToMany(models.Image, detailImageMap);
  };
  return Event;
};
