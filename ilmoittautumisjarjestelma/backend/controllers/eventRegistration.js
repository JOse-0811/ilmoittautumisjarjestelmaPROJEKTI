const registrationRouter = require('express').Router()
const { Registration, Event } = require('../models/index')

registrationRouter.get('/', async (request, response, next) => {
    try {
        const Registration = await Registration.findAll()
        response.json(Registration)

    } catch (error) {
        next(error)
    }
})

registrationRouter.post('/', async (request, response, next) => {
    try {
        const event = await Event.findByPk(request.body.eventId)
        if (!event) {
            return response.status(401).json({ error: 'event id invalid' })
        }

        console.log(request.body)

        const result = await Registration.create({ ...request.body})

        const registrationWithEvent = await Registration.findByPk(result.id, {

            include: {
                model: Event,
                attributes: ['name']
            }


        })
        response.json(registrationWithEvent)
    } catch (error) {
        next(error)
    }
})

registrationRouter.delete('/:id', async (request, response, next) => {
    try {
        const id = request.params.id
        const registration = await Registration.findByPk(id)

        if (!registration) {
            response.status(404).end()
        }
        else {
            await registration.destroy()
            response.status(204).end()
        }
    } catch (error) {
        next(error)
    }
})

module.exports = registrationRouter
