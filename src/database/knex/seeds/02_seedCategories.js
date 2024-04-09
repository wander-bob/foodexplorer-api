
const {categories} = require("../../db-example.json")
exports.seed = async function(knex) {
  await knex('ingredients').del();
  await knex('dishes').del();
  await knex('categories').del();
  await knex('categories').insert(categories);
};
