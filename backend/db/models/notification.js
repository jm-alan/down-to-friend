'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    conversationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Notification.associate = function (models) {
    Notification.belongsTo(models.User, { foreignKey: 'userId' });
    Notification.belongsTo(models.Conversation, { foreignKey: 'conversationId' });
  };
  return Notification;
};
