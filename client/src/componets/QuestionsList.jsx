import React from "react";
import { Trash2, Check } from "lucide-react";

const QuestionsList = ({ questions, removeQuestion }) => {
  return (
    <div className="mb-8 sm:mb-10">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
        <div className="w-6 sm:w-8 h-6 sm:h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
          {questions.length}
        </div>
        <span className="text-sm sm:text-2xl">Quiz Questions</span>
      </h2>
      <div className="space-y-4 sm:space-y-6">
        {questions.map((question, index) => (
          <div
            key={index}
            className="rounded-xl sm:rounded-2xl border-2 border-white p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <div className="flex items-start gap-2 sm:gap-3 flex-1 pr-2">
                <div className="w-6 sm:w-8 h-6 sm:h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0 mt-1">
                  {index + 1}
                </div>
                <h3 className="font-bold text-white text-sm sm:text-lg leading-tight">
                  {question.title}
                </h3>
              </div>
              <button
                onClick={() => removeQuestion(index)}
                className="text-white hover:bg-red-600 hover:text-white p-2 sm:p-3 border-2 border-white rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 flex-shrink-0"
              >
                <Trash2 className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4">
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 flex items-center gap-2 sm:gap-3 transition-all duration-300 ${
                    option.isCorrect
                      ? "bg-white text-black border-white shadow-lg"
                      : "bg-black text-white border-white hover:bg-gray-900"
                  }`}
                >
                  {option.isCorrect && (
                    <div className="w-5 sm:w-6 h-5 sm:h-6 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                  <span className="font-medium text-sm sm:text-base">
                    {option.text}
                  </span>
                </div>
              ))}
            </div>

            {question.explanation && (
              <div className="bg-black rounded-lg sm:rounded-xl border-2 border-white p-3 sm:p-4">
                <p className="text-gray-300 text-xs sm:text-sm">
                  <span className="font-bold text-white">💡 Explanation:</span>{" "}
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;
