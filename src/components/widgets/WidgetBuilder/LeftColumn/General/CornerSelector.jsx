'use client';
const CornerSelector = ({ cornerStyle, setCornerStyle }) => {
  return (
    <div className="flex justify-between items-center">
      <label className="w-1/2 font-normal">Corner</label>
      <div className="flex gap-2">
        <button
          onClick={() => setCornerStyle('square')}
          className={`border border-cyan-800 px-3 py-1 rounded ${cornerStyle === 'square' ? 'bg-cyan-700 text-white' : ''}`}
        >
          Square
        </button>
        <button
          onClick={() => setCornerStyle('rounded')}
          className={`border px-3 py-1 rounded ${cornerStyle === 'rounded' ? 'bg-cyan-700 text-white' : ''}`}
        >
          Rounded
        </button>
      </div>
    </div>
  );
};

export default CornerSelector;
