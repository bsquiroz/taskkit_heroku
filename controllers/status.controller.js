const {
    getStatuses,
    postStatus,
    viewPutStatus,
    delStatus,
    putStatus,
} = require("../services/status.services");

const renderStatus = async (req, res) => {
    try {
        const fullName = `${req.user.firstname} ${req.user.lastname}`;
        const idUser = req.user.dataValues.id;
        const data = await getStatuses(idUser);
        const emailUser = req.user.email;

        return res.render("pages/status", {
            title: "estatus",
            fullName,
            data,
            emailUser,
        });
    } catch (error) {
        console.log(error);
    }
};

const createStatus = async (req, res) => {
    try {
        const created_by = req.user.dataValues.id;
        const name = req.body.name;
        const color = req.body.color;
        await postStatus(color, created_by, name);
        res.redirect("/estatus");
    } catch (error) {
        console.log(error);
    }
};

const updateStatus = async (req, res) => {
    const fullName = `${req.user.firstname} ${req.user.lastname}`;
    const statusId = req.params.id;
    const data = await viewPutStatus(statusId);
    const emailUser = req.user.email;
    return res.render("pages/edit-status", {
        title: "editando | estatus",
        fullName,
        statusId,
        data,
        emailUser,
    });
};

const deleteStatus = async (req, res) => {
    try {
        const statusId = req.params.id;
        await delStatus(statusId);
        return res.redirect("/estatus");
    } catch (error) {
        return console.log(error);
    }
};

const newUpdateStatus = async (req, res) => {
    try {
        const statusId = req.params.id;
        const { name, color } = req.body;
        await putStatus(name, color, statusId);
        return res.redirect("/estatus");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    renderStatus,
    createStatus,
    updateStatus,
    deleteStatus,
    newUpdateStatus,
};
