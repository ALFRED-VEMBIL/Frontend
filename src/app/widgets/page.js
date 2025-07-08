'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import WidgetHeader from '@/components/widgets/MyWidgets';

export default function WidgetEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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

  return <WidgetHeader />;
}
