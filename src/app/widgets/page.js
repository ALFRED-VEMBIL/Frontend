'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import WidgetHeader from '@/components/widgets/MyWidgets/WidgetHeader';
import withAuth from '@/components/withAuth';

function WidgetEditorPage() {
  const searchParams = useSearchParams();
  const widgetId = searchParams.get('id'); // Get ?id=123 from URL

  return <WidgetHeader editId={widgetId} />;
}

export default withAuth(WidgetEditorPage);
