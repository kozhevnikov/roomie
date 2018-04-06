FROM node:8

WORKDIR /usr/src/roomie

COPY package*.json ./
RUN npm install

COPY *.js* ./
COPY src/ src/
RUN npm run build

ENV NODE_ENV production
RUN npm prune

EXPOSE 3000

CMD ["node", "app.js"]
