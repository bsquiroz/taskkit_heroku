const session = require("express-session");

const sessionConfig = session({
    secret: "academlo",
    resave: false,
    saveUninitialized: true,
});

module.exports = sessionConfig;
