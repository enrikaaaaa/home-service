import React from "react";
import styles from "./Card.module.scss";

interface CardProps {
  src: string;
  alt: string;
  text: string;
}

const Card = ({ src, alt, text }: CardProps) => {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={src} alt={alt} />
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default Card;
