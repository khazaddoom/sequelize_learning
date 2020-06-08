module.exports = (sequelize, Sequelize) => {
    const UserDailyLoginReward = sequelize.define("User_DailyLoginReward", {
        loginDate: {
            type: Sequelize.DATE
        },
        rewardQuantity: {
            type: Sequelize.INTEGER
        },
        // claimed: {
        //     type: Sequelize.ENUM,
        //     values: ['OPEN', 'CLAIMED'],
        //     defaultValue: 'OPEN'
        // }
    });

    return UserDailyLoginReward;
};