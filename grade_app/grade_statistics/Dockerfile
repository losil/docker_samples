FROM node:15.7.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN chown -R node:node ./

EXPOSE 3000

USER node

CMD ["npm", "start"]