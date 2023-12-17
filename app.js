const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const accountRouter = require('./routes/account');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/account', accountRouter);

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})