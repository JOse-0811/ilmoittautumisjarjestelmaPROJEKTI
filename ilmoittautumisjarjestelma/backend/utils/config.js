require('dotenv').config()

const PORT = process.env.PORT
const DATABASE_URL = process.env.NODE.ENV === 'test'

    ? process.env.TEST_DATABASE_URL ?? process.env.DATABASE_URL // jos TEST_DATABASE_URL ei ole määritetty, käytetään DATABASE_URL:ia
    : process.env.DATABASE_URL
const SECRET = process.env.SECRET

module.exports = { DATABASE_URL, PORT, SECRET }