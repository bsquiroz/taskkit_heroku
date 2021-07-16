const bcrypt = require("bcryptjs");

const { Verify_tokens } = require("../models");
const { Users } = require("../models");

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

const verifyPass = async (passOldForm, passNew1, user_id) => {
    try {
        const user = await findUser(user_id);

        if (user) {
            const passOldDb = user.password;
            const data = await changePass(
                passOldForm,
                passOldDb,
                passNew1,
                user_id
            );
            return data;
        }
    } catch (error) {
        throw new Error(error);
    }
};

const findUser = async (user_id) => {
    try {
        const user = await Users.findOne({ where: { id: user_id } });
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

const changePass = async (passOldForm, passOldDb, passNew1, user_id) => {
    try {
        if (bcrypt.compareSync(passOldForm, passOldDb)) {
            let passCrypt = await bcrypt.hash(passNew1, 8);
            const password = passCrypt;
            const data = await Users.update(
                { password },
                { where: { id: user_id } }
            );
            return data;
        }
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    generateTokens,
    userRegister,
    getTokenAndUser,
    verifyPass,
};
