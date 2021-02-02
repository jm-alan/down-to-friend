'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventDetailImage = sequelize.define('EventDetailImage', {
    imageId: DataTypes.INTEGER,
    evenId: DataTypes.INTEGER
  }, {});
  EventDetailImage.associate = function (models) {
    EventDetailImage.belongsTo(models.Event, { foreignKey: 'eventId' });
    EventDetailImage.belongsTo(models.Image, { foreignKey: 'imageId' });
  };
  return EventDetailImage;
};
