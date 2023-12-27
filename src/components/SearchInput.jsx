import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query || !query?.trim()) {
      return;
    }
    const searchParams = new URLSearchParams();
    searchParams.append("query", query);

    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="flex items-center">
      <div className="flex rounded">
        <input
          onChange={(event) => setQuery(event.target.value)}
          value={query}
          type="text"
          className="block w-full px-4 py-2 text-purple-700 bg-white rounded-md  focus:outline-none border"
          placeholder="Search..."
        />
        <button
          onClick={handleSearch}
          className="px-4 text-white bg-purple border-l rounded "
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
