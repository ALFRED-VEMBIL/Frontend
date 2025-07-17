'use client';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProfileDropdown = () => {
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

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

  return (
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
  );
};

export default ProfileDropdown;
