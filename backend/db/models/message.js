'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    senderId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Message.associate = function (models) {
    Message.belongsTo(models.User, { as: 'Sender', foreignKey: 'senderId' });
    Message.belongsTo(models.User, { as: 'Recipient', foreignKey: 'recipientId' });
  };
  return Message;
};
