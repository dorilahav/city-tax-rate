FROM node:20-alpine as build

COPY . /tmp/app-build
WORKDIR /tmp/app-build
RUN npm i
RUN npm run build

FROM node:20-alpine

RUN npm i -g serve
COPY --from=build /tmp/app-build/dist /opt/app
WORKDIR /opt/app

ENTRYPOINT [ "serve", "/opt/app" ]