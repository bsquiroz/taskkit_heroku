const {
    getCategories,
    postCategory,
    viewPutCategory,
    delCategory,
    putCategory,
} = require("../services/category.services");

const renderCategory = async (req, res) => {
    try {
        const fullName = `${req.user.firstname} ${req.user.lastname}`;
        const idUser = req.user.dataValues.id;
        const data = await getCategories(idUser);
        const emailUser = req.user.email;

        return res.render("pages/categories", {
            title: "categorias",
            fullName,
            data,
            emailUser,
        });
    } catch (error) {
        console.log(error);
    }
};

const createCategory = async (req, res) => {
    try {
        const created_by = req.user.dataValues.id;
        const name = req.body.name;
        await postCategory(name, created_by);
        res.redirect("/categorias");
    } catch (error) {
        console.log(error);
    }
};

const updateCategory = async (req, res) => {
    try {
        const fullName = `${req.user.firstname} ${req.user.lastname}`;
        const categoryId = req.params.id;
        const data = await viewPutCategory(categoryId);
        const emailUser = req.user.email;
        return res.render("pages/edit-category", {
            title: "editar | categoria",
            categoryId,
            fullName,
            data,
            emailUser,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        await delCategory(categoryId);
        return res.redirect("/categorias");
    } catch (error) {
        return console.log(error);
    }
};

const newUpdateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name } = req.body;
        await putCategory(name, categoryId);
        return res.redirect("/categorias");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    renderCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    newUpdateCategory,
};
