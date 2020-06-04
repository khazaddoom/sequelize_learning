module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("User", {
        "_ID": {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING
        },
        fullName: {
            type: Sequelize.STRING
        }
    });
    return Users;
  };