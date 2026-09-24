const express = require('express')
const cors = require('cors')
const eventsRouter = require('./controllers/events')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const app = express()

app.use(express.json())
app.use(cors())
app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/events', eventsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



app.get('/test', (request, response) => {
  response.send('testi')
})

module.exports = app