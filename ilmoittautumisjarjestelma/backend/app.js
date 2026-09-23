const express = require('express')
const cors = require('cors')
const eventsRouter = require('./controllers/events')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/events', eventsRouter)

app.get('/test', (request, response) => {
  response.send('testi')
})

module.exports = app