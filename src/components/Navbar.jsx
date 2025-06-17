import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import { useAuth } from '../contexts/AuthContext'; // Assure-toi que ce chemin est correct

const Navbar = () => {
  const { logout, token } = useAuth(); // Appel du hook DANS le composant

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.nav_link}>Accueil</Link>
      <Link to="/recettes" className={styles.nav_link}>Recettes</Link>
      <Link to="/dashboard" className={styles.nav_link}>Dashboard</Link>

      {!token && (
        <>
          <Link to="/connexion" className={styles.nav_link}>Connexion</Link>
          <Link to="/inscription" className={styles.nav_link}>Inscription</Link>
        </>
      )}

      {token && (
        <button onClick={logout} className={styles.nav_link}>
          Déconnexion
        </button>
      )}
    </nav>
  );
};

export default Navbar;