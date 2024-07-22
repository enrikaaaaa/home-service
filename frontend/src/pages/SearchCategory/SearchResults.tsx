import React, { useContext, useEffect, useState } from "react";

import { SearchContext } from "../../context/SearchContext";

const SearchResults = () => {
  const { searchTerm } = useContext(SearchContext)!;
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (searchTerm) {
      setResults([`Result for ${searchTerm}`]);
    }
  }, [searchTerm]);

  return (
    <div>
      <h1>Search Results for "{searchTerm}"</h1>

      {results.map((result, index) => (
        <li key={index}>{result}</li>
      ))}
    </div>
  );
};

export default SearchResults;
