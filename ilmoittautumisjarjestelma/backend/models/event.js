const { Model, DataTypes } = require('sequelize')
const {sequelize} = require('../utils/db')

class Event extends Model {}

Event.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.text,
    allowNull: true
  },
  date: {
    type: DataTypes.date,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'event'
})

module.exports = Event