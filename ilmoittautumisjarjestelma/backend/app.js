const express = require('express')
const cors = require('cors')

// kommentti

const app = express()

app.use(express.json())
app.use(cors())

module.exports = app