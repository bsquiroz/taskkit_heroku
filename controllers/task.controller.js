const {
    getStatuses,
    getCategories,
    getTasks,
    postTask,
    getOneTask,
    delTask,
    putTask,
    getTaskforUpdate,
    completedUpdating,
} = require("../services/task.services");

const renderTaks = async (req, res) => {
    const idUser = req.user.dataValues.id;

    const statuses = await getStatuses(idUser);
    const categories = await getCategories(idUser);
    const tasks = await getTasks(idUser);

    const data = {
        statuses,
        categories,
        tasks,
    };

    const fullName = `${req.user.firstname} ${req.user.lastname}`;
    const emailUser = req.user.email;
    return res.render("pages/tasks", {
        title: "tareas",
        fullName,
        data,
        emailUser,
    });
};

const createTask = async (req, res) => {
    try {
        const user_id = req.user.dataValues.id;
        const { title, description, due_date, status, category } = req.body;
        await postTask(user_id, title, description, due_date, status, category);
        res.redirect("/tareas");
    } catch (error) {
        console.log(error);
    }
};

const updateTask = async (req, res) => {
    try {
        const fullName = `${req.user.firstname} ${req.user.lastname}`;
        const idUser = req.user.dataValues.id;
        const idTask = req.params.id;
        const emailUser = req.user.email;

        const statuses = await getStatuses(idUser);
        const categories = await getCategories(idUser);
        const task = await getOneTask(idTask);

        const data = {
            statuses,
            categories,
            task,
            idTask,
        };

        return res.render("pages/edit-task", {
            title: "editando tarea",
            fullName,
            data,
            emailUser,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        await delTask(taskId);
        return res.redirect("/tareas");
    } catch (error) {
        return console.log(error);
    }
};

const NowdeleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, due_date, status, category } = req.body;
        await putTask(taskId, title, description, due_date, status, category);
        return res.redirect("/tareas");
    } catch (error) {
        console.log(error);
    }
};

const updateCompleted = async (req, res) => {
    try {
        const taskId = req.params.id;
        const dataQuery = await getTaskforUpdate(taskId);
        const completed = !dataQuery[0].completed;
        await completedUpdating(completed, taskId);
        return res.redirect("/tareas");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    renderTaks,
    createTask,
    updateTask,
    deleteTask,
    NowdeleteTask,
    updateCompleted,
};
