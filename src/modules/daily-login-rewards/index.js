module.exports = (sequelize, Sequelize) => {
    const DailyLoginRewards = sequelize.define("daily_login_rewards", {
       rewardName: {
           type: Sequelize.STRING
       },
       rewardQuantity: {
           type: Sequelize.INTEGER
       },
       "status" : {
        type: Sequelize.STRING
       }
    });
    return DailyLoginRewards;
};