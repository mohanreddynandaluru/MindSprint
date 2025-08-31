import React, { useState } from "react";
import QuizSetup from "./QuizSetup";
import QuestionBuilder from "./QuestionBuilder";
import QuestionsList from "./QuestionsList";
import ActionsBar from "./ActionsBar";

const Createquiz = () => {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
    questions: [],
    timeLimit: 30,
    timeLimitForQuestion: 0,
    shuffleQuestions: true,
    shuffleOptions: false,
  });

  const [currentQuestion, setCurrentQuestion] = useState({
    title: "",
    options: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
    explanation: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  const addOption = () => {
    if (currentQuestion.options.length < 6) {
      setCurrentQuestion((prev) => ({
        ...prev,
        options: [...prev.options, { text: "", isCorrect: false }],
      }));
    }
  };

  const removeOption = (index) => {
    if (currentQuestion.options.length > 2) {
      const newOptions = currentQuestion.options.filter((_, i) => i !== index);
      if (currentQuestion.options[index].isCorrect) {
        newOptions.forEach((option) => (option.isCorrect = false));
      }
      setCurrentQuestion((prev) => ({
        ...prev,
        options: newOptions,
      }));
    }
  };

  const updateOptionText = (index, text) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((option, i) =>
        i === index ? { ...option, text } : option
      ),
    }));
  };

  const setCorrectAnswer = (index) => {
    setCurrentQuestion((prev) => ({
      ...prev,
      options: prev.options.map((option, i) => ({
        ...option,
        isCorrect: i === index,
      })),
    }));
  };

  const validateQuestion = () => {
    const hasTitle = currentQuestion.title.trim().length > 0;
    const validOptions = currentQuestion.options.filter(
      (opt) => opt.text.trim().length > 0
    );
    const hasMinOptions = validOptions.length >= 2;
    const hasCorrectAnswer = currentQuestion.options.some(
      (opt) => opt.isCorrect && opt.text.trim().length > 0
    );

    return hasTitle && hasMinOptions && hasCorrectAnswer;
  };

  const addQuestionToQuiz = () => {
    if (validateQuestion()) {
      const cleanedQuestion = {
        ...currentQuestion,
        options: currentQuestion.options.filter(
          (opt) => opt.text.trim().length > 0
        ),
      };

      setQuiz((prev) => ({
        ...prev,
        questions: [...prev.questions, cleanedQuestion],
      }));

      setCurrentQuestion({
        title: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        explanation: "",
      });
    }
  };

  const removeQuestion = (index) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const exportQuiz = () => {
    const dataStr = JSON.stringify(quiz, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${
      quiz.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "quiz"
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-black text-white p-3 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-xl sm:rounded-2xl border-2 border-white bg-black overflow-hidden shadow-2xl">
          <div className="p-4 sm:p-8">
            <QuizSetup quiz={quiz} setQuiz={setQuiz} />

            <QuestionBuilder
              quiz={quiz}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              addOption={addOption}
              removeOption={removeOption}
              updateOptionText={updateOptionText}
              setCorrectAnswer={setCorrectAnswer}
              validateQuestion={validateQuestion}
              addQuestionToQuiz={addQuestionToQuiz}
            />

            {quiz.questions.length > 0 && (
              <QuestionsList
                questions={quiz.questions}
                removeQuestion={removeQuestion}
              />
            )}

            {quiz.questions.length > 0 && (
              <ActionsBar
                quiz={quiz}
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                exportQuiz={exportQuiz}
              />
            )}

            {/* JSON Preview (kept commented out) */}
            <button
              disabled={quiz.questions.length == 0}
              className={`w-full py-3 sm:py-4 px-4 sm:px-6 font-bold rounded-lg sm:rounded-xl border-2 transition-all duration-300 transform text-sm sm:text-base ${
                quiz.questions.length > 0
                  ? "bg-white text-black border-white hover:bg-black hover:text-white hover:scale-105 shadow-lg"
                  : "bg-gray-700 text-gray-400 border-gray-700 cursor-not-allowed"
              }`}
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                Submit Quiz
              </span>
            </button>

            {/* Welcome Instructions */}
            {quiz.questions.length === 0 && (
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-white rounded-xl sm:rounded-2xl p-6 sm:p-10 text-center shadow-inner mt-4">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                    Ready to Create?
                  </h3>
                  <div className="text-gray-300 space-y-2 sm:space-y-3 text-left">
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-black rounded-lg border border-white">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 bg-white text-black rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                        1
                      </div>
                      <span className="text-xs sm:text-sm">
                        Set your quiz title and description
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-black rounded-lg border border-white">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 bg-white text-black rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                        2
                      </div>
                      <span className="text-xs sm:text-sm">
                        Write engaging questions
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-black rounded-lg border border-white">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 bg-white text-black rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                        3
                      </div>
                      <span className="text-xs sm:text-sm">
                        Add options and mark correct answers
                      </span>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-black rounded-lg border border-white">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 bg-white text-black rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                        4
                      </div>
                      <span className="text-xs sm:text-sm">
                        Submit questions to build your quiz
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createquiz;
