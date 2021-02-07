'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

const createUsers = () => {
  const users = [];
  for (let i = 1; i < 100; i++) {
    users.push({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      avatarId: 1,
      hashedPassword: bcrypt.hashSync(faker.internet.password())
    });
  }
  return users;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'admin@dtf.io',
        firstName: 'Admin',
        avatarId: 1,
        hashedPassword: '$2a$10$u7QLeGRHwQjjoQyLEyO3rO4tMZj5R2./S8/4tK76ef1jJ8Pb5K3um'
      },
      {
        email: 'demo@user.io',
        firstName: 'Demo',
        avatarId: 1,
        hashedPassword: bcrypt.hashSync('password')
      },
      ...createUsers()
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
