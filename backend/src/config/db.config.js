module.exports = {
  development: {
    host: 'localhost',
    username: 'postgres',
    password: '123456',
    database: 'build_api',
    dialect: 'postgres',
    logging: false
  },
  staging: {
    host: 'localhost',
    username: 'postgres',
    password: '123456',
    database: 'build_api',
    dialect: 'postgres'
  },
  production: {
    host: 'localhost',
    username: 'postgres',
    password: '123456',
    database: 'build_api',
    dialect: 'postgres'
  }
}