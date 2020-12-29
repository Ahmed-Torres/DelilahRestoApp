const { Sequelize } = require('sequelize');
const db = require('../db/database');

const Product = db.define('products', {
  name: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  }
});

module.exports = Product;
