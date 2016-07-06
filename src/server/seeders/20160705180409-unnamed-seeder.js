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
    return queryInterface.bulkInsert('UserGroups', [
      { UserId: 1, GroupId: 1, adminRights: true, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 2, GroupId: 2, adminRights: true, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 3, GroupId: 3, adminRights: true, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 4, GroupId: 4, adminRights: true, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 5, GroupId: 5, adminRights: true, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 1, GroupId: 2, adminRights: false, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 1, GroupId: 3, adminRights: false, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 2, GroupId: 3, adminRights: false, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 2, GroupId: 1, adminRights: false, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 3, GroupId: 4, adminRights: false, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 3, GroupId: 5, adminRights: false, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 4, GroupId: 5, adminRights: false, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 4, GroupId: 1, adminRights: false, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 5, GroupId: 1, adminRights: false, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 5, GroupId: 2, adminRights: false, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { UserId: 101, GroupId: 1, adminRights: false, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
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
