// components/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <div className=" w-full h-14 bg-white shadow flex items-center px-4 justify-between">
      {/* Search Bar */}
 <input
  type="text"
  placeholder="Search Widget For Eg: Gardening, Baking, Yoga, etc"
  className="w-1/2 px-3 py-0.5 border rounded border-gray-400/50 focus:outline-none focus:ring"
/>


      {/* Profile Initial */}
      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
        A
      </div>
    </div>
  );
};

export default Navbar;


//---------------------------
