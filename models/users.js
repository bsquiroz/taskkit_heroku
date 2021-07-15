const bcrypt = require("bcryptjs");

("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            Users.hasMany(models.Task, {
                foreignKey: "user_id",
            });
        }
    }
    Users.init(
        {
            firstname: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            lastname: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                    isEmail: true,
                },
            },
            verified: {
                type: DataTypes.BOOLEAN,
                validate: {
                    notEmpty: true,
                },
            },
            profile_photo: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Users",
            tableName: "users",
        }
    );

    Users.beforeCreate(async (user) => {
        try {
            let passCrypt = await bcrypt.hash(user.password, 8);
            user.password = passCrypt;
            return user.password;
        } catch (error) {
            throw new Error("No se pudo encriptar");
        }
    });

    return Users;
};
