import React from "react";
import styles from "./Loader.module.scss";
import { useMediaQuery } from "react-responsive";

interface WifiLoaderProps {
  className?: string;
  text?: string;
  frontColor?: string;
  backColor?: string;
  textColor?: string;
  size?: string;
  desktopSize?: string;
  mobileSize?: string;
}

const WifiLoader = ({
  className = `wifiloader`,
  text = `Loading...`,
  frontColor = `#4F29F0`,
  backColor = `#C3C8DE`,
  textColor = `#414856`,
  size = `64px`,
  desktopSize = ``,
  mobileSize = ``,
}: WifiLoaderProps) => {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  let sizeFound = 0.0;
  if (isDesktopOrLaptop) {
    if (desktopSize !== "") sizeFound = parseFloat(desktopSize);
    else sizeFound = parseFloat(size) * 2;
  }

  if (isTabletOrMobile) {
    if (mobileSize !== "") sizeFound = parseFloat(mobileSize);
    else sizeFound = parseFloat(size);
  }

  const sizePassed = parseFloat(sizeFound.toString());
  const ratio = sizePassed / 64;
  const sizeText = (ratio * 1.5 * 14) / 2;
  const sizeTextMargin = (sizePassed * 120) / 64;
  const sizeOuter = (sizePassed * 86) / 64;
  const sizeMiddle = (sizePassed * 60) / 64;
  const sizeInner = (sizePassed * 34) / 64;

  return (
    <div className={`${styles.parentDiv} ${className}`}>
      <div
        className={styles.styledDiv}
        style={{ width: sizePassed, height: sizePassed }}
      >
        <svg
          className={styles.styledSVG}
          style={{ height: sizeOuter, width: sizeOuter }}
        >
          <circle
            className={`${styles.styledSVGCircle} ${styles.styledSVGCircleOuter} ${styles.styledSVGCircleOuterBack}`}
            style={{ stroke: backColor }}
            cx="43"
            cy="43"
            r="40"
          />
          <circle
            className={`${styles.styledSVGCircle} ${styles.styledSVGCircleOuter} ${styles.styledSVGCircleOuterFront}`}
            style={{ stroke: frontColor }}
            cx="43"
            cy="43"
            r="40"
          />
        </svg>
        <svg
          className={styles.styledSVG}
          style={{ height: sizeMiddle, width: sizeMiddle }}
        >
          <circle
            className={`${styles.styledSVGCircle} ${styles.styledSVGCircleMiddle} ${styles.styledSVGCircleMiddleBack}`}
            style={{ stroke: backColor }}
            cx="30"
            cy="30"
            r="27"
          />
          <circle
            className={`${styles.styledSVGCircle} ${styles.styledSVGCircleMiddle} ${styles.styledSVGCircleMiddleFront}`}
            style={{ stroke: frontColor }}
            cx="30"
            cy="30"
            r="27"
          />
        </svg>
        <svg
          className={styles.styledSVG}
          style={{ height: sizeInner, width: sizeInner }}
        >
          <circle
            className={`${styles.styledSVGCircle} ${styles.styledSVGCircleInner} ${styles.styledSVGCircleInnerBack}`}
            style={{ stroke: backColor }}
            cx="17"
            cy="17"
            r="14"
          />
          <circle
            className={`${styles.styledSVGCircle} ${styles.styledSVGCircleInner} ${styles.styledSVGCircleInnerFront}`}
            style={{ stroke: frontColor }}
            cx="17"
            cy="17"
            r="14"
          />
        </svg>
        <div
          className={styles.styledText}
          style={{
            color: textColor,
            fontSize: sizeText,
            marginTop: sizeTextMargin,
          }}
          data-text={text}
        >
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default WifiLoader;
