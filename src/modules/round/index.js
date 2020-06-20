module.exports = (sequelize, Sequelize) => {
    const GameRound = sequelize.define("game_round", {
      description: {
        type: Sequelize.STRING
      },
      difficulty: {
          type: Sequelize.ENUM,
          values: ['LOW', 'MEDIUM', 'HIGH'],
      }
    });
  
    return GameRound;
  };