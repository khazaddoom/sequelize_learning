module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "juego@1234",
    DB: "blog_website",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};