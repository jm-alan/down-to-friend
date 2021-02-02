'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('EventDetailImages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Images'
        }
      },
      evenId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Events'
        }
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
    return queryInterface.dropTable('EventDetailImages');
  }
};
