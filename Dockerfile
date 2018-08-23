FROM node:8

MAINTAINER dev@samuel.domains


# Environment variables (may be overwritten).
ENV PORT=3000 \
	NODE_ENV=production \
	DATABASE_NAME=fedimos \
	MONGODB_URL=mongodb://mongo:27017

# Don't run this container as `root` (prefer a built-in unprivileged user).
USER node

# Allow NPM dependencies caching.
ADD package.json /tmp/package.json
RUN cd /tmp/ && \
	npm install --no-package-lock
RUN mkdir /home/node/fedimos/ && \
	cp -a /tmp/node_modules/ /home/node/fedimos/

# Install the application itself.
WORKDIR /home/node/fedimos/
ADD . .

# Notice Docker this port will be exposed.
EXPOSE $PORT


# Run the application.
CMD ["npm", "start"]
