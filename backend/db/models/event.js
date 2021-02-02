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
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};