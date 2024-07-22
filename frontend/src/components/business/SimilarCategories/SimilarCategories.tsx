import { generatePath, useNavigate } from "react-router-dom";

import { ROUTES } from "../../../routes/consts";
import React from "react";
import SmallBusinessCard from "../BusinessCard/SmallBusinessCard";
import { useBusinesses } from "../hooks";

interface Business {
  _id: string;
  name: string;
  company: string;
  address: string;
  img: string;
  category: string;
  lastName: string;
}

interface BusinessListProps {
  categoryName?: string;
  className?: string;
}

const SimilarCategories = ({ categoryName, className }: BusinessListProps) => {
  const { data } = useBusinesses();
  const businesses = data ?? [];
  const navigate = useNavigate();

  const filteredBusiness = categoryName
    ? businesses.filter(
        (business: Business) => business.category === categoryName
      )
    : businesses;

  const handleCardClick = (id: string) => {
    const path = generatePath(ROUTES.BUSINESS_DETAIL, { id });
    navigate(path);
  };

  return (
    <div className={className}>
      {filteredBusiness.map((business: Business) => (
        <div key={business._id} onClick={() => handleCardClick(business._id)}>
          <SmallBusinessCard business={business} />
        </div>
      ))}
    </div>
  );
};

export default SimilarCategories;
