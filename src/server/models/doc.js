'use strict';
module.exports = function(sequelize, DataTypes) {
  var Doc = sequelize.define('Doc', {
    image: DataTypes.TEXT,
    title: DataTypes.TEXT,
    url: {
      type: DataTypes.TEXT,
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Doc.hasMany(models.Annotation);
      }
    }
  });
  return Doc;
};
