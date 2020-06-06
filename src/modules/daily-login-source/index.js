module.exports = (sequelize, Sequelize) => {
    const DailyLoginSource = sequelize.define("DailyLoginSource", {
        "dayCount": {
            type: Sequelize.INTEGER
        },
        "initialQuantity": {
            type: Sequelize.INTEGER
        }
    });

    return DailyLoginSource;
};