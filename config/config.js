import * as dotenv from 'dotenv';
import mysql from 'mysql2';
// dotenv to protect info
dotenv.config();
// creates database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to database`)
);

export default db;
