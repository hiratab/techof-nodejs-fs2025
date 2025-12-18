module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'mysql-techof.alwaysdata.net',
      database: 'techof_db',
      user: 'techof_bruno',
      password: 'techoffullstack123'
    }
  },
  migrations: {
    directory: './migrations'
  }
}
