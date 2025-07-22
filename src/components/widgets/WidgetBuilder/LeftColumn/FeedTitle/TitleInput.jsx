const TitleInput = ({ label, value, setValue }) => (
  <div className="space-y-1">
    <label>{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full border px-2 py-1 rounded"
    />
  </div>
);
export default TitleInput;
