const AppError = require("../middlewares/AppError");
const knex = require("../database/knex");

class CategoriesController {
  async index(request, response){
    const categories = await knex("categories");
    response.json(categories)
  }
}
module.exports = CategoriesController