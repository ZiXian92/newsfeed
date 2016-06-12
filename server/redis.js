/**
 *redis.js
 * Maintains singleton connection client to Redis server to avoid
 * having to create clients in each model.
 */

const redis = require('redis');
const bluebird = require('bluebird');
var client = null;
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

module.exports = {
  /**
   * Initializes and creates a Redis client.*/
  initClient: function(options){
    client = redis.createClient(options);
    client.on('connect', function(){
      console.log('Connected to redis server');
    });
    client.on('error', function(err){
      console.log(err);
    });
    return client;
  },

  getClient: function(){
    return client;
  }
};
