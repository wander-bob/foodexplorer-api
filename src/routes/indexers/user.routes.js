const { Router } = require("express");
const UserController = require("../../controllers/UserController");
const authObserver = require('../../middlewares/authObserver');

const userRoutes = Router();
const userController = new UserController();

userRoutes.post("/", userController.create);
userRoutes.put("/", authObserver, userController.update);
module.exports = userRoutes;