FROM node:20

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

expose 3000

CMD ["node", "dist/main.js"]
