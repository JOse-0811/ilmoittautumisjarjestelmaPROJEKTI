const { Model, DataTypes } = require('sequelize')
const {sequelize} = require('../utils/db')

class Registration extends Model {}

Registration.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
 }, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'Registration'
})

module.exports = Registration