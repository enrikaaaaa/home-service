import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import Avatar from "../common/Avatar/Avatar";
import Button from "../common/Button/Button";
import React from "react";
import { User } from "../user/types";
import { UserContext } from "../../context/UserContext";
import logo from "@/assets/pictures/Logo.png";
import { navigationBarLinks } from "../../routes/consts";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, logout, user } = useContext(UserContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={`${styles.navBar} ${menuOpen ? styles.menuOpen : ""}`}>
      <div className={styles.leftSection}>
        <Link to="/" className={styles.logoContainer}>
          <img className={styles.logo} src={logo} alt="Logo" />
        </Link>
        <div
          className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ""}`}
        >
          {navigationBarLinks.map((link) => (
            <Link
              key={link.name}
              className={styles.link}
              to={link.path}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.rightSection}>
        {isLoggedIn ? (
          <div className={styles.rightSectionAlign}>
            <Avatar user={user as unknown as User} handleLogout={handleLogout} />
          </div>
        ) : (
          <Button onClick={() => navigate("/login")} large={true}>
            Login / Sign Up
          </Button>
        )}
      </div>

      <div className={styles.menuToggle} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </nav>
  );
};

export default NavBar;
