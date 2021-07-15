const { Router } = require("express");
const categoryController = require("../controllers/category.controller");
const protectRoute = require("../middlewares/protect-routes");

const categoryRouter = Router();

categoryRouter.get(
    "/categorias",
    protectRoute,
    categoryController.renderCategory
);

categoryRouter.post(
    "/categorias/create",
    protectRoute,
    categoryController.createCategory
);

categoryRouter.get(
    "/categorias/editar/:id",
    protectRoute,
    categoryController.updateCategory
);

categoryRouter.get(
    "/categorias/eliminar/:id",
    protectRoute,
    categoryController.deleteCategory
);

categoryRouter.post(
    "/categorias/editar/:id/:id",
    protectRoute,
    categoryController.newUpdateCategory
);

module.exports = categoryRouter;
