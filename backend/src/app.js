const express = require('express')
const morgan = require('morgan')

const app = express()

const {routes} = require('./api')

app.use(express.json())
app.use(morgan('tiny'))
app.use('/api/v1/auth', routes.authRoute)

module.exports = app;