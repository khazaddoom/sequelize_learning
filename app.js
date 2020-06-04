const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const router = require('./router')
const db = require('./src/database')

const PORT = process.env.PORT || 3000

app.use(bodyParser.json({ type: 'application/json' }))

app.use('/', router)

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on PORT: ${PORT} ...`)
    })
})