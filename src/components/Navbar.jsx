
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from '../styles/Navbar.module.css';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Déconnexion réussie');
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Brand/Logo */}
        <Link to="/" className={styles.brand} onClick={closeMobileMenu}>
          <div className={styles.brandIcon}>
            🍽️
          </div>
          RecetteApp
        </Link>

        {/* Mobile menu toggle */}
        <button 
          className={`${styles.menuToggle} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ''}`}>
          <li>
            <Link 
              to="/" 
              className={`${styles.navLink} ${isActiveLink('/') ? styles.activeLink : ''}`}
              onClick={closeMobileMenu}
            >
              Accueil
            </Link>
          </li>
          
          <li>
            <Link 
              to="/recettes" 
              className={`${styles.navLink} ${isActiveLink('/recettes') ? styles.activeLink : ''}`}
              onClick={closeMobileMenu}
            >
              Recettes
            </Link>
          </li>
          
          {isAuthenticated && (
            <li>
              <Link 
                to="/dashboard" 
                className={`${styles.navLink} ${isActiveLink('/dashboard') ? styles.activeLink : ''}`}
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
            </li>
          )}

          {!isAuthenticated ? (
            <>
              <li>
                <Link 
                  to="/connexion" 
                  className={`${styles.navLink} ${isActiveLink('/connexion') ? styles.activeLink : ''}`}
                  onClick={closeMobileMenu}
                >
                  Connexion
                </Link>
              </li>
              <li>
                <Link 
                  to="/inscription" 
                  className={`${styles.navLink} ${isActiveLink('/inscription') ? styles.activeLink : ''}`}
                  onClick={closeMobileMenu}
                >
                  Inscription
                </Link>
              </li>
            </>
          ) : (
            <>
              {user && (
                <li>
                  <span className={styles.navLink} style={{ cursor: 'default' }}>
                    👋 {user.identifiant}
                  </span>
                </li>
              )}
              <li>
                <button 
                  onClick={handleLogout} 
                  className={styles.navLink}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    font: 'inherit'
                  }}
                >
                  Déconnexion
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;