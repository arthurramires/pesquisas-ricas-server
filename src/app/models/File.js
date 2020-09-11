import Sequelize, { Model } from 'sequelize';
import aws from 'aws-sdk';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { v1 } from 'uuid';

const s3 = new aws.S3();

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return process.env.NODE_ENV === 'development'
              ? `${process.env.APP_URL}/files/${this.path}`
              : `https://${process.env.AWS_URL}/${this.path}`;
          }
        }
      },
      { sequelize }
    );

    this.addHook('beforeCreate', async file => {
      file.id = v1();
    });

    this.addHook('afterDestroy', async file => {
      if (process.env.NODE_ENV === 'development') {
        try {
          promisify(fs.unlink)(
            path.resolve(
              __dirname,
              '..',
              '..',
              '..',
              'tmp',
              'uploads',
              `${file.path}`
            )
          );
        } catch (err) {
          console.log(err);
        }
      } else {
        s3.deleteObject({
          Bucket: process.env.AWS_URL,
          Key: file.path
        }).promise();
      }
    });

    return this;
  }
}

export default File;
