const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Section = sequelize.define('Section', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }
});

module.exports = Section;
