'use client';
import { useState } from 'react';
import Link from 'next/link';

import {
  Home,
  Badge as Widget,
  Layers,
  Bookmark,
  HelpCircle,
  Code,
  Users,
  Menu as MenuIcon,
  ChevronDown
} from 'lucide-react';

import { useActivePath } from '@/hooks/useActivePath';

const navItems = [
  { label: "Feedspot Home", icon: Home, path: '#' },
  { label: "Widget Home", icon: Widget, path: '/widgets/create' },
  { label: "My Widgets", icon: Layers, path: '/widgets' },
  { label: "Widget Catalog", icon: Bookmark, path: '#' },
  { label: "Support", icon: HelpCircle, path: '#' },
  { label: "Widget Examples", icon: Code, path: '#' },
  { label: "Customers", icon: Users, path: '#' },
];

function WidgetSidebar() {
  const isActive = (href) => useActivePath(href);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className="bg-[#313131] h-screen transition-all duration-700"
      style={{ width: isOpen ? '16vw' : '4vw' }}
    >
      {/* Logo + toggles */}
      <div className="p-4 text-gray-200">
        <div className="flex items-center justify-between">
          {isOpen && <h1 className="text-2xl font-semibold tracking-wide">Feedspot</h1>}
          <MenuIcon
            size={24}
            className="cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto mt-2 text-gray-200">
        <ul className="space-y-1">
  {navItems.map(({ label, icon: Icon, path }) => (
    <li key={label}>
      <Link
        href={path}
        className={`flex items-center gap-1 px-5 py-1 text-sm font-medium hover:bg-zinc-600 transition-colors ${
          isActive(path) ? "bg-zinc-600 " : ""
        }`}
      >
        <Icon size={18} className="shrink-0" />
        {isOpen && <span>{label}</span>}
      </Link>
    </li>
  ))}
</ul>

      </nav>
    </div>
  );
}

export default WidgetSidebar;