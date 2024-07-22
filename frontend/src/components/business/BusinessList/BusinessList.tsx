import { Navigate, generatePath } from "react-router-dom";

import BusinessCard from "../BusinessCard/BusinessCard";
import { ROUTES } from "../../../routes/consts";
import React from "react";
import classNames from "classnames";
import styles from "./BusinessList.module.scss";
import { useBusinesses } from "../hooks";

interface BusinessListProps {
  categoryName?: string;
  className?: string;
}

const BusinessList = ({ categoryName, className }: BusinessListProps) => {
  const { data } = useBusinesses();
  const businesses = data ?? [];

  const filteredBusiness = categoryName
    ? businesses.filter((business: any) => business.category === categoryName)
    : businesses;

  const handleCardClick = (id: string) => {
    const path = generatePath(ROUTES.BUSINESS_DETAIL, { id });

    return <Navigate to={path} />;
  };

  return (
    <div className={classNames(styles.container, className)}>
      {filteredBusiness.map((business: any) => (
        <BusinessCard
          key={business._id}
          business={business}
          onClick={() => handleCardClick(business._id)}
        />
      ))}
    </div>
  );
};

export default BusinessList;
