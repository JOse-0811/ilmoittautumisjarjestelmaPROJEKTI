const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const { User, Event } = require('../models')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (typeof username !== 'string' || username.length < 3) {
        return response.status(400).json({ error: 'Username must be at least 3 characters long.' })
    }
    if (typeof password !== 'string' || password.length < 3) {
        return response.status(400).json({ error: 'Password must be at least 3 characters long.' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    try {
        const user = await User.create({ username, name, passwordHash })
        response.status(201).json(user)
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
    return response.status(400).json({ error: 'Username must be unique.' })
        }
        throw error
    }
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findByPk(request.params.id)
    if (user) {
        response.json(user)
    } else {
        response.status(404).end()
    }
})

module.exports = usersRouter