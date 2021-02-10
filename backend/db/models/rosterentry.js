'use strict';
module.exports = (sequelize, DataTypes) => {
  const RosterEntry = sequelize.define('RosterEntry', {
    userId: DataTypes.INTEGER,
    conversationId: DataTypes.INTEGER
  }, {});
  RosterEntry.associate = function (models) {
    RosterEntry.belongsTo(models.User, { foreignKey: 'userId' });
    RosterEntry.belongsTo(models.Conversation, { foreignKey: 'conversationId' });
  };
  return RosterEntry;
};
