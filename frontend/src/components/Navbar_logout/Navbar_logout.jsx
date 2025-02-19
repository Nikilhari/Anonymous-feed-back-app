import React from "react";
import styles from "../Navbar/Navbar.module.css";
import { Link } from "react-router-dom";
const Navbar_logout = () => {
  return (
    <div className={styles.c}>
      <div className={styles.logo}>
        <h1>WHISPER WIRE</h1>
      </div>
      <div className={styles.enclose}>
        <Link
          to="/"
          className={styles.contents}
          onClick={() => {
            localStorage.removeItem("token");
          }}
        >
          <h3>Logout</h3>
        </Link>
      </div>
    </div>
  );
};

export default Navbar_logout;
