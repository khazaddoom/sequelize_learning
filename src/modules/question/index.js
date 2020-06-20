module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("question", {
        "question_id": {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        "question_text": {
            type: Sequelize.STRING
        }
    });

    Question.associate = models => {
        Question.hasMany(models.Answer, {
            foreignKey: 'question_id'
        })
        Question.belongsTo(models.Answer, { as: 'correctAnswer', constraints: false })
    }

    return Question;
  };