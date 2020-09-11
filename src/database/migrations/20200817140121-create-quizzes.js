'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('quizzes', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        references: { model: 'users', key: 'id' },
        allowNull: false
      },
      template_id: {
        type: Sequelize.UUID,
        references: { model: 'templates', key: 'id' },
        allowNull: false
      },
      start: {
        type: Sequelize.DATE,
        allowNull: true
      },
      ending: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('quizzes');
  }
};
