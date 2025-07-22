'use client';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";

const TextAlignSelector = ({ textAlign, setTextAlign }) => {
  const alignments = [
    { value: "left", icon: <AlignLeft size={16} /> },
    { value: "center", icon: <AlignCenter size={16} /> },
    { value: "right", icon: <AlignRight size={16} /> },
    { value: "justify", icon: <AlignJustify size={16} /> },
  ];

  return (
    <div className="flex justify-between items-center">
      <label className="font-normal w-1/2">Text alignment</label>
      <div className="flex gap-2">
        {alignments.map(({ value, icon }) => (
          <button
            key={value}
            onClick={() => setTextAlign(value)}
            className={`w-8 h-8 flex items-center justify-center rounded ${
              textAlign === value ? "bg-cyan-700 text-white" : "bg-gray-400 text-white"
            }`}
          >
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TextAlignSelector;
