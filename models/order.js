'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      // Associations
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }
  Order.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Books',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'Orders', // Explicit table name
      timestamps: true,
    }
  );
  return Order;
};
