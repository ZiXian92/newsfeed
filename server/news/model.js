const db = require('../db.js');
const redisManager = require('../redis.js');

module.exports = {
  // Gets list of all news.
  getNewsList: function(){
    function getNewsFromDb(){
      return new Promise(function(resolve, reject){
        db().then(function(conn){
          const client = conn.client;
          const done = conn.done;
          client.query('SELECT * FROM news ORDER BY publishdate DESC', [], function(err, results){
            if(err){
              console.log('Something went wrong in querying for news.');
              done(err);
              return reject(err);
            }
            done();
            return resolve(results.rows);
          });
        }, function(err){
          console.log('Failed to connect to database.');
          console.log(err);
          return reject(err);
        });
      });
    }

    return new Promise(function(resolve, reject){
      let redisClient = redisManager.getClient();

      if(redisClient){
        redisClient.getAsync('newslist').then(function(newsList){
          if(!newsList){
            console.log('News list not in redis, fetching from db...');
            getNewsFromDb().then(function(newsList){
              redisClient.setexAsync('newslist', 60, JSON.stringify(newsList));
              return resolve(newsList);
            });
          } else return resolve(JSON.parse(newsList));
        }, function(err){
          conole.log('Failed to get news list from redis');
          console.log(err);
          getNewsFromDb().then(function(newsList){
            redisClient.setexAsync('newslist', 60, JSON.stringify(newsList));
            return resolve(newsList);
          });
        });
      } else{
        getNewsFromDb().then(function(newsList){
          return resolve(newsList);
        }, function(err){
          return reject(err);
        });
      }
    });
  },

  /* Adds the given news
   * @param {{title: String, body: String}} data
   */
  addNews: function(data){
    return new Promise(function(resolve, reject){
      db().then(function(conn){
        const client = conn.client;
        const done = conn.done;
        client.query('INSERT INTO news (title, body) VALUES($1, $2) returning *', [data.title, data.body], function(err, results){
          if(err){
            console.log('Failed to add new news.');
            console.log(err);
            done(err);
            return reject(err);
          }
          done();
          return resolve(results.rows[0]);
        });
      }, function(err){
        console.log('Failed to connect to database.');
        return reject(err);
      });
    });
  }
};
