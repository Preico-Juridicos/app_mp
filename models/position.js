const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Sponsor = require('./sponsor');

const Position = sequelize.define('Position', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sponsor_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  position_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  section: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  coords: {
    type: DataTypes.STRING,
    allowNull: false
  },
  left: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  top: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  transform: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

Position.belongsTo(Sponsor);

module.exports = Position;
