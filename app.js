const express = require("express");
const path = require("path");
const passport = require("passport");
const cors = require("cors");

const session = require("./utils/session.config");

const routes = require("./routes");

require("./config/passport");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());

// configurando la vista para el motor
//1. Definiendo en donde se ubicará el directorio views
app.set("views", path.join(__dirname, "views"));
//2. Definiendo el motor que usaremos
app.set("view engine", "ejs");

//Configurando el directorio publico
app.use(express.static("./public"));

//middleware de terceros
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

//pagina de inicio
app.get("/", (req, res) => {
    res.render("pages/home", { title: "Inicio" });
});

app.use(routes.authRouter);
app.use(routes.taskRouter);
app.use(routes.statusRouter);
app.use(routes.categoryRouter);

module.exports = app;
