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
      // define association here
    }
  }
  User.init({
  username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notNull: {
        msg: 'username is required'
       }
      } 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notNull: {
        msg: 'email is required'
       }
      } 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notNull: {
        msg: 'password is required'
       }
      } 
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
      notNull: {
        msg: 'role is required'
       }
      } 
    },
    BootcampId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
      notNull: {
        msg: 'bootcamp id enter your name'
       }
      } 
    }
  }, {
    hooks: {
      beforeCreate(instance, options){
        console.log(instance, '<<< di beforeCreate');
        var salt = bcryptjs.genSaltSync(10);
        var hash = bcryptjs.hashSync(instance.password, salt);
        instance.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};