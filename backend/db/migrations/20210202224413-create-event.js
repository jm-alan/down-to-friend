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
      location: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};
