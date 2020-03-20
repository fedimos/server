# fedimos/server

> The Fedimos project server, powered by ActivityPub & NodeJS.

---

**:exclamation: Due to _life_, this spare-time-only students project is ~~now abandoned~~ stillborn.**

Instead of reinventing the wheel, we would rather advise you to implement a proper federation and/or _ActivityPub_ support for an existing production-grade messaging service (as [Rocket.Chat for instance](https://github.com/RocketChat/Rocket.Chat/issues/601)).

If you're interested in the organization name on (Microsoft's) GitHub (and/or the project itself), [feel free to contact us via email](mailto:dev+fedimos@samuel.domains).

---

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
