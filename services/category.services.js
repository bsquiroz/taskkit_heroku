const { Category } = require("../models");

const getCategories = async (idUser) => {
    try {
        let data = await Category.findAll({ where: { created_by: idUser } });
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

const postCategory = async (name, created_by) => {
    try {
        const data = await Category.create({
            name,
            created_by,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

const viewPutCategory = async (categoryId) => {
    try {
        const data = await Category.findAll({
            where: { id: categoryId },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
};

const delCategory = async (categoryId) => {
    try {
        let data = await Category.destroy({ where: { id: categoryId } });
        return data;
    } catch (error) {
        console.log(error);
    }
};

const putCategory = async (name, categoryId) => {
    try {
        const data = Category.update({ name }, { where: { id: categoryId } });
        return data;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getCategories,
    postCategory,
    viewPutCategory,
    delCategory,
    putCategory,
};
