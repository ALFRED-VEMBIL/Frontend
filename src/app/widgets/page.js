'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EditWidgetModal from '@/components/widgets/MyWidgets/WidgetHeader.jsx';

export default function WidgetEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Initialize editingWidget directly
  const [editingWidget, setEditingWidget] = useState({
    id: 1,
    widget_name: "Sample Widget",
    feed_url: "https://sample.com/feed",
    layout: "grid",
    sublayout: "3x3",
    width_mode: "pixels",
    width_value: "300",
    height_mode: "auto",
    height_value: "400"
  });

  useEffect(() => {
    fetch("http://localhost:8080/feedspotclone/check-auth.php", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          router.push('/login');
        } else {
          setLoading(false);
        }
      })
      .catch(() => router.push('/login'));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {editingWidget && (
        <EditWidgetModal
          widget={editingWidget}
          onClose={() => setEditingWidget(null)}
          updateWidget={(updated) => {
            console.log("Updated:", updated);
            setEditingWidget(null);
          }}
        />
      )}
    </>
  );
}
