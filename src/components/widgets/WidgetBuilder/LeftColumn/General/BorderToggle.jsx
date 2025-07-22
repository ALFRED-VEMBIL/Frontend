'use client';

const BorderToggle = ({ borderEnabled, setBorderEnabled }) => {
  return (
    <div className="flex justify-between items-center">
      <label className="font-normal w-1/2">Border</label>
      <div
        className={`w-15 h-7 rounded-full flex items-center px-1 cursor-pointer transition-all ease-in-out duration-500 delay-75 ${
          borderEnabled ? "bg-cyan-700" : "bg-gray-400"
        }`}
        onClick={() => setBorderEnabled((prev) => !prev)}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full transition-all ease-in-out duration-500 delay-75 ${
            borderEnabled ? "translate-x-8" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default BorderToggle;
