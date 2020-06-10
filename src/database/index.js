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

  const Question = require('../modules/question')(sequelize, Sequelize);
  const Answer = require('../modules/answer')(sequelize, Sequelize);

  Question.belongsTo(Answer, { as: 'possible_answers'});
  Answer.hasMany(Question)

  Answer.hasOne(Question, {constraints: false})

  db.user = User;
  db.inventory = Inventory;
  db.dailyLoginSource = DailyLoginSource;
  db.userDailyLoginReward = UserDailyLoginReward;
  db.question = Question;
  db.answer = Answer;
 
  module.exports = db;