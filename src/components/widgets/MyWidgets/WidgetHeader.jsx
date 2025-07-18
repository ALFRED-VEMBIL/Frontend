"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import HeaderSection from './HeaderSection';
import TableSection from './TableSection';
import LearnMoreModal from './LearnMoreModal';
import EditWidgetModal from './EditWidgetModal';

const WidgetHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [editingWidget, setEditingWidget] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('id');

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
        setWidgets((prev) => prev.filter((w) => w.id !== id));
      } else {
        alert("Delete failed: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting.");
    }
  };

  useEffect(() => {
    // Fetch all widgets
    fetch("http://localhost:8080/feedspotclone/getWidgets.php", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setWidgets(data.data);

          // If ?id=... is in URL, open that widget in edit mode
          if (selectedId) {
            const matched = data.data.find(w => String(w.id) === selectedId);
            if (matched) {
              setEditingWidget(matched);
            } else {
              alert("Widget not found.");
            }
          }
        } else {
          alert("Could not fetch widgets: " + data.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Could not load widgets.");
        setLoading(false);
      });
  }, [selectedId]);

  if (loading) return <p className="text-center mt-10">Loading widgets...</p>;

  return (
    <div>
      <HeaderSection handleCreate={handleCreate} setIsOpen={setIsOpen} />
      <TableSection
        widgets={widgets}
        handleDelete={handleDelete}
        setEditingWidget={setEditingWidget}
      />
      {isOpen && <LearnMoreModal setIsOpen={setIsOpen} />}
      {editingWidget && (
        <EditWidgetModal
          editingWidget={editingWidget}
          setEditingWidget={setEditingWidget}
          setWidgets={setWidgets}
        />
      )}
    </div>
  );
};

export default WidgetHeader;
