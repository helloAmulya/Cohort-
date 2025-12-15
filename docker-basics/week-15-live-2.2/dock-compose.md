# Docker Compose Commands & Uses

### Use case :

`to run multi-container docker application using a single YAML file to configure application services, networks, and volumes`

- create a docker compose file with yml extension

```
docker-compose.yml
```

- to execute

```
docker compose up
```

- to stop and remove containers

```
docker compose down
```

### More commands

```
docker compose ps – Lists containers and status.

docker compose logs – Follows logs for services.

docker compose build – Builds images as specified.
```

## Note

In a docker compose file, we need not to create a network separately, it create a network itself and all containers are in same network

```
version: "3.8"
services:
  mongodb:
    image: "mongo"
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - "mongodb_data:/data/db"

  backend:
    image: "daddycorp/week-15-apps"
    container_name: backend_apps
    ports:
      - "3000:3000"
    environment:
      MONGO_URL: mongodb://mongodb:27017

volumes:
  mongodb_data:

```
