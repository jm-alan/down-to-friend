'use strict';
module.exports = (sequelize, DataTypes) => {
  const EventPost = sequelize.define('EventPost', {
    ownerId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {});
  EventPost.associate = function (models) {
    EventPost.belongsTo(models.User, { foreignKey: 'ownerId' });
    EventPost.belongsTo(models.Event, { foreignKey: 'eventId' });
  };
  return EventPost;
};
