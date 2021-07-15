"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
            Task.belongsTo(models.Category, {
                foreignKey: "category_id",
                // as: "categories",
            });
            Task.belongsTo(models.Users, {
                foreignKey: "user_id",
            });
            Task.belongsTo(models.Status, {
                foreignKey: "status_id",
                // as: "statuses",
            });
        }
    }
    Task.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            due_date: DataTypes.DATE,
            user_id: DataTypes.INTEGER,
            category_id: DataTypes.INTEGER,
            status_id: DataTypes.INTEGER,
            completed: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Task",
            tableName: "tasks",
        }
    );
    return Task;
};
