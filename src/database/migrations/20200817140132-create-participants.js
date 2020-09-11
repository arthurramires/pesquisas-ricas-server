'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('participants', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      quiz_id: {
        type: Sequelize.UUID,
        references: { model: 'quizzes', key: 'id' },
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      fields: {
        type: Sequelize.JSON,
        allowNull: false
      },
      answers: {
        type: Sequelize.JSON,
        allowNull: true
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('participants');
  }
};
