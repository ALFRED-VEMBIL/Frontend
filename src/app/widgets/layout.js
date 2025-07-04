"use client";

import { useState, createContext } from "react";
import WidgetSidebar from "@/components/widgets/Sidebar";
import Navbar from "@/components/widgets/Navbar";

export const SelectedBlogContext = createContext(null);

export default function WidgetLayout({ children }) {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <SelectedBlogContext.Provider value={{ selectedBlog, setSelectedBlog }}>
      <div className="flex w-full h-full">
        <WidgetSidebar />
        <div className="flex-1 h-screen overflow-auto">
          <Navbar onSelectBlog={setSelectedBlog} />
          {children}
        </div>
      </div>
    </SelectedBlogContext.Provider>
  );
}
