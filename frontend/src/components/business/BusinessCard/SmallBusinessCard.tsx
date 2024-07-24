import React, { useState } from "react";

import { Link } from "react-router-dom";
import styles from "./SmallBusinessCard.module.scss";

interface SmallBusinessCardProps {
  business: {
    img: string;
    company: string;
    name: string;
    lastName: string;
    address: string;
    category: string;
    _id: string;
  };
  onClick?: () => void;
}

const SmallBusinessCard = ({ business, onClick }: SmallBusinessCardProps) => {
  return (
    <Link to={`/business/${business._id}`} className={styles.card}>
      <div className={styles.cardContent} onClick={onClick}>
        {business.img && (
          <img
            src={business.img}
            alt={business.company}
            className={styles.image}
          />
        )}
        <div className={styles.infoContainer}>
          <h3 className={styles.name}>{business.company}</h3>
          <p className={styles.contactPerson}>
            {`${business.name} ${business.lastName}`}
          </p>
          <p className={styles.address}>{business.address}</p>
        </div>
      </div>
    </Link>
  );
};

export default SmallBusinessCard;
