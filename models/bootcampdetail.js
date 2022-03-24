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
      BootcampDetail.hasOne(models.Bootcamp, {foreignKey: 'BootcampDetailId'});
    }

    formatDuration () {
      let month = this.duration / 30;
      let day = this.duration % 30;

      if (month < 1) return `${day} day(s)`;
      return `${month} month(s), ${day} day(s)`;
    }
  }
  BootcampDetail.init({
    fee: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'username is required'},
        isInt: {msg : `fee can't contain decimals`},
        min: {
          args: [0],
          msg: 'minimum fee 0'
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'duration is required'},
        isInt: {msg : `days can't contain decimals`},
        min: {
          args: [5],
          msg: 'minimum duration is 5 days'
        }
      }
    },
    studentLimit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'student limit is required'},
        isInt: {msg : `student limit can't cotain decimals`},
        min: {
          args: [0],
          msg: 'minimum fee 0'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'BootcampDetail',
  });
  return BootcampDetail;
};