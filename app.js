const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 80;

const allowedOrigins = ['https://ddibux2.netlify.app', 'http://localhost:3000'];

const accountRouter = require('./routes/account');
const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');

app.use(cors({
  origin: allowedOrigins
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/account', accountRouter);
app.use('/api/home', homeRouter);
app.use('/api/product', productRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})