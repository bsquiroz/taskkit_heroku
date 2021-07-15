const { Users, socialNetwork } = require("../models");
const {
    generateTokens,
    userRegister,
} = require("../services/verify_tokens.services");

const newUser = async ({ firstname, lastname, email, password }) => {
    try {
        const user = await Users.create({
            firstname,
            lastname,
            email,
            password,
        });

        const userId = user.id;
        const token = generateTokens();

        await userRegister(token, userId, email);
    } catch (error) {
        throw new Error(error);
    }
};

const checkUserExist = async (email) => {
    try {
        let user = await Users.findOne({ where: { email }, raw: true });
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

const linkUserProvider = async (id, user_id, provider) => {
    try {
        await socialNetwork.findOrCreate({
            where: { id },
            defaults: { id, user_id, provider },
        });
    } catch (error) {
        throw new Error(error);
    }
};

const isUserVerify = async (id_user) => {
    try {
        const verify = await Users.findOne({ where: { id_user } });
        return verify;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    newUser,
    checkUserExist,
    linkUserProvider,
    isUserVerify,
};
