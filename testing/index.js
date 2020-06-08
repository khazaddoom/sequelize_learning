const Sequelize = require("sequelize");

const config = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "juego@1234",
    DB: "testing",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};


const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
  
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  });

let Model = Sequelize.Model


class Document extends Model { }
Document.init({
    author: Sequelize.STRING
}, { sequelize, modelName: 'document' });

class Version extends Model { }

Version.init({
    timestamp: Sequelize.DATE
}, { sequelize, modelName: 'version' });

Document.hasMany(Version); // This adds documentId attribute to version
Document.belongsTo(Version, {
    as: 'Current',
    foreignKey: 'currentVersionId',
    constraints: false
});

sequelize.sync()