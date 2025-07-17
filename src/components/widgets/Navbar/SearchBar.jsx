'use client';
import { useEffect, useState } from 'react';

const SearchBar = ({ query, setQuery, setTopic, onSelectBlog, mounted }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [selected, setSelected] = useState(false);

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

  return (
    <div className="relative w-1/2">
      <input
        type="text"
        placeholder="Search Widget For Eg: Gardening, Baking, Yoga, etc"
        className="w-full px-3 py-0.5 border rounded border-gray-400/50 focus:outline-none focus:ring"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(false);
        }}
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded shadow z-10">
          {suggestions.map((sug) => (
            <li
              key={sug.id}
              className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelectBlog(sug);     // Notify parent
                setTopic(sug.title);   // Set topic in parent
                setQuery('');          // Clear search
                setSuggestions([]);
                setSelected(true);
              }}
            >
              {sug.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
