const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect('<Sua string de conexão>', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

const bodyParser = require('body-parser');

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(routes);

server.listen(3333);
