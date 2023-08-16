FROM reactnativecommunity/react-native-android

ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

WORKDIR /app

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
