import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Déconnexion réussie');
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.nav_link}>Accueil</Link>
      <Link to="/recettes" className={styles.nav_link}>Recettes</Link>
      
      {isAuthenticated && (
        <Link to="/dashboard" className={styles.nav_link}>Dashboard</Link>
      )}

      {!isAuthenticated && (
        <>
          <Link to="/connexion" className={styles.nav_link}>Connexion</Link>
          <Link to="/inscription" className={styles.nav_link}>Inscription</Link>
        </>
      )}

      {isAuthenticated && (
        <>
          {user && <span className={styles.nav_link}>Bonjour {user.identifiant}</span>}
          <button onClick={handleLogout} className={styles.nav_link}>
            Déconnexion
          </button>
        </>
      )}
    </nav>
  );
};

export default Navbar;