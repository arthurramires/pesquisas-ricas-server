import Sequelize, { Model } from 'sequelize';
import { v1 } from 'uuid';

class Quiz extends Model {
  static init(sequelize) {
    super.init(
      {
        start: Sequelize.DATE,
        ending: Sequelize.DATE,
        status: Sequelize.INTEGER
      },
      { sequelize }
    );

    this.addHook('beforeCreate', async quiz => {
      quiz.id = v1();
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });

    this.belongsTo(models.Template, {
      foreignKey: 'template_id',
      as: 'template'
    });
  }
}

export default Quiz;
