const User = require('./user')
const Event = require('./event')
const Registrations = require('./registrations')

Event.hasMany(Registrations)
Registrations.belongsTo(Event)

User.sync({alter: true})
Event.sync({alter: true})
Registrations.sync({alter: true})

module.exports = {User, Event, Registrations}