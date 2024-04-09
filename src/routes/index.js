const {Router} = require("express");

const userRoutes = require("./indexers/user.routes");
const categoriesRoutes = require("./indexers/categories.routes");
const sessionsRoutes = require("./indexers/sessions.routes");

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/categories", categoriesRoutes);
routes.use("/sessions", sessionsRoutes);

module.exports = routes;