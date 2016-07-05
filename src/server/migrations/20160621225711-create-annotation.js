'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Annotations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.TEXT,
        unique: true,
        allowNull: false
      },
      text: {
        type: Sequelize.TEXT
      },
      source: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      exact: {
        type: Sequelize.TEXT
      },
      prefix: {
        type: Sequelize.TEXT
      },
      suffix: {
        type: Sequelize.TEXT
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      DocId: {
        type: Sequelize.INTEGER
      },
      private: {
        type: Sequelize.BOOLEAN // ,
        // allowNull: false
      },
      groupId: {
        type: Sequelize.INTEGER
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Annotations');
  }
};
