
exports.up = function(knex, Promise) { //creatin the table .up for create
  return knex.schema.createTable('product',(table) =>
  {
    table.increments();
    table.text('title').notNullable(); //notNullable()-make sure it is not empty
    table.text('description');
    table.decimal('price').notNullable();
    table.integer('quantity').unsigned().notNullable();//unsigned()-make sure is only postive numbers
    table.text('image');
  });
};

exports.down = function(knex, Promise) { // can also to roll back .down for roolback
  return knex.schema.dropTableIfExists('product'); 
};
