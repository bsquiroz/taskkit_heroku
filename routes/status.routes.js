const { Router } = require("express");
const statusController = require("../controllers/status.controller");
const protectRoute = require("../middlewares/protect-routes");

const statusRouter = Router();

statusRouter.get("/estatus", protectRoute, statusController.renderStatus);
statusRouter.post(
    "/estatus/create",
    protectRoute,
    statusController.createStatus
);
statusRouter.get(
    "/estatus/editar/:id",
    protectRoute,
    statusController.updateStatus
);
statusRouter.get(
    "/estatus/eliminar/:id",
    protectRoute,
    statusController.deleteStatus
);
statusRouter.post(
    "/estatus/editar/:id/:id",
    protectRoute,
    statusController.newUpdateStatus
);

module.exports = statusRouter;
