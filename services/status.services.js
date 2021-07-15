const { Status } = require("../models");

const getStatuses = async (idUser) => {
    try {
        let data = await Status.findAll({ where: { created_by: idUser } });
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const postStatus = async (color, created_by, name) => {
    try {
        const data = await Status.create({
            color,
            name,
            created_by,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

const viewPutStatus = async (statusId) => {
    try {
        const data = await Status.findAll({
            where: { id: statusId },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

const delStatus = async (statusId) => {
    try {
        await Status.destroy({ where: { id: statusId } });
    } catch (error) {
        console.log(error);
    }
};

const putStatus = async (name, color, statusId) => {
    try {
        await Status.update({ name, color }, { where: { id: statusId } });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getStatuses,
    postStatus,
    viewPutStatus,
    delStatus,
    putStatus,
};
