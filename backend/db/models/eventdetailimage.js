'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventDetailImage = sequelize.define('EventDetailImage', {
    imageId: DataTypes.INTEGER,
    evenId: DataTypes.INTEGER
  }, {});
  EventDetailImage.associate = function(models) {
    // associations can be defined here
  };
  return EventDetailImage;
};