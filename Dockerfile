FROM node
MAINTAINER zixian <zixian1992@hotmail.com>
VOLUME ["/newsfeed/src"]
RUN npm install -g gulp
WORKDIR /newsfeed
ADD ./package.json /newsfeed/package.json
RUN npm install
