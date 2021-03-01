const { Quiz } = require("../models");

(exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({
      include: [
        "author",
        {
          association: "tags",
        },
      ],
    });
    res.render("allQuizzes", { quizzes });
  } catch (err) {
    console.trace(err);
    res.status(500).send(err);
  }
}),
  (exports.getQuiz = async (req, res) => {
    const pageSize = 1;
    const offset = (page - 1) * pageSize;
    const limit = 1;
    try {
      const quiz = await Quiz.findByPk(Number(req.params.id), {
        include: [
          { association: "author" },
          {
            association: "questions",
            limit,
            offset,
            subQuery: true,
            include: ["answers", "level"],
          },
          { association: "tags" },
        ],
      });
      res.render("quiz", { quiz, page });
    } catch (err) {
      console.trace(err);
      return res.status(500).send(err);
    }
  });

exports.playQuiz = async (req, res, next) => {
  const quiz = await Quiz.findByPk(Number(req.params.id), {
    include: {
      association: "questions",
      include: ["answers", "good_answer"],
    },
  });

  quiz.questions.forEach((question) => {
    if (req.body[`question-${question.id}`]) {
      let userAnswer = req.body[`question-${question.id}`];

      req.session.answers.push(userAnswer);
      if (Number(userAnswer) !== question.good_answer.id) {
        req.session.results.push(false);
      } else {
        req.session.score++;
        req.session.results.push(true);
      }
    }
  });
  if (page < 10) {
    res.redirect(`/quiz/${quiz.id}?page=${page + 1}`);
  } else {
    res.render("results", {
      score: req.session.score,
      answers: req.session.answers,
      results: req.session.results,
      quiz,
    });
  }
};
