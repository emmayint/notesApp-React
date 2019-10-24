# Microservice architecture

Start by manually testing all servers
- Turn all servers on 
- Visit each one individually
- Visit them through the gateway
- Run services throuh pm
- Make a rest call from the front end to each service

# downloading redis mac/linux
https://redis.io/download
- cd to download dirctory
- `make`
- `./src/redis-server`
# Redis windows:
- For windows : https://github.com/dmajkic/redis/downloads

# Redis basics
- https://github.com/NodeRedis/node_redis
- In-memory key value store
- Has basic atomic operations + other cool features
- https://redis.io/commands
- Used for syncing variables across instances, caching and broadcasting updates

# Dev purposes
For dev mode, you can proxy the gateway behind react dev server (Needs websocket to work)