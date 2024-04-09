exports.up = knex => knex.schema.createTableIfNotExists("ingredients",(table)=>{
  table.uuid("id").primary().defaultTo(knex.fn.uuid());
  table.string("name").notNullable();
  table.uuid("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
});
exports.down = knex => knex.schema.dropTableIfExists("ingredients");