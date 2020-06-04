const config = require('./config');

const Sequelize = require("sequelize");

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
  
  const db = {};
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  db.blogs = require('../modules/blog')(sequelize, Sequelize);

  const User =  require('../modules/users')(sequelize, Sequelize);
  const Inventory = require('../modules/inventory')(sequelize, Sequelize);
  const UserInventory = require('../modules/user_inventory')(sequelize, Sequelize);

  User.belongsToMany(Inventory, { through: UserInventory })
  Inventory.belongsToMany(User, { through: UserInventory })


  db.user = User;
  db.inventory = Inventory;
  // db.userInventory = UserInventory;


  
  module.exports = db;