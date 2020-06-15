module.exports = (sequelize, Sequelize) => {
    const GameRoom = sequelize.define("gameroom", {
      game_type: {
        type: Sequelize.ENUM,
        values: ['SinglePlayer', 'TurnBased'],
      }
    });
  
    return GameRoom;
  };