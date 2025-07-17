'use client';
import { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import ProfileDropdown from './ProfileDropdown';

const Navbar = ({ onSelectBlog }) => {
  const [mounted, setMounted] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted || !showNavbar) return null;

  return (
    <div className="w-full h-14 bg-white border-b border-gray-300 flex items-center px-4 justify-between relative">
      <SearchBar
        query={query}
        setQuery={setQuery}
        setTopic={setTopic}
        onSelectBlog={onSelectBlog}
        mounted={mounted}
      />
      <ProfileDropdown />
    </div>
  );
};

export default Navbar;
