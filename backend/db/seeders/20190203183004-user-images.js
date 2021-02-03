'use strict';

const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      { url: faker.image.people(50, 50) },
      { url: faker.image.people(50, 50) },
      { url: faker.image.people(50, 50) },
      { url: faker.image.people(50, 50) },
      { url: faker.image.people(50, 50) },
      { url: faker.image.people(50, 50) },
      { url: faker.image.people(50, 50) },
      { url: faker.image.people(50, 50) },
      { url: faker.image.people(50, 50) },
      { url: faker.image.people(50, 50) }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Images', null, {});
  }
};
