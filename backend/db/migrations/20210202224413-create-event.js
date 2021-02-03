'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users'
        }
      },
      dateTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      minGroup: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      maxGroup: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      closes: {
        type: Sequelize.DATE,
        allowNull: false
      },
      tags: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};
