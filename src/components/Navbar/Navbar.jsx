// src/components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // <--- NavLink est bien importé ici !
import { useHover } from '../../contexts/HoverContext';
import { useAuth } from '../../contexts/AuthContext';

import {
  StyledNavbar,
  NavContainer,
  Brand, // <-- Brand est importé ici
  BrandIcon, // <-- BrandIcon est importé ici
  NavLinks,
  StyledNavLink, // <-- StyledNavLink est importé ici
  MenuToggle,
  ToggleSpan,
  NotificationBadge,
  LogoutButton
} from './Navbar.styles';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsNavbarHovered } = useHover();
  const { token, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <StyledNavbar
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 10 }}
    >
      <NavContainer $isOpen={isOpen}>
        {/* Ici, on passe NavLink à la prop 'as' de Brand. C'est la bonne façon ! */}
        <Brand as={NavLink} to="/"> 
          <BrandIcon>🍽️</BrandIcon>
          Mon Carnet de Recettes
        </Brand>

        <MenuToggle onClick={toggleMenu} $isOpen={isOpen}>
          <ToggleSpan />
          <ToggleSpan />
          <ToggleSpan />
        </MenuToggle>

        <NavLinks $isOpen={isOpen}>
          <li>
            {/* Ici aussi, on passe NavLink à la prop 'as' de StyledNavLink. Parfait ! */}
            <StyledNavLink
              as={NavLink} // <--- C'est ici que StyledNavLink devient un NavLink
              to="/"
              $isActive={({ isActive }) => isActive}
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Accueil</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink
              as={NavLink} // <--- C'est ici que StyledNavLink devient un NavLink
              to="/recettes"
              $isActive={({ isActive }) => isActive}
              onClick={() => setIsOpen(false)}
              $hasNotificationBadge={true}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Recettes</span>
              <NotificationBadge />
            </StyledNavLink>
          </li>
          {token ? (
            <>
              <li>
                <StyledNavLink
                  as={NavLink} // <--- C'est ici que StyledNavLink devient un NavLink
                  to="/dashboard"
                  $isActive={({ isActive }) => isActive}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Dashboard</span>
                </StyledNavLink>
              </li>
              <li>
                <LogoutButton
                  onClick={handleLogout}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Déconnexion</span>
                </LogoutButton>
              </li>
            </>
          ) : (
            <>
              <li>
                <StyledNavLink
                  as={NavLink} // <--- C'est ici que StyledNavLink devient un NavLink
                  to="/connexion"
                  $isActive={({ isActive }) => isActive}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Connexion</span>
                </StyledNavLink>
              </li>
              <li>
                <StyledNavLink
                  as={NavLink} // <--- C'est ici que StyledNavLink devient un NavLink
                  to="/inscription"
                  $isActive={({ isActive }) => isActive}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Inscription</span>
                </StyledNavLink>
              </li>
            </>
          )}
        </NavLinks>
      </NavContainer>
    </StyledNavbar>
  );
};

export default Navbar;