const FontSizeControl = ({ fontSize, setFontSize }) => (
  <div className="flex items-center space-x-2">
    <label className="w-24">Font-size</label>
    <button onClick={() => setFontSize(fontSize - 1)} className="px-2 py-1 bg-gray-300 rounded">−</button>
    <span>{fontSize}</span>
    <button onClick={() => setFontSize(fontSize + 1)} className="px-2 py-1 bg-gray-300 rounded">+</button>
  </div>
);
export default FontSizeControl;
