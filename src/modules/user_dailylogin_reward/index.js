module.exports = (sequelize, Sequelize) => {
    const UserDailyLoginReward = sequelize.define("User_DailyLoginReward", {
        loginDate: {
            type: Sequelize.DATE
        },
        rewardQuantity: {
            type: Sequelize.INTEGER
        }
    });

    return UserDailyLoginReward;
};