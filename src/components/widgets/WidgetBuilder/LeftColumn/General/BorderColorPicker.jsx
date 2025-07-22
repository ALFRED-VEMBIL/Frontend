'use client';

const BorderColorPicker = ({ borderColor, setBorderColor }) => {
  return (
    <div className="flex justify-between items-center">
      <label className="w-1/2 font-normal">Border color</label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
        />
        <input
          type="text"
          value={borderColor}
          onChange={(e) => setBorderColor(e.target.value)}
          className="border px-2 py-1 text-sm rounded w-28"
        />
      </div>
    </div>
  );
};

export default BorderColorPicker;
