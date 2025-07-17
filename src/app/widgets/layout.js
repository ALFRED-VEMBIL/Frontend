"use client";

import { useState, createContext } from "react";
import WidgetSidebar from "@/components/widgets/Sidebar";
import Navbar from "@/components/widgets/Navbar";

export const SelectedBlogContext = createContext(null);

export default function WidgetLayout({ children }) {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SelectedBlogContext.Provider value={{ selectedBlog, setSelectedBlog }}>
      <div className="flex w-full h-screen overflow-hidden">
        <WidgetSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar isSidebarOpen={isSidebarOpen} />
          
          {/* Scrollable content */}
          <main className="flex-1 overflow-auto bg-white ">
            {children}
          </main>
        </div>
      </div>
    </SelectedBlogContext.Provider>
  );
}
