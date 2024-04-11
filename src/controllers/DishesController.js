const {verify} = require("jsonwebtoken");
const AppError = require("../middlewares/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");
const { secret } = require('../configs/auth').jwt;

class DishesController{
  async create(request, response){
    const { name, description, category, image, price, ingredients } = request.body;
    if(!name){
      throw new AppError("O nome do prato precisa ser informado.")
    }
    const dishAlreadyExists = await knex("dishes").whereLike('name', name).first();
    if(dishAlreadyExists){
      throw new AppError("Esse nome de prato já foi cadastrado.");
    }
    const categoryData = await knex("categories").where({label: category}).first();
    if(!categoryData){
      throw new AppError("Categoria inválida.");
    }
    const [{id}] = await knex("dishes").returning("id").insert({name, description, image, price, category_id: categoryData.id});

    if(ingredients && ingredients.length > 0){
      const ingredientsToInsert = ingredients.map((ingredient) => { return {name: String(ingredient).toLowerCase(), dish_id: id}})
      await knex("ingredients").insert(ingredientsToInsert);
    }
    return response.status(201).json({
      message: "Prato cadastrado com sucesso!",
      dish: {id}
    });
  }
  async index(request, response){
    const { name, ingredients } = request.query;
    const formattedIngredients = ingredients ? ingredients.split(",").map((ingredient)=>{
      return String(ingredient).trimStart().trimEnd()}) : undefined;
    try {
      const categories = await knex("categories").select("id","name", "label");
      if(formattedIngredients){
        const dishes = await knex("ingredients")
        .select("dishes.id", "dishes.name as name", "dishes.description", "dishes.price", "dishes.image", "dishes.category_id")
        .whereLike("dishes.name", `%${name??""}%`)
        .whereIn("ingredients.name", formattedIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .orderBy("name");
        const dishesToGetIngredients = dishes.map((dish)=> dish.id);
        const dishesIngredients = await knex("ingredients").select("id", "name", "dish_id").whereIn("ingredients.dish_id", dishesToGetIngredients);
        const dishesWithIngredients = dishes.map((dish)=>{
          const filteredIngredients = dishesIngredients.filter((ingredient)=> ingredient.dish_id === dish.id)
          const ingredientsList = filteredIngredients.map((ingredient)=> ingredient.name);
          return {
            id: dish.id,
            name: dish.name,
            description: dish.description,
            price: dish.price,
            category_id: dish.category_id,
            image: dish.image,
            ingredients: ingredientsList
          }
        })
        const categoriesWithDishes = categories.map((category)=>{
          const filteredDishes = dishesWithIngredients.filter((dish)=> dish.category_id === category.id)
          return {id: category.id, name: category.name, label: category.label, dishes: filteredDishes}
        })
        const filteredCategories = categoriesWithDishes.filter((category) => category.dishes.length > 0)
        return response.json({categories: filteredCategories});
      }else{
        const dishes = await knex("dishes")
        .select("dishes.id", "dishes.name as name", "dishes.description", "dishes.price", "dishes.image", "dishes.category_id")
        .whereLike('dishes.name', `%${name??""}%`)
        .orderBy("name");
        const dishesToGetIngredients = dishes.map((dish)=> dish.id);
        const dishesIngredients = await knex("ingredients").select("id", "name", "dish_id").whereIn("ingredients.dish_id", dishesToGetIngredients);
        const dishesWithIngredients = dishes.map((dish)=>{
          const filteredIngredients = dishesIngredients.filter((ingredient)=> ingredient.dish_id === dish.id)
          const ingredientsList = filteredIngredients.map((ingredient)=> ingredient.name);
          return {
            id: dish.id,
            name: dish.name,
            description: dish.description,
            price: dish.price,
            category_id: dish.category_id,
            image: dish.image,
            ingredients: ingredientsList
          }
        })
        const categoriesWithDishes = categories.map((category)=>{
          const filteredDishes = dishesWithIngredients.filter((dish)=> dish.category_id === category.id)
          return {id: category.id, name: category.name, label: category.label, dishes: filteredDishes}
        })
        const filteredCategories = categoriesWithDishes.filter((category) => category.dishes.length > 0)
        return response.json({categories: filteredCategories});
      }
    } catch (error) {
      throw new AppError(error, 400)
    }
  }
  async show(request, response){
    const {id} = request.params;
    const dish = await knex("dishes")
    .select("dishes.id", "dishes.name as name", "dishes.description", "dishes.price")
    .where({id}).first();
    if(!dish){
      throw new AppError("Prato não encontrado.", 404);
    }
    const ingredients = Array.from(await knex('ingredients').select("name").where('ingredients.dish_id', id)).map((item)=> item.name);
    return response.json({dish, ingredients});
  }
  async delete(request, response){
    const diskStorage = new DiskStorage();
    const {id} = request.params;
    const dish = await knex("dishes").where({id}).first();
    if(!dish){
      throw new AppError("Prato não encontrado", 404);
    }
    try {
      if(dish.image){
        console.log("deletando imagem")
        diskStorage.deleteFile(dish.image)
      }
      await knex('dishes').delete().where({id});
      return response.json({message: "Prato deletado com sucesso."})
    } catch (error) {
      console.log(error)
      throw new AppError("Falha ao deletar o prato.");
    }
  }
  async update(request, response){
    const {id} = request.params;
    const { name, description, category, price, ingredients } = request.body;
    try{
      const dish = await knex("dishes")
      .select("id", "name", "description", "price", "category_id")
      .where({id}).first();
      if(!dish){
        throw new AppError("Prato não encontrado", 404);
      }
      const categoryData = await knex("categories").where({label: category}).first();
      if(!categoryData){
        throw new AppError("Categoria inválida.");
      }
      const currentIngredients = Array.from(await knex("ingredients").select("name").where("dish_id", id)).map((item)=> item.name);
      const filteredIngredients = ingredients?.length > 0 ? ingredients.filter((ingredient)=> ingredients.indexOf(currentIngredients) && ingredient !== "") : ingredients;
      dish.name = name ?? dish.name;
      dish.description = description ?? dish.description;
      dish.price = price ?? dish.price;
      dish.category_id = categoryData.id ;
      console.log(dish)
      await knex("dishes").update(dish).where({id});
      if(filteredIngredients.length > 0){
        const ingredientsToInsert = filteredIngredients?.map((ingredient)=>{
          return {
            name: ingredient,
            dish_id: id,
          }
        });
        await knex("ingredients").delete().where("dish_id", id);
        await knex("ingredients").insert(ingredientsToInsert);
      }else{
        await knex("ingredients").delete().where("dish_id", id);
      }
      return response.json({ message: "Prato atualizado com sucesso!"})
    }catch(error){
      console.log(error);
      throw new AppError("Falha ao atualizar")
    }
  }
  async upload(request, response){
    const diskStorage = new DiskStorage();
    const {id} = request.params;
    const dish = await knex("dishes").where({id}).first();
    const {filename} = request.file;
    if(!dish){
      throw new AppError("Prato não localizado", 404);
    }
    if(dish.image){
      await diskStorage.deleteFile(dish.image);
    }
    const updatedFilename = await diskStorage.saveFile(filename);
    dish.image = updatedFilename;
    await knex("dishes").update(dish).where({id});
    return response.json(dish)
  }
}
module.exports = DishesController;