'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    facebookId: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Annotation);
      }
    }
  });
  return User;
};
