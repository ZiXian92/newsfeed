const express = require('express');
const api = require('./api.js');
const bodyParser = require('body-parser');
const socketIo = require('./websocket.js');

const app = express();
const PORT = 8080;

// Static directories
app.use('/', express.static('public'));

// Required to parse request body as json.
app.use(bodyParser.json());

// Routing
app.use('/v1', api);

// Kickstart the server
// app.listen returns http.Server object, which should be the
// server to pass to socketIo for connection to work.
const server = app.listen(PORT, function(){
  console.log('Listening on port '+PORT);
});

// Set up websocket.
// First create socket.
// Then create all namespaces that will be needed.
socketIo.initSocket(server);
const io = socketIo.getSocket();

// News channel
io.of('/news').on('connect', function(){
  console.log('Someone connected on news channel.');
}).on('disconnect', function(){
  console.log('Someone disconnected from news channel.');
});
