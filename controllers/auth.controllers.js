const passport = require("passport");
const { newUser } = require("../services/auth.services");
const {
    getTokenAndUser,
    verifyPass,
} = require("../services/verify_tokens.services");
const { sendMail, emailOptions } = require("../config/nodemailes");
const ejs = require("ejs");
const path = require("path");

const renderLogin = (req, res) => {
    res.render("pages/login", { title: "Login" });
};

const renderRegistro = (req, res) => {
    res.render("pages/register", { title: "Registro" });
};

const register = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        await newUser({ firstname, lastname, email, password });
        res.redirect("/login");
    } catch (error) {
        next(error);
    }
};

const logout = (req, res) => {
    req.logOut();
    return res.redirect("/login");
};

const authLocal = passport.authenticate("local", {
    successRedirect: "/tareas",
    failureRedirect: "login",
});

const authGoogle = passport.authenticate("google", {
    session: true,
    scope: ["email", "profile"],
});

const authFacebook = passport.authenticate("facebook", {
    session: true,
    scope: ["email", "public_profile"],
});

const googleCallback = passport.authenticate("google", {
    successRedirect: "/tareas",
    failureRedirect: "/login",
});
const facebookCallback = passport.authenticate("facebook", {
    successRedirect: "/tareas",
    failureRedirect: "/login",
});

const sendLinkResetPass = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const userVerify = await getTokenAndUser(user_id);
        const user_token = userVerify.token;
        const template = await ejs.renderFile(
            path.join(
                __dirname,
                "..",
                "views",
                "email-templates",
                "reset-password.ejs"
            ),
            { user_id, user_token }
        );
        const { email } = req.body;
        emailOptions.to = email;
        emailOptions.subject =
            "Restablecimiento de constraseña para la app de Taskit";
        emailOptions.html = template;
        await sendMail(emailOptions);
        res.render("pages/info-reset-pass", {
            title: "Autorización",
            email,
        });
    } catch (error) {
        next(error);
    }
};

const sendLinkConfirmCount = async (req, res, next) => {
    try {
        const user_id = req.user.id;
        const userVerify = await getTokenAndUser(user_id);
        const user_token = userVerify.token;
        const template = await ejs.renderFile(
            path.join(
                __dirname,
                "..",
                "views",
                "email-templates",
                "confirm-count.ejs"
            ),
            { user_id, user_token }
        );

        const { email } = req.body;
        emailOptions.to = email;
        emailOptions.subject = "Confirmacion de la cuenta de Taskit";
        emailOptions.html = template;
        await sendMail(emailOptions);
        res.render("pages/info-confirm-count", {
            title: "Link confirmar cuenta",
            email,
        });
    } catch (error) {
        next(error);
    }
};

const renderVerified = (req, res) => {
    const firstname = req.user.firstname;
    const email = req.user.email;
    res.render("pages/verified", {
        title: "permiso de verificación",
        firstname,
        email,
    });
};

const confirmResetPass = async (req, res) => {
    try {
        const { token, user_id } = req.query;
        const user = await getTokenAndUser(user_id);

        if (token === user.token) {
            res.render("pages/change-password", {
                title: "Cambiar contraseña",
                user_id,
            });
        }
    } catch (error) {
        next(error);
    }
};

const confirmResetPass2 = async (req, res) => {
    const { passNew1, user_id, passOld } = req.body;
    const change = await verifyPass(passOld, passNew1, user_id);

    if (change) {
        return res.redirect("/login");
    } else {
        return res.send("Sucedio un error vuelve a enviar las credenciales");
    }
};

const confirmCount = (req, res) => {
    const aux = req.query;
    res.json({ aux });
};

module.exports = {
    renderLogin,
    renderRegistro,
    register,
    logout,
    authLocal,
    authGoogle,
    authFacebook,
    googleCallback,
    facebookCallback,
    renderVerified,
    sendLinkResetPass,
    sendLinkConfirmCount,
    confirmCount,
    confirmResetPass,
    confirmResetPass2,
};
