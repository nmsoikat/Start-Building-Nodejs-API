'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const basename = path.basename(__filename);
const NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('../../config/db.config')[NODE_ENV];

// All models
const db = {};

// Sequelize connection
const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter(fileName => {
    //not hidden file && not current file && only .js file
    return (
      fileName.indexOf('.') !== 0 &&
      fileName !== basename &&
      fileName.slice(-3) === '.js'
    );
  })
  .forEach(fileName => {
    // Pass sequelize and DataTypes to model function
    const Model = require(path.join(__dirname, fileName))(sequelize, Sequelize.DataTypes);
    db[Model.name] = Model;
  });

// Pass models to association function
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;