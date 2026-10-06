const eventsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { Event } = require('../models/index')
const { SECRET } = require('../utils/config')

const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }

  return null
}

eventsRouter.get('/', async (request, response, next) => {
  try {
    const events = await Event.findAll()
    response.json(events)
  } catch (error) {
    next(error)
  }
})

eventsRouter.post('/', async (request, response, next) => {
  try {
    const { name, description, location, date } = request.body

    if (!date) {
      return response.status(400).json({ error: 'date is required' })
    }

    const result = await Event.create({
      name,
      description,
      location,
      date: new Date(date)
    })

    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

eventsRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = getTokenFrom(request)

    if (!token) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    let decodedToken

    try {
      decodedToken = jwt.verify(token, SECRET)
    } catch (error) {
      return response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const event = await Event.findByPk(request.params.id)

    if (!event) {
      return response.status(404).json({
        error: 'event not found'
      })
    }

    if (event.userId !== decodedToken.id) {
      return response.status(403).json({
        error: 'Only the creator or admin can delete the event.'
      })
    }

    await event.destroy()
    return response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = eventsRouter
