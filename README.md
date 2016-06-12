# NewsFeed
Simple newsfeed app to try out web sockets

# Functionalities
- View all news
- Add news
- Real-time updating of newsfeed

Note: As this was created with no intention of deployment on the Web, there is close to no security measures such as hiding database password or authentication/authorization for server side API.

# Technology Stack
- ReactJS
- Bootstrap Material
- jQuery
- Express
- PostgreSQL
- Socket.IO
- Redis

# Setup and run locally
You will need to install the following:
- Docker
- Docker Compose

Unfortunately, the setup files here cater to Linux/Unix systems.
For Windows users, if you can understand shell scripts, look into the script to get the gist of what it's doing and then do it manually.

## Steps
1. Clone this repository to your computer.
2. Run setup.sh.
3. To monitor the logs, run `docker-compose logs -f`.
4. To shutdown, run `docker-compose stop`.
5. Subsequently, to run the project, run `docker-compose start`.
6. Check out the app at `localhost:8080`.
7. To clear all docker containers associated with this app, run `docker-compose down`.  

For for information, refer to Docker and Docker Compose documentation.

Note: If you want to develop further for your own pleasure, note that there is no livereload server. Either add new Gulp tasks yourself or live with refreshing manually.

# Developer Notes
The app is made up of 3 Docker containers: 1 for web server(Express), 1 for database(PostgreSQL) server and 1 for Redis server(for caching purpose).  

Everything is served up by the Express server, but rendering is done on the client side using React and React Router to render the UI components. jQuery is used to perform AJAX calls to get data to be rendered with the components themselves.

## Client-side
All client-side code are in `react` folder. All UI components(placed in `react/components`) should be made as self-contained as possible for reusability purpose. Page-level code are placed directly in `react` folder, with `app.jsx` as the main bootstrapping and route definition file.  

`public` contains all client-side files that will be served to the browser by Express. Regeneration of these files when client code is updated is handled by a Gulp task.

## Server-side
### Directory Structure
All server-side code are located in `server` folder. The main entry point for the app is `server.js`. Wrapper codes for PostgreSQL and Redis clients are placed in the same directory level.

### Web API
All API URIs are prefixed with `v1/`. Routes should be designed to represent resources such that HTTP actions represent CRUD operations on the resources. Top level routes are defined in `server/api.js`.  

Routes associated with a particular resource are placed together in a subfolder in `server`. Within the subfolder, route handlers are defined in `index.js` and any business logic involving database and data manipulation are done in `model.js`.

### Accessing the Database
Node `pg` module is used to connect to and access the database. The wrapper code `db.js` is used to abstract away the need to make direct calls to connect to the database. The reason is because there are more than 1 way to create a client to connect to database server in `pg` but using pooled connection is recommended due to the performance hit on the database server with many unclosed concurrent database connections. Therefore, always include the wrapper model when running SQL queries. The wrapper's `db()` call returns a Promise that resolves into an object `{ client: Object, done: function }` on successful connection. The client is used to perform queries while `done` should be called to indicate that there will not be any further queries. You may find the need to promisify your query code if the code to query the database is sprinkled over several decision branches.

### Redis
In this app, Redis is used for caching purposes, usually to cache results of SELECT queries to reduce the workload on the database server and speed up data retrieval. As there is always the possibility of data being updated by another client right after retrieval from a client, cached data should be set to expire after some time to avoid clients from getting stale data and also to reduce memory consumption.  

The connection client is initialised in `server.js` and held in a wrapper module as a single global object for use by the models. To retrieve the connection client, call `getClient()` on the wrapper module. It will return the client if there is a connection and null if connection cannot be established.  

All Redis client commands have been promisified. Refer to [Node Redis documentation](http://redis.js.org/#redis-a-nodejs-redis-client-usage-example-promises) to find out how to use the promise API. For the list of Redis commands, refer to [Redis command documentaion](http://redis.io/commands).

### Web Sockets
Web sockets are used to provide real-time push updates when data has been modified on the server. As with Redis, this feature is goo-to-have and the app should not be made to stop working if errors occur when using web sockets. Any attempts to send push updates should fail quietly if unable to get the socket instance from the wrapper module. To get the Socket IO instance, call `getSocket()` on the wrapper module.
