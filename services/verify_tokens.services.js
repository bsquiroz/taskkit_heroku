const { Verify_tokens } = require("../models");

const generateTokens = () => {
    const token = Math.floor(Math.random() * 10000000);
    return token;
};

const userRegister = async (token, user_id, email) => {
    try {
        const used = false;
        await Verify_tokens.create({ token, user_id, email, used });
    } catch (error) {
        throw new Error(error);
    }
};

const getTokenAndUser = async (user_id) => {
    try {
        const user = await Verify_tokens.findOne({ where: { user_id } });
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    generateTokens,
    userRegister,
    getTokenAndUser,
};
