module.exports = (sequelize, Sequelize) => {
    const Inventory = sequelize.define("Inventory", {
        "_ID": {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING
        }
    });

    return Inventory;
};