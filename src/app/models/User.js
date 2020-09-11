import Sequelize, { Model } from 'sequelize';
import bcript from 'bcryptjs';
import { v1 } from 'uuid';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        customer: Sequelize.BOOLEAN
      },
      { sequelize }
    );

    this.addHook('beforeCreate', async user => {
      user.id = v1();
    });

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcript.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      foreignKey: 'avatar_id',
      as: 'avatar'
    });
  }

  checkPassword(password) {
    return bcript.compare(password, this.password_hash);
  }
}

export default User;
