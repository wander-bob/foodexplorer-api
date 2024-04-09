exports.up = knex => knex.schema.createTableIfNotExists("categories",(table)=>{
  table.uuid("id").primary().defaultTo(knex.fn.uuid());
  table.string("name").unique().notNullable();
  table.string("label").notNullable();
  table.datetime("created_at").defaultTo(knex.raw(`(datetime('now', 'localtime'))`));
  table.datetime("updated_at").defaultTo(knex.raw(`(datetime('now', 'localtime'))`));
});
exports.down = knex => knex.schema.dropTableIfExists("categories");