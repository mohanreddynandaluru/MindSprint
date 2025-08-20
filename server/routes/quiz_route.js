const express = require("express");
const router = express.Router();
const { authverify } = require("../utils/auth");
const {
  createQuiz,
  getQuiz,
  playquiz,
  SubmissionController,
  getresult,
} = require("../controllers/quiz");

router.post("/create", authverify, createQuiz);
router.get("/:id", authverify, getQuiz);
router.get("/play/:id", authverify, playquiz);
router.post("/submission/:id", authverify, SubmissionController);
router.get("/submission/:id", authverify, getresult);

module.exports = router;
