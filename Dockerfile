FROM node:8

ENV NODE_ENV production

WORKDIR /usr/src/roomie

COPY package*.json ./
RUN npm install

COPY *.js* ./
COPY src/server/ src/server/
COPY dist/ dist/

EXPOSE 3000

CMD ["node", "app.js"]
