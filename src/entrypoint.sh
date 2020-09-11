#!/bin/bash

yarn sequelize db:migrate

npm run dev:queue
