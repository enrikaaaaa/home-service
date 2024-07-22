import React from "react";
import classNames from "classnames";
import styles from "./Input.module.scss";

interface InputProps {
  className?: string;
}

const Input = ({ className, ...props }: InputProps) => {
  return <input className={classNames(styles.input, className)} {...props} />;
};

export default Input;
