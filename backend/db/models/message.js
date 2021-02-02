'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    senderId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};