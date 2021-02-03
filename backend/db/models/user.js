'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
          isNotEmail (value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256]
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ['hashedPassword'] }
        },
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  User.associate = function (models) {
    const attendeeMap = {
      as: 'AttendingEvents',
      through: models.Attendee,
      foreignKey: 'userId',
      otherKey: 'eventId'
    };
    const unreadMap = {
      as: 'UnreadMessages',
      through: models.Notification,
      foreignKey: 'userId',
      otherKey: 'messageId'
    };
    User.hasMany(models.Event, { as: 'CreatedEvents', foreignKey: 'ownerId' });
    User.hasMany(models.EventPost, { as: 'PostComments', foreignKey: 'ownerId' });
    User.hasMany(models.Message, { as: 'SentMessages', foreignKey: 'senderId' });
    User.hasMany(models.Message, { as: 'ReceivedMessages', foreignKey: 'recipientId' });
    User.hasMany(models.Notification, { foreignKey: 'userId' });
    User.hasMany(models.Attendee, { foreignKey: 'userId' });
    User.belongsToMany(models.Event, attendeeMap);
    User.belongsToMany(models.Message, unreadMap);
  };
  User.prototype.toSafeObject = function () {
    const { id, username, email } = this;
    return { id, username, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id);
  };

  User.login = async function ({ identification, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: identification,
          email: identification
        }
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  return User;
};
