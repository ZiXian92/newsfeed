const db = require('../db.js');

module.exports = {
  // Gets list of all news.
  getNews: function(){
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
        return reject(err);
      });
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
