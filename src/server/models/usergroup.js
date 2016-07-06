'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserGroup = sequelize.define('UserGroup', {
    UserId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER,
    adminRights: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        UserGroup.belongsTo(models.User, {
          foreignKey: 'UserId',
          as: 'groups'
        });
        UserGroup.belongsTo(models.Group, {
          foreignKey: 'GroupId',
          as: 'users'
        });
      }
    }
  });
  return UserGroup;
};
