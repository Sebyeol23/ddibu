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
    throw error;
  }
  else{
    console.log('Database connected successfully');

    var sql = "CREATE TABLE user ("
    +"id VARCHAR(100) PRIMARY KEY,"
    +"password VARCHAR(100) NOT NULL,"
    +"location VARCHAR(100) NULL)";

    conn.query(sql, (err, result) => {
        if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
            throw err;
        }
        console.log("Table created successfully");
    });

    sql = "CREATE TABLE image ("
    +"id INT AUTO_INCREMENT PRIMARY KEY,"
    +"link VARCHAR(100) NOT NULL)";

    conn.query(sql, (err, result) => {
        if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
            throw err;
        }
        console.log("Table created successfully");
    });

    sql = "CREATE TABLE transaction ("
    +"id INT AUTO_INCREMENT PRIMARY KEY,"
    +"title VARCHAR(100) NOT NULL,"
    +"price INT NOT NULL,"
    +"date DATE NOT NULL,"
    +"sellerId VARCHAR(100) NOT NULL,"
    +"buyerId VARCHAR(100) NOT NULL,"
    +"imageId INT NOT NULL,"
    +"FOREIGN KEY(sellerId) REFERENCES user(id),"
    +"FOREIGN KEY(buyerId) REFERENCES user(id),"
    +"FOREIGN KEY(imageId) REFERENCES image(id))";

    conn.query(sql, (err, result) => {
        if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
            throw err;
        }
        console.log("Table created successfully");
    });

    sql = "CREATE TABLE salePost ("
    +"id INT AUTO_INCREMENT PRIMARY KEY,"
    +"title VARCHAR(100) NOT NULL,"
    +"price INT NOT NULL,"
    +"date DATE NOT NULL,"
    +"body VARCHAR(200) NOT NULL,"
    +"location VARCHAR(100) NULL,"
    +"userId VARCHAR(100) NOT NULL,"
    +"imageId INT NULL,"
    +"FOREIGN KEY(userId) REFERENCES user(id),"
    +"FOREIGN KEY(imageId) REFERENCES image(id))";

    conn.query(sql, (err, result) => {
        if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
            throw err;
        }
        console.log("Table created successfully");
    });

    sql = "CREATE TABLE wishList ("
    +"id INT AUTO_INCREMENT PRIMARY KEY,"
    +"userId VARCHAR(100) NOT NULL,"
    +"postId INT NOT NULL,"
    +"FOREIGN KEY(userId) REFERENCES user(id),"
    +"FOREIGN KEY(postId) REFERENCES salePost(id))";

    conn.query(sql, (err, result) => {
        if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
            throw err;
        }
        console.log("Table created successfully");
    });

    sql = "CREATE TABLE chatRoom ("
    +"id INT AUTO_INCREMENT PRIMARY KEY,"
    +"sellerId VARCHAR(100) NOT NULL,"
    +"buyerId VARCHAR(100) NOT NULL,"
    +"FOREIGN KEY(sellerId) REFERENCES user(id),"
    +"FOREIGN KEY(buyerId) REFERENCES user(id))";

    conn.query(sql, (err, result) => {
        if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
            throw err;
        }
        console.log("Table created successfully");
    });

    sql = "CREATE TABLE chat ("
    +"id INT AUTO_INCREMENT PRIMARY KEY,"
    +"message VARCHAR(200) NOT NULL,"
    +"dateTime DATETIME NOT NULL,"
    +"readCheck TINYINT(1) NOT NULL,"
    +"userId VARCHAR(100) NOT NULL,"
    +"roomId INT NOT NULL,"
    +"FOREIGN KEY(userId) REFERENCES user(id),"
    +"FOREIGN KEY(roomId) REFERENCES chatRoom(id))";

    conn.query(sql, (err, result) => {
        if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
            throw err;
        }
        console.log("Table created successfully");
    });

    sql = "CREATE TABLE tag ("
    +"id INT AUTO_INCREMENT PRIMARY KEY,"
    +"name VARCHAR(100) NOT NULL,"
    +"postId INT NOT NULL,"
    +"FOREIGN KEY(postId) REFERENCES salePost(id))";

    conn.query(sql, (err, result) => {
        if(err && err.code != "ER_TABLE_EXISTS_ERROR"){
            throw err;
        }
        console.log("Table created successfully");
    });
  }
});

module.exports = conn;