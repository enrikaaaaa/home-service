import BusinessList from "../../components/business/BusinessList/BusinessList";
import React from "react";
import VerticalCategoryList from "../../components/category/verticalCategoryList/VerticalCategoryList";
import styles from "./SearchCategory.module.scss";
import { useParams } from "react-router-dom";

const SearchCategory = () => {
  const { category } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.categories}>
        <VerticalCategoryList />
      </div>
      <div className={styles.categoryContainer}>
        <h2 className={styles.title}>{category}</h2>
        <BusinessList categoryName={category} className={styles.businessList} />
      </div>
    </div>
  );
};

export default SearchCategory;
