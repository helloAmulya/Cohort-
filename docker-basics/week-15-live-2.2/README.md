# Docker Networking Cheatsheet

### we can connect separate containers with each other via network and perform operations

1. Terminal 1:
   > docker run -p 3000:3000 mongo-app

This runs your custom application container (mongo-app), launching a server accessible on http://localhost:3000.

2. Terminal 2:
   > docker run -p 27017:27107 mongo

This runs an official MongoDB container, with MongoDB available on your host at port 27107 (mapped to the container’s standard 27017).

## Main commands

- fist create a network

```
docker network create my_custom_network
```

- then connect your mongo container (not the backend) to your network

```
docker run -d --name mongo-class --network my_custom_network -p 27017:27107 mongo
```

- now start the node.js container and change the mongo url in the db.ts to current running container

```
docker run -d --name another-mongo --network my_custom_network -p 3000:3000 mongo-app
```

`on running docker ps` you should get

```
CONTAINER ID   IMAGE       COMMAND                  CREATED              STATUS              PORTS                                             NAMES
0d4871d0bfc5   mongo-app   "docker-entrypoint.s…"   2 seconds ago        Up 2 seconds        0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp       another-mongo
97ff53ee6e76   mongo-app   "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:27017->27017/tcp, [::]:27017->27017/tcp   mango-class
```

## Our both container are connected to same network
