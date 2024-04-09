const {dishes} = require("../../db-example.json");
exports.seed = async function(knex) {
  const currentCategories = await knex("categories");
  const dishesWithCategories = dishes.map(({name, description, image, price, category})=>{
    const {id: category_id} = currentCategories.find(({name})=> name === category);
    return {name, description, price, image, category_id};
  });
  await knex('dishes').insert(dishesWithCategories);
};
