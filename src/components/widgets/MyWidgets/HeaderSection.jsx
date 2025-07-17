// HeaderSection.js
const HeaderSection = ({ handleCreate, setIsOpen }) => (
  <>
    <div className="bg-white p-6 mt-6">
      <h1 className="text-center text-4xl font-semibold mb-4">MyWidgets</h1>
    </div>
    <div className="flex flex-row gap-x-4 justify-center items-center px-2">
      <button
        className="bg-cyan-700 text-white px-4 min-w-[10rem] cursor-pointer"
        onClick={handleCreate}
      >
        Create New Widgets
      </button>
      <button
        className="bg-cyan-700 text-white px-4 min-w-[10rem] cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Learn More
      </button>
    </div>
  </>
);

export default HeaderSection;
