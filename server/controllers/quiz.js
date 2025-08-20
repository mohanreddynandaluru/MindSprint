const Quiz = require("../models/Quiz");
const { authverify } = require("../utils/auth");
const Question = require("../models/Question");
const express = require("express");
const Submission = require("../models/Submission");

// Create a new quiz
const createQuiz = async (req, res) => {
  try {
    console.log("before");
    const {
      title,
      description,
      questions,
      timeLimit,
      timeLimitForQuestion,
      shuffleQuestions,
      shuffleOptions,
    } = req.body;

    let user = req.user;
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized access, user not found",
      });
    }

    if (!title || !description) {
      return res.status(400).json({
        status: "error",
        message: "Title and description are required",
      });
    }

    const createdQuestions = await Question.insertMany(questions);
    if (createdQuestions.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No questions were created",
      });
    }
    const questionIds = createdQuestions.map((q) => q._id);
    const quizData = {
      title,
      description,
      Questions: questionIds,
      timeLimit: timeLimit || null,
      timeLimitForQuestion: timeLimitForQuestion || 30,
      shuffleQuestions,
      shuffleOptions,
      owner: user.id,
    };
    console.log("before quiz create", quizData);
    const quiz = await Quiz.create(quizData);
    console.log("after quiz create", quizData);
    res.status(201).json({
      status: "success",
      message: "Quiz created successfully",
      data: {
        quizId: quiz._id,
        title: quiz.title,
        description: quiz.description,
        timeLimit: quiz.timeLimit,
        timeLimitForQuestion: quiz.timeLimitForQuestion,
        shuffleQuestions: quiz.shuffleQuestions,
        shuffleOptions: quiz.shuffleOptions,
      },
    });
  } catch (error) {
    console.log("Error creating quiz:", error);
    res.status(500).json({
      status: "error",
      message: "error in quiz server error",
    });
  }
};

const getQuiz = async (req, res) => {
  try {
    const user = req.user; // Get the user from the auth middleware
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized access, user not found",
      });
    }

    let { id } = req.params;

    // If id is 'all', return all quizzes for the current user
    if (id === "all") {
      const quizzes = await Quiz.find({ owner: user.id });
      return res.status(200).json({
        status: "success",
        data: quizzes,
      });
    }

    // Otherwise, find specific quiz by id and verify ownership
    let quiz = await Quiz.findOne({ _id: id, owner: user.id }).populate(
      "Questions"
    );
    if (!quiz) {
      return res.status(404).json({
        status: "error",
        message: "Quiz not found or unauthorized access",
      });
    }

    res.status(200).json({
      status: "success",
      data: quiz,
    });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const playquiz = async (req, res) => {
  try {
    let { id } = req.params;
    let quiz = await Quiz.findById(id).populate("Questions");
    if (!quiz) {
      return res.status(404).json({
        status: "error",
        message: "Quiz not found",
      });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const SubmissionController = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized access, user not found",
      });
    }

    const { id } = req.params;
    const { Attempted, timetaken } = req.body;
    const quizId = id;
    if (!quizId || !Attempted || timetaken === undefined) {
      return res.status(400).json({
        status: "error",
        message: "Quiz ID, answers, and time taken are required",
      });
    }

    const quiz = await Quiz.findById(quizId).populate("Questions");
    if (!quiz) {
      return res.status(404).json({
        status: "error",
        message: "Quiz not found",
      });
    }
    const alreadySubmitted = await Submission.findOne({
      quizId,
      userId: user.id,
    });
    if (alreadySubmitted) {
      return res.status(400).json({
        status: "error",
        message: "You have already submitted this quiz",
      });
    }
    const answers = quiz.Questions.map((question) => {
      const userAnswer = Attempted.find(
        (ans) => ans.questionId === question._id.toString()
      );

      if (!userAnswer) {
        return {
          questionId: question._id,
          selectedOption: null,
          isCorrect: null,
          isAttempted: false,
          correctOption:
            question.options.find((opt) => opt.isCorrect)?.text || null,
        };
      }

      // Try to match by ID first, fallback to text
      const matchedOption = quest;
      ion.options.find(
        (option) =>
          option._id.toString() === userAnswer.selectedOptionId ||
          option.text.trim().toLowerCase() ===
            (userAnswer.selectedOption || "").trim().toLowerCase()
      );

      return {
        questionId: question._id,
        selectedOption: userAnswer.selectedOption || null,
        isCorrect: matchedOption ? matchedOption.isCorrect : false,
        isAttempted: !!userAnswer.selectedOption,
        correctOption:
          question.options.find((opt) => opt.isCorrect)?.text || null,
      };
    });

    const score = answers.reduce(
      (total, ans) => total + (ans.isCorrect ? 1 : 0),
      0
    );
    const correctAnswers = answers.filter((ans) => ans.isCorrect).length;
    const wrongAnswers = answers.filter(
      (ans) => ans.isAttempted && ans.isCorrect === false
    ).length;
    const notAttempted = answers.filter((ans) => !ans.isAttempted).length;

    const submission = new Submission({
      quizId: quiz._id,
      userId: user.id,
      answers,
      score,
      correctAnswers,
      wrongAnswers,
      notAttempted,
      timeTaken: timetaken,
      submittedAt: new Date(),
    });

    await submission.save();

    res.status(201).json({
      status: "success",
      message: "Quiz submitted successfully",
      data: {
        score,
        correctAnswers,
        wrongAnswers,
        notAttempted,
        timeTaken: timetaken,
        answers, // Send detailed answer list with correctOption & selectedOption
      },
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const getresult = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    let result = await Submission.find({ userId: user.id, quizId: id });
    if (!result || result.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "result not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "found details",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = {
  createQuiz,
  getQuiz,
  playquiz,
  SubmissionController,
  getresult,
};
