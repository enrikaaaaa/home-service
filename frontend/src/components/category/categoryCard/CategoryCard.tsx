import { generatePath, useNavigate, useParams } from "react-router-dom";

import { ROUTES } from "../../../routes/consts";
import React from "react";
import UrlIcon from "../../common/UrlIcon/UrlIcon";
import classNames from "classnames";
import styles from "./CategoryCard.module.scss";

interface CategoryCardProps {
  category: {
    name: string;
    url: string;
  };
  className?: string;
}

const CategoryCard = ({ category, className }: CategoryCardProps) => {
  const params = useParams();
  const { name, url } = category;
  const navigate = useNavigate();

  const categoryPath = generatePath(ROUTES.SEARCH_CATEGORY, { category: name });
  const activeCategory = params.category;

  return (
    <div
      className={classNames(
        styles.card,
        activeCategory === name && styles.active,
        className
      )}
      onClick={() => navigate(categoryPath)}
    >
      <UrlIcon url={url} style={{ width: 48, height: 48 }} />
      <p>{name}</p>
    </div>
  );
};

export default CategoryCard;
