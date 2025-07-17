'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = ({ onSelectBlog }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState(false); // ✅ New state
  const dropdownRef = useRef(null);
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(true);
const lastScrollY = useRef(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
      setShowNavbar(false); // scrolling down
    } else {
      setShowNavbar(true); // scrolling up
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);


  useEffect(() => {
    setMounted(true); // Only render UI after hydration
  }, []);

  // ✅ Fetch suggestions (only if not already selected)
  useEffect(() => {
    if (!mounted || query.trim() === '' || selected) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/feedspotclone/search.php?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [query, mounted, selected]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:8080/feedspotclone/logout.php', {
      method: 'POST',
      credentials: 'include',
    });
    router.push('/login');
  };

  if (!mounted) return null;

  return (
    <div className="w-full h-14 bg-white border-b border-gray-300 flex items-center px-4 justify-between relative">
      {/* 🔍 Search Bar */}
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search Widget For Eg: Gardening, Baking, Yoga, etc"
          className="w-full px-3 py-0.5 border rounded border-gray-400/50 focus:outline-none focus:ring"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(false); // ✅ Reset selection when typing
          }}
        />
        {suggestions.length > 0 && (
         <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded shadow z-10">
  {suggestions.map((sug) => (
    <li
      key={sug.id}
      className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
      onClick={() => {
      onSelectBlog(sug);
      setTopic(sug.title);
      setQuery('');            //  clear the input
      setSuggestions([]);      //  clear suggestions
}}

    >
      {sug.title}
    </li>
  ))}
</ul>

        )}
      </div>

      {/* 👤 Profile Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <div
          className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          title="Account"
        >
          A
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-md z-20 text-sm">
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => router.push('/profile')}
            >
              Profile
            </div>
            <div
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
