// WidgetHeader.js
"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import HeaderSection from './HeaderSection';
import TableSection from './TableSection';
import LearnMoreModal from './LearnMoreModal';
import EditWidgetModal from './EditWidgetModal';

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
      <HeaderSection handleCreate={handleCreate} setIsOpen={setIsOpen} />
      <TableSection widgets={widgets} handleDelete={handleDelete} setEditingWidget={setEditingWidget} />
      {isOpen && <LearnMoreModal setIsOpen={setIsOpen} />}
      {editingWidget && <EditWidgetModal editingWidget={editingWidget} setEditingWidget={setEditingWidget} setWidgets={setWidgets} />}
    </div>
  );
};

export default WidgetHeader;
