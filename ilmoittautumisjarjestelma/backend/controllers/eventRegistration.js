const registrationRouter = require('express').Router()
const {Registrations} = require('../models/index')

registrationRouter.get('/', async (request, response, next) => {
    try{
        const registrations = await Registrations.findAll()
        response.json(registrations)
        
    } catch(error){
        next(error)
    }
})

registrationRouter.post('/', async (request,response,next)=>{
    try{
        console.log(request.body)
        const result = await Registrations.create(request.body)
        response.json(result)
    } catch(error){
        next(error)
    }
})

registrationRouter.delete('/:id', async (request,response,next)=>{
    try{
        const id = request.params.id
        const registration = await Registrations.findByPk(id)

        if(!registration){
            response.status(404).end()
        }
        else{
            await registration.destroy()
            response.status(204).end()
        }
    }catch(error){
        next(error)
    }
})

module.exports = registrationRouter
