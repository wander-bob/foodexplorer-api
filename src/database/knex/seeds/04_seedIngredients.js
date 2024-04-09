const {dishes} = require("../../db-example.json")
exports.seed = async function(knex) {
  const currentDishes = await knex("dishes").select("id as dish_id", "name");
  let ingredientsWithId = []; 
  dishes.map((dish)=>{
    const dishFiltered = currentDishes.find((data) => data.name === dish.name);
    dish.ingredients.map((ingredient)=>{
      return ingredientsWithId.push({ name: ingredient, dish_id: dishFiltered.dish_id});
    });
  });
  await knex("ingredients").insert(ingredientsWithId);
}