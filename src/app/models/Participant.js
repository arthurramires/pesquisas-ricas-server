import Sequelize, { Model } from 'sequelize';
import { v1 } from 'uuid';

class Participant extends Model {
  static init(sequelize) {
    super.init(
      {
        password: Sequelize.STRING,
        fields: Sequelize.JSON,
        answers: Sequelize.JSON,
        status: Sequelize.INTEGER
      },
      { sequelize }
    );

    this.addHook('beforeCreate', async participant => {
      participant.id = v1();
      participant.password = participant.id.substring(0, 8);
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Quiz, {
      foreignKey: 'quiz_id',
      as: 'quiz'
    });
  }
}

export default Participant;
