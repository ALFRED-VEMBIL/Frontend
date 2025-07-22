const ColorPicker = ({ label, value, setValue }) => (
  <div className="flex items-center justify-between mt-2">
    <label>{label}</label>
    <div className="flex items-center space-x-2">
      <input
        type="color"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border px-2 py-1 rounded w-24"
      />
    </div>
  </div>
);
export default ColorPicker;
