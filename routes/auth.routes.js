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

//ruta para reestablecer la contraseña
authRouter.post("/auth/reset-password", authController.resetPassword);

//ruta para mostrar la vista de la autorizacion
authRouter.get("/verified", authController.renderVerified);

//ruta para mandar el correo
authRouter.post("/auth/confirm-count", authController.confirmCount);

module.exports = authRouter;
