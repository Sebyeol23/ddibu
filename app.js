const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();

const port = process.env.PORT || 80;

const allowedOrigins = ['https://ddibux2.netlify.app', 'http://localhost:3000'];

const accountRouter = require('./routes/account');
const homeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const profileRouter = require('./routes/profile');
const chatRouter = require('./routes/chat');
const likeRouter = require('./routes/like');

// HTTP 서버 생성
const server = http.createServer(app);

// WebSocket 서버 생성
const io = socketIO(server, {
  cors: {
    origin: ['https://ddibux2.netlify.app', 'http://localhost:3000']
  }
});

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use((req, res, next)=>{
  req.io = io;
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/account', accountRouter);
app.use('/api/home', homeRouter);
app.use('/api/product', productRouter);
app.use('/api/profile', profileRouter);
app.use('/api/chat', chatRouter);
app.use('/api/like', likeRouter);

io.on('connection', (socket) => {
  socket.on('clientMessage', (message)=>{
    console.log(`client: ${message}`);
    io.to(socket.id).emit('serverMessage', 'Hello client!');
  });
  socket.on('disconnect', ()=>{
    console.log("client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});