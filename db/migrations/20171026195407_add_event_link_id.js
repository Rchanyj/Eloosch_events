
exports.up = function(knex, Promise) {
  return knex.schema.table('events', function(table) {
    table.string('event_link_id', 16).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('events', function(table) {
    table.dropColumn('event_link_id');
  });
};
