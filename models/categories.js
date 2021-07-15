"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Task, {
                foreignKey: "category_id",
            });
        }
    }
    Category.init(
        {
            name: DataTypes.STRING,
            created_by: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Category",
            tableName: "categories",
        }
    );
    return Category;
};
