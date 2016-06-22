'use strict';
module.exports = function(sequelize, DataTypes) {
  var Doc = sequelize.define('Doc', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    url: {
      type: DataTypes.STRING,
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
