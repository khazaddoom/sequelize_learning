module.exports = (sequelize, Sequelize) => {
    const LoginRewards = sequelize.define("LoginRewards", {
        "dayCount": {
            type: Sequelize.INTEGER
        },
        "initialQuantity": {
            type: Sequelize.INTEGER
        }
    });

    return LoginRewards;
};