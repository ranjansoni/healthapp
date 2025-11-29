import mysql from 'mysql2/promise';

let pool;

if (!global.mysqlPool) {
  if (process.env.MYSQL_URI) {
    global.mysqlPool = mysql.createPool({
      uri: process.env.MYSQL_URI,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
}

pool = global.mysqlPool;

export default pool;
