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

# Setup and run locally
You will need to install the following:
- Docker
- Docker Compose

Unfortunately, the setup files here cater to Linux/Unix systems.
For Windows users, if you can understand shell scripts, look into the script to get the gist of what it's doing and then do it manually.

## Steps
1. Clone this repository to your computer.
2. Run setup.sh.
3. Subsequently, to run the project, run `docker-compose up -d`.
4. To monitor the logs, run `docker-compose logs -f` after either step 2 or 3.
5. Check out the app at `localhost:8080`.
For for information, refer to Docker and Docker Compose documentation.

Note: If you want to develop further for your own pleasure, note that there is no livereload server. Either add new Gulp tasks yourself or live with refreshing manually.

Note 2: Currently, while Docker containers are running, it is not possible to install new modules throught NPM. You will need to manually edit package.json or do `npm install --save <module_name>` on the module in your host computer before restarting docker compose. If you have a better way, do raise it in an issue.
