const {Router} = require("express");

const userRoutes = require("./indexers/user.routes");

const routes = Router();

routes.use("/user", userRoutes);

module.exports = routes;