# voting_app
this demo application shows how powerful docker-compose is.
the application can be run with the following command in the same directory as the `docker-compose.yml`file stays.

```bash
docker-compose up -d
```

Have a look at the `docker-compose.yml` file. Five different services are defined which will work together. Each service is run seperately in a container. The individual containers are able to communicate which each other. The services `vote`, `worker` and `result` will be built which custom source code before the containers will be started.
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
The vote application updates every vote into to `Redis` database. The `worker` application watches the queue. If new votes are placed, the `worker` app will empty the queue and write the votes to the `postgres` db. The `result`service will query the results from the db and display them in your browser.
