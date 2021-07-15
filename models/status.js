"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Status extends Model {
        static associate(models) {
            Status.hasMany(models.Task, {
                foreignKey: "status_id",
            });
        }
    }
    Status.init(
        {
            name: DataTypes.STRING,
            color: DataTypes.STRING,
            created_by: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Status",
            tableName: "statuses",
        }
    );
    return Status;
};
