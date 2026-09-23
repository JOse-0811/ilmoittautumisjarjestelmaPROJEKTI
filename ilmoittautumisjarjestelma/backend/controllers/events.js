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

eventsRouter.delete('/:id', async (request, response, next) => {
  try{
    const id = request.params.id
    const event = await Event.findByPk(id)

    if(!event){
      response.status(404).end()
    }
    else{
      await event.destroy()
      response.status(204).end()
    }

  }catch(error){
    next(error)
  }
})

module.exports = eventsRouter