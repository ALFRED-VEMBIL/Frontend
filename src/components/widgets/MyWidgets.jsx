"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const WidgetHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [editingWidget, setEditingWidget] = useState(null);

  const router = useRouter();

  const handleCreate = () => {
    router.push('/widgets/create');
  };

    const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this widget?")) return;

    try {
        const formData = new FormData();
        formData.append("id", id);

        const res = await fetch("http://localhost:8080/feedspotclone/delete.php", {
        method: "POST",
        body: formData,
        });

        const result = await res.json();
        if (result.success) {
        alert("Deleted successfully");
        setWidgets((prev) => prev.filter((w) => w.id !== id)); // update UI
        } else {
        alert("Delete failed: " + result.error);
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred while deleting.");
    }
    };

  useEffect(() => {
    fetch("http://localhost:8080/feedspotclone/getWidgets.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setWidgets(data.data);
        } else {
          alert(" Could not fetch widgets: " + data.error);
        }
      })
      .catch((err) => {
        console.error(err);
        alert(" Could not load widgets.");
      });
  }, []);

  return (
    <div>
      {/* HEADER SECTION */}
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

      {/* TABLE SECTION */}
      <div className="overflow-auto mt-6 border shadow max-w-[1000px] mx-auto">
        <table className="w-full border border-collapse text-sm min-w-[700px]">
          <thead>
            <tr className="bg-cyan-700 text-white">
              <th className="border px-4 py-2">Widget Name</th>
              <th className="border px-4 py-2">Feed URL</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {widgets.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-2">No widgets found</td>
              </tr>
            )}
            {widgets.map((w) => (
              <tr key={w.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{w.widget_name}</td>
                <td className="border px-4 py-2 max-w-[250px] truncate">
                  <a
                    href={w.feed_url}
                    target="_blank"
                    className="text-blue-600 underline"
                    title={w.feed_url}
                  >
                    {w.feed_url}
                  </a>
                </td>
                <td className="border px-4 py-2 space-x-2 text-center">
                  <button
                    onClick={() => handleDelete(w.id)}
                    className="bg-white text-blue-700 border border-gray-300 px-2 py-1 rounded hover:bg-gray-100"
                    >
                    🗑 Delete
                    </button>

                  <button className="bg-white text-blue-700 border border-gray-300 px-2 py-1 rounded hover:bg-gray-100">
                    Embed Code
                  </button>
               <button
                onClick={() => router.push(`/widgets/create?id=${w.id}`)}
                className="bg-white text-blue-700 border border-gray-300 px-2 py-1 rounded hover:bg-gray-100"
                >
                Edit Widget
                </button>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isOpen && (
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
      )}
    {editingWidget && (
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
            // Refresh list
            setWidgets((prev) =>
              prev.map((w) => (w.id === editingWidget.id ? { ...w, ...Object.fromEntries(formData) } : w))
            );
          } else {
            alert("Update failed: " + result.error);
          }
        }}
      >
        <input
          name="widget_name"
          defaultValue={editingWidget.widget_name}
          className="block w-full border px-2 py-1 mb-2"
          required
        />
        <input
          name="feed_url"
          defaultValue={editingWidget.feed_url}
          className="block w-full border px-2 py-1 mb-2"
          required
        />
        <input
          name="layout"
          defaultValue={editingWidget.layout}
          className="block w-full border px-2 py-1 mb-2"
          required
        />
        <input
          name="sublayout"
          defaultValue={editingWidget.sublayout}
          className="block w-full border px-2 py-1 mb-2"
          required
        />
        <input
          name="width_mode"
          defaultValue={editingWidget.width_mode}
          className="block w-full border px-2 py-1 mb-2"
          required
        />
        <input
          name="width_value"
          defaultValue={editingWidget.width_value}
          className="block w-full border px-2 py-1 mb-2"
          required
        />
        <input
          name="height_mode"
          defaultValue={editingWidget.height_mode}
          className="block w-full border px-2 py-1 mb-2"
          required
        />
        <input
          name="height_value"
          defaultValue={editingWidget.height_value}
          className="block w-full border px-2 py-1 mb-2"
          required
        />

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
)}

    </div>
  );
};

export default WidgetHeader;
