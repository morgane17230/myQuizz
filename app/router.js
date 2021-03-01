const express = require("express");
const router = express.Router();

const mainController = require("./controllers/mainController");
const quizController = require("./controllers/quizController");
const tagController = require("./controllers/tagController");
const userController = require("./controllers/userController");

router.get("/", mainController.homePage);

// Tags
router.get("/tags/:id", tagController.getTag);

// Quiz
router.get("/quiz/:id", quizController.getQuiz);
router.post("/quiz/:id", quizController.playQuiz);

// User

// router.get("/inscription", userController.signupPage);
// router.get("/connexion", userController.loginPage);
// router.get("/profil", userController.profilPage);

module.exports = router;
