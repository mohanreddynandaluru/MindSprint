import React from "react";
import { Settings } from "lucide-react";

const QuizSetup = ({ quiz, setQuiz }) => {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Quiz Setup</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-bold text-white">
            Quiz Title *
          </label>
          <input
            type="text"
            value={quiz.title}
            onChange={(e) =>
              setQuiz((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-3 sm:p-4 bg-gray-900 rounded-lg sm:rounded-xl border-1 border-white text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-black transition-all duration-300 text-sm sm:text-base"
            placeholder="Enter an engaging quiz title"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-bold text-white">
            Description
          </label>
          <input
            type="text"
            value={quiz.description}
            onChange={(e) =>
              setQuiz((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full p-3 sm:p-4 bg-gray-900 rounded-lg sm:rounded-xl border-2 border-white text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-black transition-all duration-300 text-sm sm:text-base"
            placeholder="Brief description of your quiz"
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-inner">
        <h3 className="text-base sm:text-lg font-bold text-white mb-4 sm:mb-6 flex items-center gap-2">
          <Settings className="w-4 sm:w-5 h-4 sm:h-5" />
          Advanced Settings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-white">
              Total Time Limit (minutes)
            </label>
            <input
              type="number"
              value={quiz.timeLimit}
              onChange={(e) =>
                setQuiz((prev) => ({
                  ...prev,
                  timeLimit: parseInt(e.target.value) || 30,
                }))
              }
              className="w-full p-3 bg-black rounded-lg border-2 border-white text-white focus:outline-none focus:border-gray-400 transition-all duration-300 text-sm sm:text-base"
              min="30"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs sm:text-sm font-bold text-white">
              Time per Question (seconds)
            </label>
            <input
              type="number"
              value={quiz.timeLimitForQuestion}
              onChange={(e) =>
                setQuiz((prev) => ({
                  ...prev,
                  timeLimitForQuestion: parseInt(e.target.value),
                }))
              }
              className="w-full p-3 bg-black rounded-lg border-2 border-white text-white focus:outline-none focus:border-gray-400 transition-all duration-300 text-sm sm:text-base"
              min={0}
            />
            <ul className="text-red-500 text-xs space-y-1">
              <li>If there is no time limit for a question,</li>
              <li>mention "0" as the time limit.</li>
            </ul>
          </div>
          <div className="flex justify-center gap-3 p-3 bg-black rounded-lg border border-white">
            <input
              type="checkbox"
              id="shuffleQuestions"
              checked={quiz.shuffleQuestions}
              onChange={(e) =>
                setQuiz((prev) => ({
                  ...prev,
                  shuffleQuestions: e.target.checked,
                }))
              }
              className="w-4 sm:w-5 h-4 sm:h-5 accent-white rounded"
            />
            <label
              htmlFor="shuffleQuestions"
              className="text-xs sm:text-sm font-bold text-white"
            >
              Shuffle Questions Order
            </label>
          </div>
          <div className="flex justify-center gap-3 p-3 bg-black rounded-lg border border-white">
            <input
              type="checkbox"
              id="shuffleOptions"
              checked={quiz.shuffleOptions}
              onChange={(e) =>
                setQuiz((prev) => ({
                  ...prev,
                  shuffleOptions: e.target.checked,
                }))
              }
              className="w-4 sm:w-5 h-4 sm:h-5 accent-white rounded"
            />
            <label
              htmlFor="shuffleOptions"
              className="text-xs sm:text-sm font-bold text-white"
            >
              Shuffle Options
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSetup;
