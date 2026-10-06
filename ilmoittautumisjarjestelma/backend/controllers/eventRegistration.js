const registrationRouter = require('express').Router()
const {Registration} = require('../models/index')

registrationRouter.get('/', async (request, response, next) => {
    try{
        const Registration = await Registration.findAll()
        response.json(Registration)
        
    } catch(error){
        next(error)
    }
})

registrationRouter.post('/', async (request,response,next)=>{
    try{
        console.log(request.body)
        const result = await Registration.create(request.body)
        response.json(result)
    } catch(error){
        next(error)
    }
})

registrationRouter.delete('/:id', async (request,response,next)=>{
    try{
        const id = request.params.id
        const registration = await Registration.findByPk(id)

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
