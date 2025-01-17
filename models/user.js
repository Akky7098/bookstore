'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Associations
      User.hasMany(models.Book, { foreignKey: 'adminId' });
      User.hasMany(models.Order, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('superAdmin', 'admin', 'user'),
        defaultValue: 'user',
      },
      currentToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },      
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users', 
      timestamps: true,
    }
  );
  return User;
};
