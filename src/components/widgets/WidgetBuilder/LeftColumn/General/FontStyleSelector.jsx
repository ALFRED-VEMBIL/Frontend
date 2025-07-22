'use client';

const FontStyleSelector = ({ fontStyle, setFontStyle }) => {
  return (
    <div className="flex justify-between items-center">
      <label className="font-normal w-1/2">Font Style</label>
      <select
        value={fontStyle}
        onChange={(e) => setFontStyle(e.target.value)}
        className="w-1/2 border rounded px-2 py-1"
      >
        <option value="Arial, Helvetica, sans-serif">Arial, Helvetica, sans-serif</option>
        <option value="Georgia, serif">Georgia, serif</option>
        <option value="Tahoma, sans-serif">Tahoma, sans-serif</option>
        <option value="Courier New, monospace">Courier New, monospace</option>
      </select>
    </div>
  );
};

export default FontStyleSelector;
