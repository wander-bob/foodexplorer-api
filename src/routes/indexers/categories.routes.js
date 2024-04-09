const { Router } = require("express");
const CategoriesController = require("../../controllers/CategoriesController");
const authObserver = require('../../middlewares/authObserver');

const categoriesController = new CategoriesController();

const categoriesRoutes = Router();

categoriesRoutes.use(authObserver);

categoriesRoutes.get("/", categoriesController.index);
module.exports = categoriesRoutes;