"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Verify_tokens extends Model {
        static associate(models) {
            // define association here
        }
    }
    Verify_tokens.init(
        {
            token: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
            used: DataTypes.BOOLEAN,
            email: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Verify_tokens",
            tableName: "verify_tokens",
        }
    );
    return Verify_tokens;
};
