const mysql = require('mysql2/promise');

 const pool = mysql.createPool({
    host: '34.83.161.119',
    user: 'dbuser',
    password: 'secret',
    database: 'learningdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  module.exports = pool;