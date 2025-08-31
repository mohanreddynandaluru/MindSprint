import React from "react";
import { Check, Trash2 } from "lucide-react";

const OptionRow = ({
  option,
  index,
  setCorrectAnswer,
  updateOptionText,
  removeOption,
  canRemove,
}) => {
  return (
    <div className="flex items-center gap-2 sm:gap-4 group">
      <button
        onClick={() => setCorrectAnswer(index)}
        className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 flex-shrink-0 ${
          option.isCorrect
            ? "bg-white text-black border-white shadow-lg"
            : "bg-black text-white border-white hover:bg-gray-800"
        }`}
      >
        {option.isCorrect && (
          <Check className="w-3 sm:w-5 h-3 sm:h-5 font-bold" />
        )}
      </button>
      <input
        type="text"
        value={option.text}
        onChange={(e) => updateOptionText(index, e.target.value)}
        className="flex-1 p-3 sm:p-4 bg-black rounded-lg sm:rounded-xl border-2 border-white text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:bg-gray-900 transition-all duration-300 text-sm sm:text-base"
        placeholder={`Enter option ${index + 1}`}
      />
      {canRemove && (
        <button
          onClick={() => removeOption(index)}
          className="p-2 sm:p-3 text-white hover:bg-red-600 hover:text-white border-2 border-white rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 flex-shrink-0"
        >
          <Trash2 className="w-4 sm:w-5 h-4 sm:h-5" />
        </button>
      )}
    </div>
  );
};

export default OptionRow;
