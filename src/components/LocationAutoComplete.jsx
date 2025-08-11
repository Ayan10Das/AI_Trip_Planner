import React, { useState, useEffect } from 'react';
import axios from 'axios';

let debounceTimer;

const LocationAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (query.length < 2) {
      setPlaces([]);
      return;
    }

    // Clear any existing debounce timers
    clearTimeout(debounceTimer);

    // Set a new debounce timer
    debounceTimer = setTimeout(() => {
      fetchSuggestions(query);
    }, 500); // 500ms delay
  }, [query]);

  const fetchSuggestions = async (value) => {
    try {
      const res = await axios.get('https://api.locationiq.com/v1/autocomplete', {
        params: {
          key: 'pk.b91eb8c6ae7779e3014ae5968ec1e784',
          q: value,
          limit: 5,
          format: 'json',
        },
      });
      setPlaces(res.data);
    } catch (err) {
      console.error('Autocomplete error:', err);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setPlaces([]);
    if (onSelect) onSelect(place);
  };

  return (
    <div className="w-full max-w-md  p-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a location"
        className="w-full p-2 border md:w-190  rounded shadow-2xl"
      />
      {places.length > 0 && (
        <ul className="mt-2 border border-gray-200 rounded">
          {places.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationAutocomplete;
