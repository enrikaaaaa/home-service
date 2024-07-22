import CategoryCard from "../categoryCard/CategoryCard";
import React from "react";
import styles from "./CategoryList.module.scss";
import { useCategories } from "../hooks";

const CategoryList = () => {
  const { data: categories } = useCategories();

  return (
    <div className={styles.container}>
      {categories?.map((category: any) => (
        <CategoryCard
          key={category.name}
          category={category}
          className={styles.card}
        />
      ))}
    </div>
  );
};

export default CategoryList;
