'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    messageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  Notification.associate = function (models) {
    Notification.belongsTo(models.Message, { foreignKey: 'messageId' });
    Notification.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Notification;
};
