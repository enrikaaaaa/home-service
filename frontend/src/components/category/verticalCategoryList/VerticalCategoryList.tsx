import CategoryCard from "../categoryCard/CategoryCard";
import React from "react";
import styles from "./VerticalCategoryList.module.scss";
import { useCategories } from "../hooks";

const VerticalCategoryList = () => {
  const { data: categories } = useCategories();

  return (
    <div>
      <h2 className={styles.title}>Categories</h2>
      {categories?.map((category: { name: any; url?: string }) => (
        <CategoryCard
          key={category.name}
          category={{ ...category, url: category.url || "" }}
        />
      ))}
    </div>
  );
};

export default VerticalCategoryList;
