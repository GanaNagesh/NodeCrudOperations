const mariadb = require('mariadb');

let connection= mariadb.createPool({
        host: 'localhost', 
        user:'root',
        password: 'mariadb123',
        database: 'test',
        port:3307
      })

module.exports = connection;