'use client';
import { Save, RotateCcw } from "lucide-react";

const SaveResetButtons = ({ handleSave, handleReset }) => (
  <div className="flex gap-2 justify-end">
    <button
      onClick={handleSave}
      className="flex items-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-sm font-semibold px-3 py-1.5 rounded shadow-sm"
    >
      <Save size={14} /> Save & Get Code
    </button>
    <button
      onClick={handleReset}
      className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-3 py-1.5 rounded shadow-sm"
    >
      <RotateCcw size={14} /> Reset
    </button>
  </div>
);
export default SaveResetButtons;
