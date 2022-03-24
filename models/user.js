'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Bootcamp, { foreignKey: 'BootcampId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'username is required'}
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'email is required'},
        isEmail: {msg: 'invalid email'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'password is required'},
        len: {
          args: [8,24],
          msg: 'password length must be between 8 and 24'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: 'role is required'}
      }
    },
    BootcampId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'bootcamp id is missing'}
      }
    }
  }, {
    hooks: {
      beforeCreate(instance, options) {
        var salt = bcryptjs.genSaltSync(10);
        var hash = bcryptjs.hashSync(instance.password, salt);
        instance.password = hash

        const emailDomain = instance.email.slice(-10)
        if (emailDomain === '@admin.com') {
          instance.role = 'admin'
        } else {
          instance.role = 'student'
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};