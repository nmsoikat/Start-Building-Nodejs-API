const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xssClean = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors');

const { routes } = require('./src/api')
const AppErrorHandler = require('./src/utils/app-error-handler')
const { AppError } = require('./src/utils/app-error')

const app = express()

//Global Middleware
app.use(helmet({ crossOriginResourcePolicy: false }))//Set Security HTTP headers
//app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(mongoSanitize())// Input Data Sanitization against NoSQL Query Injection
app.use(xssClean())// Input Data Sanitization against XSS //clean malicious html or script in html code //add before any route
app.use(hpp({
  //allow some duplicate query-params //if need
  whitelist: ['duration']
})) //Http Parameter Pollution // remove duplicate query param // ?name=sdf&sort=1&sort=2

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'))
}

app.use(cors({
  origin: [
    "http://localhost:3000"
  ], credentials: true //cookie option httpOnly true
}));

//Routes
app.use('/api/v1/auth', routes.AuthRoute)
app.use('/api/v1/user', routes.UserRoute)

//Not Found Route //all http verbs and // any route *
app.all("*", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404))
})

//Global Error Handler
app.use(AppErrorHandler)

module.exports = app;