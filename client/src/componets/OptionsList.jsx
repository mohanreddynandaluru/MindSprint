import React from "react";
import OptionRow from "./OptionRow";
import { Plus } from "lucide-react";

const OptionsList = ({
  options,
  addOption,
  removeOption,
  updateOptionText,
  setCorrectAnswer,
}) => {
  return (
    <div className="mb-4 sm:mb-6">
      <label className="text-xs sm:text-sm font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
        <span>Answer Options * (Tap circle to mark correct)</span>
      </label>
      <div className="space-y-3 sm:space-y-4">
        {options.map((option, index) => (
          <OptionRow
            key={index}
            option={option}
            index={index}
            setCorrectAnswer={setCorrectAnswer}
            updateOptionText={updateOptionText}
            removeOption={removeOption}
            canRemove={options.length > 2}
          />
        ))}
      </div>

      {options.length < 6 && (
        <button
          onClick={addOption}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 mt-3 sm:mt-4 rounded-lg sm:rounded-xl border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-bold transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
        >
          <Plus className="w-4 h-4" />
          Add Another Option
        </button>
      )}
    </div>
  );
};

export default OptionsList;
