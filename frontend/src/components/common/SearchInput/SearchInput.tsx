import React, { useContext, useState } from "react";

import Button from "../Button/Button";
import { CiSearch } from "react-icons/ci";
import { SearchContext } from "../../../context/SearchContext";
import styles from "./SearchInput.module.scss";
import useDebounce from "../../../hooks/useDebounce";

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext)!;
  const [showDropdown, setShowDropdown] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchTriggered, setSearchTriggered] = useState(false);

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      onSearch(debouncedSearchTerm);
      setSearchTriggered(false);
    }
  }, [debouncedSearchTerm, onSearch, setSearchTriggered]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleItemClick = (item: string) => {
    setSearchTerm(item);
    setShowDropdown(false);
    setSearchTriggered(true);
  };

  return (
    <div className={styles.search_container}>
      <input
        className={styles.searchInput}
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button rounded>
        <div>
          <CiSearch fontSize={24} />
        </div>
      </Button>
      {showDropdown && (
        <div className={styles.dropdown}>
          {["Result 1", "Result 2", "Result 3"].map((item, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleItemClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
