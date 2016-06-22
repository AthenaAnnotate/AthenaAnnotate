'use strict';
module.exports = function(sequelize, DataTypes) {
  var Annotation = sequelize.define('Annotation', {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true
    },
    annotation: DataTypes.JSON,
    userId: DataTypes.INTEGER,
    docId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Annotation.belongsTo(models.Doc);
        Annotation.belongsTo(models.User);
      }
    }
  });
  return Annotation;
};
