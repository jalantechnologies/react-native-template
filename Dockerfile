FROM node:22-bullseye

WORKDIR /app

# install dependencies for node
RUN apt-get update
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

COPY package.json /.project/package.json
COPY yarn.lock /.project/yarn.lock
RUN cd /.project
RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive 
RUN mkdir -p /opt/app && cp -a /.project/. /opt/app/

WORKDIR /opt/app

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive

COPY . /opt/app

# build arguments
ARG NODE_ENV
ARG NODE_CONFIG_ENV
