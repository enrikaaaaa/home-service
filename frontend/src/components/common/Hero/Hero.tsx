import React, { useEffect, useState } from "react";

import { ROUTES } from "../../../routes/consts";
import SearchInput from "../SearchInput/SearchInput";
import styles from "./Hero.module.scss";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (searchTerm) {
      const newRoute = ROUTES.SEARCH_CATEGORY.replace(":category", searchTerm);
      window.location.href = newRoute;
    }
  }, [searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className={styles.hero}>
      <h1 className={styles.title}>
        Find Home <span className={styles.primary}>Service/Repair</span>
        <br />
        Near You
      </h1>
      <p className={styles.subtitle}>
        Explore Best Home Service & Repair near you
      </p>
      <div className={styles.searchContainer}>
        <SearchInput onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default Hero;
