'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    senderId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Message.associate = function (models) {
    const unreadMap = {
      as: 'NotifiedUsers',
      through: models.Notification,
      foreignKey: 'messageId',
      otherKey: 'userId'
    };
    Message.belongsTo(models.User, { as: 'Sender', foreignKey: 'senderId' });
    Message.belongsTo(models.User, { as: 'Recipient', foreignKey: 'recipientId' });
    Message.hasMany(models.Notification, { foreignKey: 'messageId' });
    Message.belongsToMany(models.User, unreadMap);
  };
  return Message;
};
