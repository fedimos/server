# fedimos/server

> The Fedimos project server, powered by ActivityPub & NodeJS.

**:warning: WIP alpha-state project. Do not run it unless you know what you're doing. :warning:**

## Installation

```bash
git clone git+https://github.com/fedimos/server.git
cd server/
docker-compose up -d
```

## Deployment

### Running migrations

Once your server is up and running, you may want to run pending migrations :

```bash
docker-compose run --rm fedimos-server npm run migrate -- up
```

## Update

```bash
docker-compose down
git pull
docker-compose up --build -d
# You really should run pending migrations here.
```
