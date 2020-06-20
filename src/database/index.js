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

  const Question = require('../modules/question')(sequelize, Sequelize);
  const Answer = require('../modules/answer')(sequelize, Sequelize);

  db.Question = Question;
  db.Answer = Answer;

  Object.keys(db).forEach(function(modelName) {
    if (db[modelName].hasOwnProperty('associate')) {
      db[modelName].associate(db)
    }
  })

  
  db.blogs = require('../modules/blog')(sequelize, Sequelize);

  const User =  require('../modules/users')(sequelize, Sequelize);
  const Inventory = require('../modules/inventory')(sequelize, Sequelize);
  const UserInventory = require('../modules/user_inventory')(sequelize, Sequelize);
  // const LoginRewards = require('../modules/login-reward')(sequelize, Sequelize);

  User.belongsToMany(Inventory, { through: UserInventory })
  Inventory.belongsToMany(User, { through: UserInventory })

  const DailyLoginSource = require('../modules/daily-login-source')(sequelize, Sequelize);

  // User.belongsToMany(LoginRewards, { through: DailyLoginRewards});
  // LoginRewards.belongsToMany(User, { through: DailyLoginRewards});

  Inventory.hasMany(DailyLoginSource);
  DailyLoginSource.belongsTo(Inventory)


  const UserDailyLoginReward = require('../modules/user_dailylogin_reward')(sequelize, Sequelize);

  User.belongsToMany(DailyLoginSource, { through: UserDailyLoginReward});
  DailyLoginSource.belongsToMany(User, { through: UserDailyLoginReward});


  
  

  db.User = User;
  db.Inventory = Inventory;
  db.DailyLoginSource = DailyLoginSource;
  db.UserDailyLoginReward = UserDailyLoginReward;
  
 
  module.exports = db;