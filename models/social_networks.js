"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class socialNetwork extends Model {
        static associate(models) {
            // define association here
        }
    }
    socialNetwork.init(
        {
            user_id: DataTypes.INTEGER,
            provider: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "socialNetwork",
            tableName: "social_networks",
        }
    );
    return socialNetwork;
};
