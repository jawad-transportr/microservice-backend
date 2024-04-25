# Base image
FROM node:20-alpine AS BASEIMAGE

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install
RUN npm run build  && npm prune --production

# PRODUCTION
FROM node:20-alpine

WORKDIR /usr/src/app


COPY --from=BASEIMAGE /usr/src/app/dist /usr/src/app/dist
COPY --from=BASEIMAGE /usr/src/app/node_modules  /usr/src/app/node_modules
COPY --from=BASEIMAGE /usr/src/app/package.json /usr/src/app/package.json
# COPY --from=BASEIMAGE /usr/src/app/config.yaml /usr/src/app/
# COPY --from=BASEIMAGE /usr/src/app/easyfleet-key.pem /usr/src/app/
# COPY --from=BASEIMAGE /usr/src/app/easyfleet-public.pem /usr/src/app/
# COPY YAML FILE IF NEEDED.

ENV PORT ${PORT}
ENV CONFIG_FILE ${CONFIG_FILE}

# GET FROM ENV FILE 
EXPOSE ${PORT} 

CMD node dist/main.js --config=${CONFIG_PATH}