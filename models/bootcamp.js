'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bootcamp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bootcamp.belongsTo(models.BootcampDetail, {foreignKey: 'BootcampDetailId'});
      Bootcamp.hasMany(models.User, {foreginKey: 'BootcampId'});
    }
  }
  Bootcamp.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'bootcamp name is required'}
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'category is required'}
      }
    }
  }, {
    sequelize,
    modelName: 'Bootcamp',
  });
  return Bootcamp;
};