const User = require('./user')
const Event = require('./event')
const Registration = require('./registration')

Event.hasMany(Registration)
Registration.belongsTo(Event)

User.sync({alter: true})
Event.sync({alter: true})
Registration.sync({alter: true})

module.exports = {User, Event, Registration}