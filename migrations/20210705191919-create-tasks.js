"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("tasks", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            due_date: {
                allowNull: false,
                type: Sequelize.DATEONLY,
            },
            completed: {
                type: Sequelize.BOOLEAN,
                defaultvalue: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            category_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "categories",
                    key: "id",
                },
            },
            status_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "statuses",
                    key: "id",
                },
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("tasks");
    },
};
