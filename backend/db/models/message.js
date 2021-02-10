'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    senderId: DataTypes.INTEGER,
    conversationId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Message.associate = function (models) {
    Message.belongsTo(models.User, { as: 'Sender', foreignKey: 'senderId' });
    Message.belongsTo(models.Conversation, { foreignKey: 'conversationId' });
  };
  return Message;
};
