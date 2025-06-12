import React from 'react';
import { Link } from 'react-router-dom';
import styles from  '../styles/Navbar.module.css';  

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.nav_link}>Accueil</Link>
      <Link to="/recettes" className={styles.nav_link}>Recettes</Link>
      <Link to="/dashboard" className={styles.nav_link}>Dashboard</Link>
      <Link to="/connexion" className={styles.nav_link}>Connexion</Link>
      <Link to="/inscription" className={styles.nav_link}>Inscription</Link>
    </nav>
  );
};

export default Navbar;