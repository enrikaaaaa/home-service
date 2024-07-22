import CategoryCard from "../categoryCard/CategoryCard";
import React from "react";
import styles from "./VerticalCategoryList.module.scss";
import { useCategories } from "../hooks";

const VerticalCategoryList = () => {
  const { data: categories } = useCategories();

  return (
    <div>
      <h2 className={styles.title}>Categories</h2>
      <div className={styles.cardContainer}>
        {categories?.map((category: { name: any; url?: string }) => (
          <CategoryCard
            key={category.name}
            category={{ ...category, url: category.url || "" }}
            className={styles.card}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalCategoryList;
