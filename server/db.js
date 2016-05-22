const pg = require('pg');
const connString = 'postgres://zixian:NewsFeedIO@db/newsfeed';
const connCfg = {
  user: 'zixian',
  password: 'NewsFeedIO',
  database: 'newsfeed',
  host: 'db'
};

// Returns a promise whose then onResolve function takes in
// an object with client and done fields corresponding to
// connection client and funciton to release conneciton to pool.
const db = function(){
  return new Promise(function(resolve, reject){
    var p = pg.connect(connString, function(err, client, done){
      if(err) return reject(err);
      return resolve({ client: client, done: done });
    });
  });
};

module.exports = db;
