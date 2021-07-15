const { Status } = require("../models");
const { Category } = require("../models");
const { Task } = require("../models");

const getStatuses = async (idUser) => {
    try {
        let data = await Status.findAll({ where: { created_by: idUser } });
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const getCategories = async (idUser) => {
    try {
        let data = await Category.findAll({ where: { created_by: idUser } });
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const getTasks = async (idUser) => {
    // { model: Category, as: "categories" },
    // { model: Status, as: "statuses" },
    try {
        const data = await Task.findAll({
            where: { user_id: idUser },
            include: [{ model: Category }, { model: Status }],
        });
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const postTask = async (
    user_id,
    title,
    description,
    due_date,
    status,
    category
) => {
    try {
        const data = await Task.create({
            title,
            description,
            user_id,
            due_date,
            status_id: status,
            category_id: category,
            completed: false,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

const getOneTask = async (idTask) => {
    try {
        const data = await Task.findAll({
            where: { id: idTask },
            include: [{ model: Category }, { model: Status }],
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

const delTask = async (taskId) => {
    try {
        await Task.destroy({ where: { id: taskId } });
    } catch (error) {
        console.log(error);
    }
};

const putTask = async (
    taskId,
    title,
    description,
    due_date,
    status_id,
    category_id
) => {
    try {
        await Task.update(
            { title, description, due_date, status_id, category_id },
            { where: { id: taskId } }
        );
    } catch (error) {
        console.log(error);
    }
};

const getTaskforUpdate = async (idTask) => {
    try {
        const data = await Task.findAll({ where: { id: idTask } });
        return data;
    } catch (error) {
        console.log(error);
    }
};

const completedUpdating = async (completed, taskId) => {
    try {
        await Task.update({ completed }, { where: { id: taskId } });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getStatuses,
    getCategories,
    getTasks,
    postTask,
    getOneTask,
    delTask,
    putTask,
    getTaskforUpdate,
    completedUpdating,
};
