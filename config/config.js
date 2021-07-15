require("dotenv").config();

module.exports = {
    development: {
        username: process.env.BD_USERNAME,
        password: process.env.BD_PASSWORD,
        database: process.env.BD_DATABASE,
        host: process.env.BD_HOST,
        dialect: "postgres",
        define: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        use_env_variable: "DATABASE_URL",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
