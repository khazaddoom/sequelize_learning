module.exports = (sequelize, Sequelize) => {
    const UserInventory = sequelize.define("user_inventory", {
       inventoryQuantity: {
            type: Sequelize.INTEGER
       }
    });
    return UserInventory;
  };