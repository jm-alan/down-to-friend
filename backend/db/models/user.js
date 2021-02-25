'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 30],
          isNotEmail (value) {
            if (Validator.isEmail(value)) {
              throw new Error('Cannot be an email.');
            }
          },
          isValid (value) {
            if (value.match(/[^a-zA-Z-]/)) {
              throw new Error(
                `Currently, first names may only contain the letters A-Z, or a hyphen.
                We apologize for the inconvenience.`
              );
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
      },
      avatarId: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      defaultLocale: {
        type: DataTypes.STRING,
        allowNull: true
      },
      maxPins: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['defaultLocale', 'hashedPassword', 'email', 'createdAt', 'updatedAt']
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
      as: 'UnreadConversations',
      through: models.Notification,
      foreignKey: 'userId',
      otherKey: 'conversationId'
    };
    const convoMap = {
      as: 'Chats',
      through: models.RosterEntry,
      foreignKey: 'userId',
      otherKey: 'conversationId'
    };

    User.hasMany(models.Attendee, { foreignKey: 'userId' });
    User.hasMany(models.Notification, { foreignKey: 'userId' });
    User.hasMany(models.Event, { as: 'HostedEvents', foreignKey: 'ownerId' });
    User.hasMany(models.Message, { as: 'SentMessages', foreignKey: 'senderId' });
    User.hasMany(models.EventPost, { as: 'EventComments', foreignKey: 'ownerId' });
    User.hasMany(models.Conversation, { as: 'OwnedConversations', foreignKey: 'createdBy' });
    User.belongsTo(models.Image, { as: 'Avatar', foreignKey: 'avatarId' });
    User.belongsToMany(models.Event, attendeeMap);
    User.belongsToMany(models.Conversation, unreadMap);
    User.belongsToMany(models.Conversation, convoMap);
  };

  User.prototype.toSafeObject = function () {
    const { id, firstName, email, maxPins, Avatar } = this;
    return { id, firstName, email, maxPins, Avatar };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope('currentUser').findByPk(id, {
      include: ['Avatar']
    });
  };

  User.login = async function ({ identification, password }) {
    const user = await User.scope('loginUser').findOne({
      where: {
        email: identification
      }
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id, {
        include: ['Avatar']
      });
    }
  };

  User.signup = async function ({ firstName, email, password, maxPins }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      email,
      hashedPassword,
      maxPins
    });
    return await User.scope('currentUser').findByPk(user.id, {
      include: ['Avatar']
    });
  };

  return User;
};
