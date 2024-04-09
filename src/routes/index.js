const {Router} = require("express");

const userRoutes = require("./indexers/user.routes");
const categoriesRoutes = require("./indexers/categories.routes");

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/categories", categoriesRoutes);

module.exports = routes;