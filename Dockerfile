FROM ruby:3.1

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN printf 'Package: nodejs\nPin: origin deb.nodesource.com\nPin-Priority: 1001' > /etc/apt/preferences.d/nodesource \
  && curl -sL https://deb.nodesource.com/setup_16.x | bash -\
  && apt-get update -qq && apt-get install -qq --no-install-recommends \
    nodejs \
  && apt-get upgrade -qq \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*\
  && npm install -g yarn@1

# FROM node:16-buster
# FROM ruby:3.1.2

WORKDIR /app

# # install dependencies for node
# RUN apt-get update
# RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb


RUN gem install bundler
RUN gem install fastlane

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