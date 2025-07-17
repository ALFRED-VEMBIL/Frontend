// LearnMoreModal.js
const LearnMoreModal = ({ setIsOpen }) => (
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="bg-neutral-200 p-4 rounded shadow max-w-xl w-full">
      <iframe
        src="https://www.youtube.com/embed/ea-ybXtsOCc?start=112"
        width="100%"
        height="315"
        allowFullScreen
      ></iframe>
      <button
        onClick={() => setIsOpen(false)}
        className="mt-4 px-4 py-2 bg-cyan-700 text-white rounded"
      >
        Close
      </button>
    </div>
  </div>
);

export default LearnMoreModal;
