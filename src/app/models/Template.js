import Sequelize, { Model } from 'sequelize';
import { v1 } from 'uuid';
import SequelizeSlugify from 'sequelize-slugify';

class Template extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        slug: Sequelize.STRING
      },
      { sequelize }
    );

    SequelizeSlugify.slugifyModel(Template, {
      source: ['name'],
      slugOptions: { lower: true },
      overwrite: false,
      column: 'slug',
      incrementalReplacement: '-'
    });

    this.addHook('beforeCreate', async template => {
      template.id = v1();
    });

    return this;
  }
}

export default Template;
