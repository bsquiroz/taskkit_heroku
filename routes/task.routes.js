const { Router } = require("express");
const taskController = require("../controllers/task.controller");
const protectRoute = require("../middlewares/protect-routes");
const isCountVerify = require("../middlewares/isCountVerify");

const taskRouter = Router();

taskRouter.get("/tareas", protectRoute, taskController.renderTaks);
taskRouter.post("/tareas/create", protectRoute, taskController.createTask);
taskRouter.get("/tareas/editar/:id", protectRoute, taskController.updateTask);
taskRouter.get("/tareas/eliminar/:id", protectRoute, taskController.deleteTask);
taskRouter.post(
    "/tareas/editar/:id/:id",
    protectRoute,
    taskController.NowdeleteTask
);
taskRouter.get(
    "/tareas/completed/:id",
    protectRoute,
    taskController.updateCompleted
);

module.exports = taskRouter;
