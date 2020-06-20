module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define("answer", {
        "_ID": {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        answer_text: {
            type: Sequelize.STRING
        }
    });

    Answer.associate = models => {
       Answer.belongsTo(models.Question, {
            foreignKey: 'question_id'
       })
    }

    return Answer;
  };