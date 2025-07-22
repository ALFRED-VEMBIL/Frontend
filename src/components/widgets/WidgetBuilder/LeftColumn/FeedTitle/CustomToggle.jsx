const CustomToggle = ({ isCustomTitle, setIsCustomTitle }) => (
  <div className="flex items-center justify-between">
    <label className="font-semibold">Custom</label>
    <input
      type="checkbox"
      checked={isCustomTitle}
      onChange={(e) => setIsCustomTitle(e.target.checked)}
      className="toggle toggle-primary"
    />
  </div>
);
export default CustomToggle;
