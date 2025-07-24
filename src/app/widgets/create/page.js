'use client';

import HeadSection from "@/components/widgets/Header";
import WidgetBuilder from "@/components/widgets/WidgetBuilder/WidgetBuilder";
import Karosuel from "@/components/widgets/FramerCarousel";
import withAuth from "@/components/withAuth"; 

function CreatePage() {
  return (
    <div className="min-h-screen bg-white p-4">
      <HeadSection />
      <WidgetBuilder />
      <h1 className="text-4xl font-semibold mb-8 mt-8 text-center">
        Widgets Layouts and Templates
      </h1>
      <Karosuel />
    </div>
  );
}

export default withAuth(CreatePage); // 🔒 Protect the page
