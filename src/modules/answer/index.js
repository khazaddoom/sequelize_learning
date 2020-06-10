module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define("answer", {
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Answer;
  };