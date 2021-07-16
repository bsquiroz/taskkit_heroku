const { Router } = require("express");
const authController = require("../controllers/auth.controllers");

const authRouter = Router();

authRouter.get("/login", authController.renderLogin);
authRouter.post("/login", authController.authLocal);
authRouter.get("/registro", authController.renderRegistro);
authRouter.post("/registro", authController.register);
authRouter.get("/logout", authController.logout);

//AUTENTICACION CON GOOGLE Y FACEBOOK
//logearse con google login
authRouter.get("/auth/google", authController.authGoogle);
authRouter.get("/auth/google/callback", authController.googleCallback);

//logearse con facebook login
authRouter.get("/auth/facebook", authController.authFacebook);
authRouter.get("/auth/facebook/callback", authController.facebookCallback);

//ruta para mostrar la vista de la autorizacion
authRouter.get("/auth/verified", authController.renderVerified);

//ruta para reestablecer la contraseña
authRouter.post("/auth/reset-password", authController.sendLinkResetPass);

//ruta para reestablecer la contraseña 2
authRouter.get("/auth/reset-password/confirm", authController.confirmResetPass);

//ruta para reestablecer la contraseña 2
authRouter.post(
    "/auth/reset-password/confirm",
    authController.confirmResetPass2
);

//ruta para mandar el correo
authRouter.post("/auth/confirm-count", authController.sendLinkConfirmCount);

//ruta para CONFIRMAR LA CUENTA 2
authRouter.get("/auth/confirm-count/confirm", authController.confirmCount);

module.exports = authRouter;
