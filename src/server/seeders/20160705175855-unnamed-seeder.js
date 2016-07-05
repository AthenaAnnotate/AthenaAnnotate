'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Groups', [
      { name: 'Reformed Jet Humblers', creatorId: 1, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { name: 'Awful Street Wedge', creatorId: 2, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { name: 'Longshot Damage', creatorId: 3, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { name: 'Lucky Bedtime Oxen', creatorId: 4, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { name: 'Standing Luck Racers', creatorId: 5, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
