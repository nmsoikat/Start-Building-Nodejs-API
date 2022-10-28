const express = require('express')
const morgan = require('morgan')

const app = express()

const {routes} = require('./api')
const  AppErrorHandler  = require('./utils/app-error-handler')

app.use(express.json())
app.use(morgan('tiny'))
app.use('/api/v1/auth', routes.authRoute)


app.use(AppErrorHandler)
module.exports = app;