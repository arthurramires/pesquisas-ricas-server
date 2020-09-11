import Sequelize from 'sequelize';

import File from '../app/models/File';
import User from '../app/models/User';
import Template from '../app/models/Template';
import Quiz from '../app/models/Quiz';
import Participant from '../app/models/Participant';

import databaseConfig from '../config/database';

const models = [File, User, Template, Quiz, Participant];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
