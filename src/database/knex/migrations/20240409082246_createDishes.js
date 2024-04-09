exports.up = knex => knex.schema.createTableIfNotExists("dishes",(table)=>{
  table.uuid("id").primary().defaultTo(knex.fn.uuid());
  table.string("name").notNullable();
  table.string("description");
  table.string("image");
  table.decimal("price").defaultTo(0);
  table.string("category_id").references("id").inTable("categories");  
  table.datetime("created_at").defaultTo(knex.raw(`(datetime('now', 'localtime'))`));
  table.datetime("updated_at").defaultTo(knex.raw(`(datetime('now', 'localtime'))`));
});
exports.down = knex => knex.schema.dropTableIfExists("dishes");