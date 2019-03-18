const products = require('../products');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('product').del()
    .then(function () {
      // Inserts seed entries
      return knex('product').insert(products); //product is name of the table, products -we are creating an array from var see line 1
    });
};
 