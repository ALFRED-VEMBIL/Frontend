// EditWidgetModal.js
const EditWidgetModal = ({ editingWidget, setEditingWidget, setWidgets }) => (
  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow max-w-xl w-full">
      <h2 className="text-xl font-semibold mb-4">Edit Widget</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          formData.append("id", editingWidget.id);

          const res = await fetch("http://localhost:8080/feedspotclone/edit.php", {
            method: "POST",
            body: formData,
          });

          const result = await res.json();
          if (result.success) {
            alert("Widget updated!");
            setEditingWidget(null);
            setWidgets((prev) =>
              prev.map((w) => (w.id === editingWidget.id ? { ...w, ...Object.fromEntries(formData) } : w))
            );
          } else {
            alert("Update failed: " + result.error);
          }
        }}
      >
        {["widget_name", "feed_url", "layout", "sublayout", "width_mode", "width_value", "height_mode", "height_value"].map((field) => (
          <input
            key={field}
            name={field}
            defaultValue={editingWidget[field]}
            className="block w-full border px-2 py-1 mb-2"
            required
          />
        ))}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => setEditingWidget(null)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-cyan-700 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default EditWidgetModal;
