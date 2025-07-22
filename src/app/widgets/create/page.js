"use client";

import HeadSection from "@/components/widgets/Header";
import WidgetBuilder from "@/components/widgets/WidgetBuilder/WidgetBuilder";

export default function CreatePage() {
  return (
    <>
    <div className="min-h-screen bg-white p-4">
      <HeadSection />
      <WidgetBuilder />
    </div>
      
    </>
  );
}
