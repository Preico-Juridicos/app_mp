const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Sponsor = sequelize.define('Sponsor', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Sponsor;