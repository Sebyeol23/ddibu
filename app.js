const express = require('express')
const app = express()
const port = 3000

const db = require('./db/connection')

const accountRouter = require('./routes/account');

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/account', accountRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})