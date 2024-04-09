const { Router } = require("express");
const multer = require("multer");
const DishesController = require("../../controllers/DishesController");
const authObserver = require('../../middlewares/authObserver');
const authorizationObserver = require("../../middlewares/authorizationObserver");
const multerConfig = require("../../configs/multerConfig");

const upload = multer(multerConfig.MULTER);
const dishesController = new DishesController();
const dishesRoutes = Router();

dishesRoutes.use(authObserver);

dishesRoutes.post("/", authorizationObserver("manager"),  dishesController.create);
dishesRoutes.get("/", dishesController.index);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.put("/:id", authorizationObserver("manager"), dishesController.update);
dishesRoutes.patch("/:id", authorizationObserver("manager"), upload.single("image"), dishesController.upload);
dishesRoutes.delete("/:id", authorizationObserver("manager"), dishesController.delete);
module.exports = dishesRoutes;