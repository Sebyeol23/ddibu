const express = require('express')
const app = express()
const port = 3000

//db 연결
const db = require('./db/connection');
db.connect((error) => {
  if(error){
    console.error('Database connection failed: ', error);
  }
  else{
    console.log('Database connected successfully');
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})