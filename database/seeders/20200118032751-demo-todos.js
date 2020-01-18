'use strict';

const Sentencer = require('sentencer');

const todoGenerator = (count) => {
  const a = new Array(count);
  for (let i = 0; i < count; i++) {
    a[i] = {
      title: Sentencer.make("This sentence has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it."),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
  return a;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('todos', todoGenerator(100));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('todos', null, {});
  }
};
