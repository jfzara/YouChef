// src/components/Navbar/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Assurez-vous que react-router-dom est importé ici

// Importez tous vos styled components
import {
  StyledNavbar,
  NavContainer,
  Brand,
  BrandIcon, // Correction ici
  NavLinks,
  StyledNavLink,
  MenuToggle,
  ToggleSpan,
  NotificationBadge,
} from './Navbar.styles';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledNavbar>
      <NavContainer>
        <Brand to="/">
          <BrandIcon>🍽️</BrandIcon> {/* Correction : BrandIcon et balise de fermeture correcte */}
          Mon Carnet de Recettes
        </Brand>

        <MenuToggle onClick={toggleMenu} className={isOpen ? 'active' : ''}>
          <ToggleSpan />
          <ToggleSpan />
          <ToggleSpan />
        </MenuToggle>

        <NavLinks className={isOpen ? 'active' : ''}>
          <li>
            <StyledNavLink to="/" activeClassName="activeLink" onClick={() => setIsOpen(false)} index={0}>
              Accueil
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/recettes" activeClassName="activeLink" onClick={() => setIsOpen(false)} index={1}>
              Recettes
              {/* Example of a notification badge, remove if not needed */}
              <NotificationBadge />
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/ajouter" activeClassName="activeLink" onClick={() => setIsOpen(false)} index={2}>
              Ajouter Recette
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/contact" activeClassName="activeLink" onClick={() => setIsOpen(false)} index={3}>
              Contact
            </StyledNavLink>
          </li>
        </NavLinks>
      </NavContainer>
    </StyledNavbar>
  );
};

export default Navbar;