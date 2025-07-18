'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import WidgetHeader from '@/components/widgets/MyWidgets/WidgetHeader';

export default function WidgetEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const widgetId = searchParams.get('id'); // Get ?id=123 from URL

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

  return <WidgetHeader editId={widgetId} />;
}
