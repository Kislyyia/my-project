const { Sequelize } = require('sequelize');

// Подключение к базе данных SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
});

module.exports = sequelize;