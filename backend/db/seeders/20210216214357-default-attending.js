'use strict';

function defaultAttending () {
  const attending = [];
  for (let i = 1; i <= 1000; i++) {
    for (let j = 1; j <= 4; j++) {
      attending.push({ userId: Math.ceil(Math.random() * 99), eventId: i });
    }
  }
  return attending;
}

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Attendees', defaultAttending());
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Attendees', null, {});
  }
};
