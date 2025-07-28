import React from 'react';
import WidgetBuilder from '@/components/widgets/WidgetBuilder/WidgetBuilder';

const EditWidgetModal = ({ editingWidget, setEditingWidget, setWidgets }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      id: editingWidget.id,
      widget_name: formData.get("widget_name"),
      feed_url: formData.get("feed_url"),
      layout: formData.get("layout"),
      sublayout: formData.get("sublayout"),
      width_mode: formData.get("width_mode"),
      width_value: parseInt(formData.get("width_value"), 10),
      height_mode: formData.get("height_mode"),
      height_value: parseInt(formData.get("height_value"), 10),
    };

    try {
      const res = await fetch("http://localhost:8080/feedspotclone/edit.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
         credentials: "include", 
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        alert("Widget updated!");
        setEditingWidget(null);
        setWidgets((prev) =>
          prev.map((w) => (w.id === editingWidget.id ? { ...w, ...data } : w))
        );
      } else {
        alert("Update failed: " + result.error);
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("Something went wrong.");
    }
  };

  console.log("editingWidget inside modal:", editingWidget);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow max-w-xl w-full">
        <h2 className="text-xl font-semibold mb-4">Edit Widget</h2>
        <form onSubmit={handleSubmit}>
          {[
            "widget_name",
            "feed_url",
            "layout",
            "sublayout",
            "width_mode",
            "width_value",
            "height_mode",
            "height_value",
          ].map((field) => (
            <input
              key={field}
              name={field}
              defaultValue={editingWidget[field]}
              className="block w-full border px-2 py-1 mb-2"
              required
            />
          ))}

          {/* 🔥 Preview Section */}
          <div className="mt-4 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
            <div className="border p-2">
              <WidgetBuilder widget={editingWidget} isPreview={true} />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setEditingWidget(null)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-700 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWidgetModal;
