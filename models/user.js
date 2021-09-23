'use strict';
const {
  Model
} = require('sequelize');
const {
  encode
} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Contact, {
        foreignKey: 'userId'
      })
      User.hasMany(models.History, {
        foreignKey: 'userId'
      })
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.password = encode(instance.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};