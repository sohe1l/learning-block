const mysql = require('mysql2/promise');

 const pool = mysql.createPool({
    host: '127.0.0.0',
    user: 'user',
    password: 'pass',
    database: 'cloud',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  module.exports = pool;