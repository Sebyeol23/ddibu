const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const accountRouter = require('./routes/account');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/account', accountRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})