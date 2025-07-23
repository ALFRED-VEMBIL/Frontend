

const CustomToggle = ({ isCustomTitle, setIsCustomTitle }) => (
  <div className="flex justify-between items-center">
    <label className="text-md font-semibold mt-2 mb-2">Custom</label>
    <div
      className={`w-14 h-7 rounded-full flex items-center px-1 cursor-pointer transition-all ease-in-out duration-500 ${
        isCustomTitle ? "bg-cyan-700" : "bg-gray-400"
      }`}
      onClick={() => setIsCustomTitle(!isCustomTitle)} 
    >
      <div
        className={`bg-white w-5 h-5 rounded-full transition-all ease-in-out duration-500 ${
          isCustomTitle ? "translate-x-7" : ""
        }`}
      />
    </div>
  </div>
);

export default CustomToggle;
