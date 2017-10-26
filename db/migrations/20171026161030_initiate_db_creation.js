exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Event', function (table) {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('creator', 64).notNullable();
      table.date('create_date');
    }),
    knex.schema.createTable('EventDay', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('event_id').unsigned();
      table.foreign('event_id').references('Event.id');
      table.date('event_date').notNullable();
      table.time('event_start').notNullable();
      table.time('event_end').notNullable();
    }),
    knex.schema.createTable('Person', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name', 128).notNullable();
      table.varchar('email');
      table.string('hash').notNullable();
    }),
    knex.schema.createTable('PersonEventDay', function (table) {  
      table.increments('id').primary();
      table.integer('person_id').unsigned();
      table.foreign('person_id').references('Person.id');
      table.integer('event_day').unsigned();
      table.foreign('event_day').references('EventDay.id');
      table.boolean('vote').notNullable();
    }),
    knex.schema.dropTableIfExists('users') 
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('PersonEventDay'),
    knex.schema.dropTableIfExists('Person'),
    knex.schema.dropTableIfExists('EventDay'),
    knex.schema.dropTableIfExists('Event')    
  ])
};
