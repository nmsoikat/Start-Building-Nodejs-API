require('dotenv').config()
const { connect } = require('mongoose')

//Before app
process.on('uncaughtException', (err) => {
  console.log("UNCAUGHT EXCEPTION: SHUTING DOWN...");
  console.log(err.name, err.message);

  process.exit(1)
})

const app = require('./app')
const port = process.env.PORT || 8000

connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected!");
    app.listen(port, () => {
      console.log("Server running on port:", port);
    })
  })
  .catch((err) => {
    console.log("DB connection fail. Server not started");
    console.log(err);
  })


process.on('unhandledRejection', (err) => {
  console.log("UNHANDLED REJECTION: SHUTING DOWN...");
  console.log(err.name, err.message);

  app.close(() => {
    //0 -> success
    //1 -> uncaughtException
    process.exit(1)
  })
})