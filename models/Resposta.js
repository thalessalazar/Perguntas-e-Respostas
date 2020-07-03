const Sequelize = require('sequelize');
const connection = require('../database/database');

const Resposta = connection.define('Resposta', {
    corpo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    
})