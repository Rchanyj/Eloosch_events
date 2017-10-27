exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('events', function (table) {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.string('creator', 64).notNullable();
      table.date('create_date');
    }),
    knex.schema.createTable('event_days', function (table) {
      table.increments('id').unsigned().primary();
      table.integer('event_id').unsigned();
      table.foreign('event_id').references('events.id');
      table.date('event_date').notNullable();
      table.time('event_start').notNullable();
      table.time('event_end').notNullable();
    }),
    knex.schema.createTable('persons', function (table) {
      table.increments('id').unsigned().primary();
      table.string('name', 128).notNullable();
      table.varchar('email');
      table.string('hash').notNullable();
    }),
    knex.schema.createTable('person_event_days', function (table) {  
      table.increments('id').primary();
      table.integer('person_id').unsigned();
      table.foreign('person_id').references('persons.id');
      table.integer('event_day').unsigned();
      table.foreign('event_day').references('event_days.id');
      table.boolean('vote').notNullable();
    }),
    knex.schema.dropTableIfExists('users') 
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('person_event_days'),
    knex.schema.dropTableIfExists('persons'),
    knex.schema.dropTableIfExists('event_days'),
    knex.schema.dropTableIfExists('events')    
  ])
};
