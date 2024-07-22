import React from "react";
import classNames from "classnames";
import styles from "./Button.module.scss";

interface ButtonProps {
  className?: string;
  rounded?: boolean;
  small?: boolean;
  large?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  className,
  rounded,
  small,
  large,
  children,
  onClick,
  ...props
}: ButtonProps & { children?: React.ReactNode }) => {
  return (
    <button
      className={classNames(
        styles.button,
        rounded && styles.rounded,
        small && styles.small,
        large && styles.large,
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
