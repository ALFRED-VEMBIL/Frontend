"use client";
import { useState, useEffect } from "react";

const Navbar = ({ onSelectBlog }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim() === "") {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(
          `http://localhost:8080/feedspotclone/search.php?q=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        console.log("Fetched data:", data);
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [query]);

  return (
    <div className="w-full h-14 bg-white shadow flex items-center px-4 justify-between relative">
      {/* Search Bar */}
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search Widget For Eg: Gardening, Baking, Yoga, etc"
          className="w-full px-3 py-0.5 border rounded border-gray-400/50 focus:outline-none focus:ring"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded shadow z-10">
            {suggestions.map((sug) => (
              <li
                key={sug.id}
                className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onSelectBlog(sug);      // pass whole object for preview
                  setQuery(sug.title);    // set text field only with title
                  setSuggestions([]);     // close the dropdown
                }}

              >
                {sug.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Profile Initial */}
      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
        A
      </div>
    </div>
  );
};

export default Navbar;
