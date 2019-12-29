'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('todo_items', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      complete: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      todo_id: {
        onDelete: 'CASCADE',
        type: Sequelize.INTEGER,
        references: {
          key: 'id',
          as: 'todo_id',
          model: 'todos',
        },
      },
    });
  },

  down: queryInterface => queryInterface.dropTable('todo_items'),
};
