const express = require('express');
const newsModel = require('./model.js');
const socketIo = require('../websocket.js');
const router = express.Router();
var newsSocket = null;

const emitNewsEvent = (function(){
  var newsSocket;
  return function(eName, data){
    newsSocket= newsSocket || (function(){
      const t = socketIo.getSocket();
      return t? t.of('/news'): null;
    })();
    if(!newsSocket) return false;
    newsSocket.emit(eName, data);
  };
})();

module.exports = router;

router.get('/', function(req, res){
  newsModel.getNews().then(function(news){
    res.send(news);
  }, function(err){
    res.status(500).send(err);
  });
});

router.post('/', function(req, res){
  const data = req.body;
  newsModel.addNews(data).then(function(d){
    emitNewsEvent('newitem', d);
    res.send(d);
  }, function(err){
    res.status(500).send(err);
  });
});
