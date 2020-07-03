const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas', 'root', 'postgres',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;