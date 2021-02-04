'use strict';

const faker = require('faker');

const events = [];

for (let i = 0; i < 5000; i++) {
  const dateTime = faker.date.future();
  events.push({
    ownerId: 1,
    dateTime,
    minGroup: 3,
    maxGroup: i % 6 + 4,
    latitude: faker.address.latitude(48.5, 30),
    longitude: faker.address.longitude(-82, -122),
    title: faker.lorem.words(2),
    description: faker.lorem.words(200),
    closes: new Date(Date.parse(dateTime) - 1000 * 60 * 60 * 24 * 7),
    tags: `${faker.lorem.words(15)}`
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', events);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
