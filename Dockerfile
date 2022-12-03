FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT 5000

EXPOSE $PORT

VOLUME [ "/app/data" ]

RUN npm run build

CMD ["node", "dist/server.js"]