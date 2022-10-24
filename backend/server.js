require('dotenv').config()
const { connect } = require('mongoose')

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