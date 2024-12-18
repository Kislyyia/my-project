const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Order = require('./Order');
const Product = require('./Product');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Связи
OrderItem.belongsTo(Order, { foreignKey: 'order_id', onDelete: 'CASCADE' }); // Удаление OrderItem при удалении Order
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = OrderItem;