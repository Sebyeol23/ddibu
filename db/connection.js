const db = require('mysql');

const conn = db.createConnection({
    host: "ddibu-db.c0gb6t2au2fn.ap-northeast-2.rds.amazonaws.com",
    port: "3306",
    user: "sebyeol",
    password: "cube2325",
    database: "ddibudb"
});

//db 연결
conn.connect((error) => {
  if(error){
    console.error('Database connection failed: ', error);
  }
  else{
    console.log('Database connected successfully');
  }
});

module.exports = conn;