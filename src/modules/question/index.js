module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("question", {
      description: {
        type: Sequelize.STRING
      },
      difficulty: {
          type: Sequelize.ENUM,
          values: ['LOW', 'MEDIUM', 'HIGH'],
      }
    });
  
    return Question;
  };