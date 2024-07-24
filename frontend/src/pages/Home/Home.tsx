import React, { useState } from "react";

import Appointment from "../../components/business/types";
import BusinessCard from "../../components/business/BusinessCard/BusinessCard";
import BusinessList from "../../components/business/BusinessList/BusinessList";
import CategoryList from "../../components/category/categoryList/CategoryList";
import Hero from "../../components/common/Hero/Hero";
import styles from "./Home.module.scss";

const Home = () => {
  const [searchResults, setSearchResults] = useState<Appointment[]>([]);

  return (
    <>
      <Hero />
      {Array.isArray(searchResults) && searchResults.length > 0 ? (
        <div className={styles.businessContainer}>
          {searchResults.map((item, index) => (
            <BusinessCard key={index} business={item} />
          ))}
        </div>
      ) : (
        <CategoryList />
      )}
      <h2 className={styles.title}>Popular businesses</h2>
      <BusinessList />
    </>
  );
};

export default Home;
