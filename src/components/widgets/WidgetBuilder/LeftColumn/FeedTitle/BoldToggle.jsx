const BoldToggle = ({ isBold, setIsBold }) => (
  <div className="flex items-center justify-between">
    <label className="font-semibold">Bold</label>
    <input
      type="checkbox"
      checked={isBold}
      onChange={(e) => setIsBold(e.target.checked)}
      className="toggle toggle-primary"
    />
  </div>
);
export default BoldToggle;
