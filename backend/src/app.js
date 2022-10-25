const express = require('express')

const app = express()

const {routes} = require('./api')

app.use(express.json())

app.use('/api/v1/auth', routes.authRoute)

module.exports = app;