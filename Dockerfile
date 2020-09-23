FROM node:12.18.3-alpine as builder

WORKDIR /usr/app

RUN npm install --save sequelize

COPY package*.json .

COPY . .

RUN npm i

RUN npm install dotenv-extended

RUN npm install stress-node

RUN npm run build

COPY package*.json /usr/app/dist
COPY .env.example /usr/app/dist

WORKDIR /usr/app/dist

RUN cp sequelizerc .sequelizerc
RUN cp .env.example .env

RUN ls

RUN npm i

EXPOSE 3333

ENTRYPOINT npm run dev:queue




