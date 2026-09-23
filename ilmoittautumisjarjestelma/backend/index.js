const app = require('./app.js')
const { connectToDatabase } = require('./utils/db.js')
const { PORT } = require('./utils/config.js')
const cors = require('cors')

const start = async () => {
    await connectToDatabase()

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

start()