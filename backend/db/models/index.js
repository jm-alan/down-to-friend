'use strict';

const Sequelize = require('sequelize');
const config = require('../../config/database')[process.env.NODE_ENV || 'development'];

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

const db = {
  User: require('./user')(sequelize, Sequelize.DataTypes),
  Event: require('./event')(sequelize, Sequelize.DataTypes),
  Image: require('./image')(sequelize, Sequelize.DataTypes),
  Attendee: require('./attendee')(sequelize, Sequelize.DataTypes),
  Conversation: require('./conversation')(sequelize, Sequelize.DataTypes),
  EventDetailImage: require('./eventdetailimage')(sequelize, Sequelize.DataTypes),
  EventPost: require('./eventpost')(sequelize, Sequelize.DataTypes),
  Message: require('./message')(sequelize, Sequelize.DataTypes),
  Notification: require('./notification')(sequelize, Sequelize.DataTypes),
  RosterEntry: require('./rosterentry')(sequelize, Sequelize.DataTypes),
  sequelize,
  Sequelize
};

Object.values(db).forEach(model => model.associate && model.associate(db));

module.exports = db;
