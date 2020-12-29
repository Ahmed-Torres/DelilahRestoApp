const { Sequelize } = require('sequelize');
const db = require('../db/database');
const Product = require('../models/Product');
const OrderProduct = require('../models/OrderProduct');

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Nuevo',
  },
  description: {
    type: Sequelize.STRING,
  },
  total: {
    type: Sequelize.DECIMAL,
  },
  user_id: {
    type: Sequelize.INTEGER,
  },
  payment_method: {
    type: Sequelize.STRING,
    defaultValue: "Cash"
  },
});



module.exports = Order;
