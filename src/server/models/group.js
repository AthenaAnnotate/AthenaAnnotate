'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    creatorId: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Group.belongsToMany(models.User, {
          as: 'users',
          through: models.UserGroup,
          foreignKey: 'GroupId'
        });
        Group.belongsToMany(models.User, {
          as: 'invites',
          through: models.UserInvite,
          foreignKey: 'GroupId'
        });
      }
    }
  });
  return Group;
};
