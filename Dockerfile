FROM node:latest

WORKDIR /home/node/app

COPY ./server .

ENV NODE_ENV=production
ENV PORT=8080
ENV MORGAN_FORMAT=tiny

ENTRYPOINT ["node", "src/index.js"]