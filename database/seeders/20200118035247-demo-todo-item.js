'use strict';

const Sentencer = require('sentencer');

const todoItemGenerator = (count) => {
  const a = new Array(count);
  for (let i = 0; i < count; i++) {
    a[i] = {
      content: Sentencer.make("I have {{ an_adjective }} {{ noun }}. And I also have {{ an_adjective }} {{ adjective }} {{ noun }} which I would put to work tonight."),
      complete: !!Math.round(Math.random()),
      created_at: new Date(),
      updated_at: new Date(),
      todo_id: Math.floor((Math.random() * 100) + 1),
    };
  }
  return a;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('todo_items', todoItemGenerator(10000));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('todo_items', null, {});
  }
};
