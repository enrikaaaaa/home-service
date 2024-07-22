import BusinessList from "../../components/business/BusinessList/BusinessList";
import CategoryList from "../../components/category/categoryList/CategoryList";
import Hero from "../../components/common/Hero/Hero";
import React from "react";
import styles from "./Home.module.scss";

const Home = () => {
  return (
    <>
      <Hero />
      <CategoryList />
      <h2 className={styles.title}>Popular businesses</h2>
      <BusinessList />
    </>
  );
};

export default Home;
