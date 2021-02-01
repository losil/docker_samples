# voting_app
this demo application shows how powerful docker-compose is.
the application can be run with the following command in the same directory as the `docker-compose.yml`file stays.

```bash
docker-compose up -d
```

Have a look at the `docker-compose.yml` file. Five different services are defined which will communicate with each other. This provides
```yaml
---
version: "3"

services:
  vote:
    build: ./vote
    command: python app.py
    volumes:
     - ./vote:/app
    ports:
      - "5000:80"

  redis:
    image: redis:alpine
    ports: ["6379"]

  worker:
    build: ./worker

  db:
    image: postgres:9.4
    environment:
      POSTGRES_USER: "postgres"
      POSTGRES_PASSWORD: "postgres"

  result:
    build: ./result
    command: nodemon server.js
    volumes:
      - ./result:/app
    ports:
      - "5001:80"
      - "5858:5858"
```