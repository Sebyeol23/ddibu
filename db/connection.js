const db = require('mysql');

require('dotenv').config();

const conn = db.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE
});

//db 연결
conn.connect((error) => {
  if(error){
    throw(error);
  }
  else{
    console.log('Database connected successfully');
  }
});

module.exports = conn;