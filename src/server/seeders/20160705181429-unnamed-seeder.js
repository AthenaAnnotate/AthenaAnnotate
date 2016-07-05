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
    return queryInterface.bulkInsert('Annotations', [
      { url: 'http://localhost:3000/api/test/annote0/1', text: '', source: 'http://localhost:3000/api/test', exact: 'Maecenas eget sem sed tortor imperdiet ornare vel nec nibh. Maecenas nulla eros, facilisis sed est non, blandit imperdiet ligula.', prefix: 'metus vel accumsan. ', suffix: ' Pellentesque habita', UserId: 1, DocId: 1, private: 'Public', groupId: 1, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { url: 'http://localhost:3000/api/test/annote1/1', text: '', source: 'http://localhost:3000/api/test', exact: 'gravida eros vitae, sagittis tellus. Sed tincidunt eros vitae convallis pretium.', prefix: ', ', suffix: ' Phasellus massa mag', UserId: 1, DocId: 1, private: 'Public', groupId: 1, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { url: 'http://localhost:3000/api/test/annote0/2', text: '', source: 'http://localhost:3000/api/test', exact: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla tortor diam, auctor eget lectus vel, bibendum tincidunt sapien.', prefix: ' venenatis a lacus. ', suffix: ' Etiam egestas phare', UserId: 2, DocId: 1, private: 'Public', groupId: 1, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() },
      { url: 'http://localhost:3000/api/test/annote1/2', text: '', source: 'http://localhost:3000/api/test', exact: 'Quisque tincidunt lorem augue, quis volutpat odio mattis a. In placerat dui quis facilisis commodo. Curabitur scelerisque aliquam feugiat. ', prefix: 'interdum vulputate. ', suffix: 'Duis et pretium orci', UserId: 2, DocId: 1, private: 'Public', groupId: 1, createdAt: (new Date()).toISOString(), updatedAt: (new Date()).toISOString() }
    ]);
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
