import React, { useContext, useState } from "react";

import Button from "../Button/Button";
import { CiSearch } from "react-icons/ci";
import { SearchContext } from "../../../context/SearchContext";
import styles from "./SearchInput.module.scss";
import useDebounce from "../../../hooks/useDebounce";

const SearchInput = () => {
  return (
    <div className={styles.search_container}>
      <input className={styles.searchInput} placeholder="Search" />
      <Button rounded>
        <div>
          <CiSearch fontSize={24} />
        </div>
      </Button>
    </div>
  );
};

export default SearchInput;
