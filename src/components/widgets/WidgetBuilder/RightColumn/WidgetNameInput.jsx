'use client';
const WidgetNameInput = ({ widgetName, setWidgetName }) => (
  <input
    type="text"
    placeholder="Enter Widget Name"
    value={widgetName}
    onChange={(e) => setWidgetName(e.target.value)}
    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
  />
);
export default WidgetNameInput;
