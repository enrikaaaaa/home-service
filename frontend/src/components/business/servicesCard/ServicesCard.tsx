import React from "react";
import styles from "./ServicesCard.module.scss";

interface ServicesCardProps {
  img: string;
  company: string;
  name: string;
  lastName: string;
  address: string;
  category: string;
}

const ServicesCard = ({
  img,
  company,
  name,
  lastName,
  address,
  category,
}: ServicesCardProps) => {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={img} alt={company} />
      <div className={styles.infoContainer}>
        <h2 className={styles.chip}>{category}</h2>
        <h3 className={styles.name}>{company}</h3>
        <p className={styles.contactPerson}>
          {name} {lastName}
        </p>
        <p className={styles.address}>{address}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
