'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BootcampDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BootcampDetail.init({
    fee: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    studentLimit: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BootcampDetail',
  });
  return BootcampDetail;
};