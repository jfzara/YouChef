// src/components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHover } from '../../contexts/HoverContext';

import {
  StyledNavbar,
  NavContainer,
  Brand,
  BrandIcon,
  NavLinks,
  StyledNavLink,
  MenuToggle,
  ToggleSpan,
  NotificationBadge,
} from './Navbar.styles';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsNavbarHovered } = useHover();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledNavbar
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 10 }}
      whileHover={{
        scale: 1.005,
        boxShadow: `0 10px 30px rgba(34, 197, 94, 0.2), 0 0 0 5px rgba(34, 197, 94, 0.05)`,
        transition: { type: "spring", stiffness: 200, damping: 15 }
      }}
    >
      <NavContainer>
        <Brand to="/">
          <BrandIcon>🍽️</BrandIcon>
          Mon Carnet de Recettes
        </Brand>

        <MenuToggle onClick={toggleMenu} className={isOpen ? 'active' : ''}>
          <ToggleSpan />
          <ToggleSpan />
          <ToggleSpan />
        </MenuToggle>

        <NavLinks className={isOpen ? 'active' : ''}>
          <li>
            <StyledNavLink
              to="/"
              className={({ isActive }) => isActive ? "activeLink" : undefined}
              onClick={() => setIsOpen(false)}
              index={0}
              onMouseEnter={() => setIsNavbarHovered(true)}
              onMouseLeave={() => setIsNavbarHovered(false)}
            >
              <span>Accueil</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink
              to="/recettes"
              className={({ isActive }) => isActive ? "activeLink" : undefined}
              onClick={() => setIsOpen(false)}
              index={1}
              onMouseEnter={() => setIsNavbarHovered(true)}
              onMouseLeave={() => setIsNavbarHovered(false)}
              // NOUVEAU: Ajout de cette prop ici
              hasNotificationBadge={true} 
            >
              <span>Recettes</span>
              <NotificationBadge />
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink
              to="/ajouter"
              className={({ isActive }) => isActive ? "activeLink" : undefined}
              onClick={() => setIsOpen(false)}
              index={2}
              onMouseEnter={() => setIsNavbarHovered(true)}
              onMouseLeave={() => setIsNavbarHovered(false)}
            >
              <span>Dashboard</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink
              to="/contact"
              $hasIllustration={true}
              onMouseEnter={() => setIsNavbarHovered(true)}
              onMouseLeave={() => setIsNavbarHovered(false)}
            >
              <span>Contact</span>
            </StyledNavLink>
          </li>
        </NavLinks>
      </NavContainer>
    </StyledNavbar>
  );
};

export default Navbar;