import { Info } from 'lucide-react';
import React from 'react';

const TitleInput = ({ label, value, setValue }) => (
  <div className="flex items-center space-x-4">
    {/* Label with fixed width */}
    <label className="flex items-center text-sm text-gray-700 w-[100px]">
      {label}
      <Info className="w-4 h-4 ml-1 text-gray-400" />
    </label>

    {/* Input field */}
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Example..."
      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all"
    />
  </div>
);

export default TitleInput;
