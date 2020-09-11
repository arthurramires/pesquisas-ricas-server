FROM node:12.18.3-alpine as builder

WORKDIR /usr/app

RUN npm install --save sequelize

COPY package*.json .

COPY . .

RUN npm i

RUN npm install dotenv-extended

RUN npm run build

COPY package*.json /usr/app/dist

WORKDIR /usr/app/dist

RUN cp sequelizerc .sequelizerc

RUN ls

RUN npm i

EXPOSE 3333

# RUN yarn sequelize db:migrate

ENTRYPOINT npm run dev:queue





