const BoldToggle = ({ isBold, setIsBold }) => (
  <div className="flex justify-between items-center">
    <label className="font-normal w-1/2">Bold</label>
    <div
      className={`w-14 h-7 rounded-full flex items-center px-1 cursor-pointer transition-all ease-in-out duration-300 ${
        isBold ? "bg-cyan-700" : "bg-gray-300"
      }`}
      onClick={() => setIsBold((prev) => !prev)}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${
          isBold ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </div>
  </div>
);

export default BoldToggle;