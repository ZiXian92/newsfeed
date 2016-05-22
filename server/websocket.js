const socketIo = require('socket.io');

var io = null;

module.exports = {
  initSocket: function(server){
    io = socketIo(server);
  },
  getSocket: function(){
    return io;
  }
};
