'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventPost = sequelize.define('EventPost', {
    ownerId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  EventPost.associate = function(models) {
    // associations can be defined here
  };
  return EventPost;
};