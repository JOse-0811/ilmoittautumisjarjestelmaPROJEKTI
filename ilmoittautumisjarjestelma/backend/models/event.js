const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Event extends Model {}

Event.init({

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      len: {
        args: [3, 50],
        msg: 'Name must be between 3 and 50 characters long'
      }
    }
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate:{
      max: {
        args: 300,
        msg: 'Description must be shorter than 300 characters long'
      }
    }
  },

  date: {
    type: DataTypes.DATE,
    allowNull: false
  },

  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      len: {
        args: [3, 50],
        msg: 'Location must be between 3 and 50 characters long'
      }
    }
  }

}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'event'
})

module.exports = Event
