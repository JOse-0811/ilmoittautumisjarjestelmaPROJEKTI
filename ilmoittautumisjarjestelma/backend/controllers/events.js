const eventsRouter = require('express').Router()
const {Event} = require('../models/index')

eventsRouter.get('/', async (request, response, next) => {
  try{
    const events = await Event.findAll()
    response.json(events)
  } catch(error){
    next(error)
  }
})

eventsRouter.post('/', async (request, response, next) => {
  try{
    console.log(request.body)
    const result = await Event.create(request.body)
    response.json(result)
  }catch(error){
    next(error)
  }
})



module.exports = eventsRouter