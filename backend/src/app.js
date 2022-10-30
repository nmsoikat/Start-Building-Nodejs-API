const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const app = express()

const { routes } = require('./api')
const AppErrorHandler = require('./utils/app-error-handler')

//Global Middleware
app.use(helmet())//Set Security HTTP headers
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'))
}

//Routes
app.use('/api/v1/auth', routes.authRoute)


app.use(AppErrorHandler)
module.exports = app;