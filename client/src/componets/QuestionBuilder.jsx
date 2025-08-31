import React from "react";
import OptionsList from "./OptionsList";
import { Check, AlertCircle, Plus } from "lucide-react";

const QuestionBuilder = ({
  quiz,
  currentQuestion,
  setCurrentQuestion,
  addOption,
  removeOption,
  updateOptionText,
  setCorrectAnswer,
  validateQuestion,
  addQuestionToQuiz,
}) => {
  return (
    <div className="mb-8 sm:mb-10">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
        <div className="w-6 sm:w-8 h-6 sm:h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
          {quiz.questions.length + 1}
        </div>
        <span className="text-sm sm:text-2xl">Create New Question</span>
      </h2>
      <div className="rounded-xl sm:rounded-2xl border-2 border-white p-4 sm:p-8 bg-gradient-to-br from-gray-900 to-gray-800 shadow-inner">
        <div className="mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-bold text-white mb-2 sm:mb-3">
            Question Title *
          </label>
          <input
            type="text"
            value={currentQuestion.title}
            onChange={(e) =>
              setCurrentQuestion((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-3 sm:p-4 bg-black rounded-lg sm:rounded-xl border-2 border-white text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-gray-900 transition-all duration-300 text-sm sm:text-lg"
            placeholder="What would you like to ask?"
          />
        </div>

        <OptionsList
          options={currentQuestion.options}
          addOption={addOption}
          removeOption={removeOption}
          updateOptionText={updateOptionText}
          setCorrectAnswer={setCorrectAnswer}
        />

        <div className="mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-bold text-white mb-2 sm:mb-3">
            Explanation (Optional)
          </label>
          <textarea
            value={currentQuestion.explanation}
            onChange={(e) =>
              setCurrentQuestion((prev) => ({
                ...prev,
                explanation: e.target.value,
              }))
            }
            className="w-full p-3 sm:p-4 bg-black rounded-lg sm:rounded-xl border-2 border-white text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-gray-900 transition-all duration-300 resize-none text-sm sm:text-base"
            placeholder="Help learners understand why this answer is correct..."
            rows="3"
          />
        </div>

        {!validateQuestion() && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 border-red-400 bg-red-900 bg-opacity-30 flex items-start gap-2 sm:gap-3">
            <AlertCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-300 text-xs sm:text-sm font-medium mb-1">
                Complete these requirements:
              </p>
              <ul className="text-red-200 text-xs space-y-1">
                <li>• Question title must be filled</li>
                <li>• At least 2 options must have text</li>
                <li>• One option must be marked as correct</li>
              </ul>
            </div>
          </div>
        )}

        <button
          onClick={addQuestionToQuiz}
          disabled={!validateQuestion()}
          className={`w-full py-3 sm:py-4 px-4 sm:px-6 font-bold rounded-lg sm:rounded-xl border-2 transition-all duration-300 transform text-sm sm:text-base ${
            validateQuestion()
              ? "bg-white text-black border-white hover:bg-black hover:text-white hover:scale-105 shadow-lg"
              : "bg-gray-700 text-gray-400 border-gray-700 cursor-not-allowed"
          }`}
        >
          <span className="flex items-center justify-center gap-2 sm:gap-3">
            <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
            Add Question to Quiz
          </span>
        </button>
      </div>
    </div>
  );
};

export default QuestionBuilder;
