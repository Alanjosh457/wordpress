import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css'
const Header = () => {
  return (
    <nav className={styles.nav1}>
      <ul className={styles.nav2}>
        <li className={styles.navele}>
          <Link to="/">Filter Urls </Link>
        </li>
        <li>
          <Link to="/weather">Get Weather data</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
