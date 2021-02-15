'use strict';
module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define('Conversation', {
    name: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  Conversation.associate = function (models) {
    const notifiedMap = {
      as: 'NotifiedUsers',
      through: models.Notification,
      foreignKey: 'conversationId',
      otherKey: 'userId'
    };
    const rosterMap = {
      as: 'ChattingUsers',
      through: models.RosterEntry,
      foreignKey: 'conversationId',
      otherKey: 'userId'
    };
    Conversation.hasMany(models.Message, { foreignKey: 'conversationId' });
    Conversation.hasMany(models.Notification, { foreignKey: 'conversationId' });
    Conversation.belongsTo(models.User, { as: 'ChatOwner', foreignKey: 'createdBy' });
    Conversation.belongsToMany(models.User, notifiedMap);
    Conversation.belongsToMany(models.User, rosterMap);
  };
  return Conversation;
};
