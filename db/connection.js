const mysql = require('mysql');

require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

console.log(process.env.DB_HOST);

//db 연결
// conn.connect((error) => {
//   if(error){
//     throw error;
//   }
//   else{
//     console.log('Database connected successfully');

//     var sql = "CREATE TABLE user ("
//     +"id VARCHAR(100) PRIMARY KEY,"
//     +"password VARCHAR(100) NOT NULL,"
//     +"name VARCHAR(100) NOT NULL,"
//     +"location VARCHAR(100) NULL)";

//     conn.query(sql, (err, result) => {
//         if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
//             throw err;
//         }
//         console.log("Table created successfully");
//     });

//     sql = "CREATE TABLE product ("
//     +"id INT AUTO_INCREMENT PRIMARY KEY,"
//     +"title VARCHAR(100) NOT NULL,"
//     +"price INT NOT NULL,"
//     +"date DATETIME NOT NULL,"
//     +"body VARCHAR(200) NOT NULL,"
//     +"location VARCHAR(100) NULL,"
//     +"status TINYINT(1) NOT NULL DEFAULT 0,"
//     +"seller VARCHAR(100) NOT NULL,"
//     +"FOREIGN KEY(seller) REFERENCES user(id))";

//     conn.query(sql, (err, result) => {
//         if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
//             throw err;
//         }
//         console.log("Table created successfully");
//     });

//     sql = "CREATE TABLE image ("
//     +"id INT AUTO_INCREMENT PRIMARY KEY,"
//     +"link VARCHAR(100) NOT NULL,"
//     +"pid INT NOT NULL,"
//     +"FOREIGN KEY(pid) REFERENCES product(id))";

//     conn.query(sql, (err, result) => {
//         if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
//             throw err;
//         }
//         console.log("Table created successfully");
//     });

//     sql = "CREATE TABLE tag ("
//     +"id INT AUTO_INCREMENT PRIMARY KEY,"
//     +"name VARCHAR(100) NOT NULL,"
//     +"pid INT NOT NULL,"
//     +"FOREIGN KEY(pid) REFERENCES product(id))";

//     conn.query(sql, (err, result) => {
//         if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
//             throw err;
//         }
//         console.log("Table created successfully");
//     });

//     sql = "CREATE TABLE wishList ("
//     +"uid VARCHAR(100) NOT NULL,"
//     +"pid INT NOT NULL,"
//     +"PRIMARY KEY(uid, pid),"
//     +"FOREIGN KEY(uid) REFERENCES user(id),"
//     +"FOREIGN KEY(pid) REFERENCES product(id))";

//     conn.query(sql, (err, result) => {
//         if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
//             throw err;
//         }
//         console.log("Table created successfully");
//     });

//     sql = "CREATE TABLE transaction ("
//     +"pid INT PRIMARY KEY,"
//     +"date DATETIME NOT NULL,"
//     +"buyer VARCHAR(100) NOT NULL,"
//     +"FOREIGN KEY(pid) REFERENCES product(id),"
//     +"FOREIGN KEY(buyer) REFERENCES user(id))";

//     conn.query(sql, (err, result) => {
//         if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
//             throw err;
//         }
//         console.log("Table created successfully");
//     });

//     sql = "CREATE TABLE chatRoom ("
//     +"buyer VARCHAR(100) NOT NULL,"
//     +"pid INT NOT NULL,"
//     +"date DATETIME NOT NULL,"
//     +"PRIMARY KEY(buyer, pid),"
//     +"FOREIGN KEY(buyer) REFERENCES user(id),"
//     +"FOREIGN KEY(pid) REFERENCES product(id))";

//     conn.query(sql, (err, result) => {
//         if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
//             throw err;
//         }
//         console.log("Table created successfully");
//     });

//     sql = "CREATE TABLE chat ("
//     +"buyer VARCHAR(100) NOT NULL,"
//     +"pid INT NOT NULL,"
//     +"message VARCHAR(100) NOT NULL,"
//     +"date DATETIME NOT NULL,"
//     +"status TINYINT(1) NOT NULL,"
//     +"sender VARCHAR(100) NOT NULL,"
//     +"PRIMARY KEY(buyer, pid),"
//     +"FOREIGN KEY(buyer) REFERENCES user(id),"
//     +"FOREIGN KEY(pid) REFERENCES product(id),"
//     +"FOREIGN KEY(sender) REFERENCES user(id))";

//     conn.query(sql, (err, result) => {
//         if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
//             throw err;
//         }
//         console.log("Table created successfully");
//     });
//   }
// });

module.exports = pool;