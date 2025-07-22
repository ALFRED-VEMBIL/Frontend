'use client';

const AutoScrollToggle = ({ autoScroll, setAutoScroll }) => {
  return (
    <div className="flex justify-between items-center">
      <label className="font-normal w-1/2">Autoscroll</label>
      <div
        className={`w-15 h-7 rounded-full flex items-center px-1 cursor-pointer transition-all ease-in-out duration-500 delay-75 ${
          autoScroll ? "bg-cyan-700" : "bg-gray-400"
        }`}
        onClick={() => setAutoScroll((prev) => !prev)}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full transition-all ease-in-out duration-500 delay-75 ${
            autoScroll ? "translate-x-8" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default AutoScrollToggle;
