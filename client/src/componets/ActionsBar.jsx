import React from "react";
import { Eye, Download } from "lucide-react";

const ActionsBar = ({ quiz, showPreview, setShowPreview, exportQuiz }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-bold transform hover:scale-105 text-sm sm:text-base"
      >
        <Eye className="w-4 sm:w-5 h-4 sm:h-5" />
        {showPreview ? "Hide" : "Preview"} JSON
      </button>

      <button
        onClick={exportQuiz}
        disabled={!quiz.title.trim() || quiz.questions.length === 0}
        className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white text-black rounded-lg sm:rounded-xl border-2 border-white hover:bg-black hover:text-white transition-all duration-300 font-bold transform hover:scale-105 disabled:bg-gray-600 disabled:text-gray-400 disabled:border-gray-600 disabled:transform-none shadow-lg text-sm sm:text-base"
      >
        <Download className="w-4 sm:w-5 h-4 sm:h-5" />
        Export Quiz
      </button>
    </div>
  );
};

export default ActionsBar;
