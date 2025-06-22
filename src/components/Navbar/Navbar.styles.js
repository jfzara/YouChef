// src/components/Navbar/Navbar.styles.js

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export const StyledNavbar = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--navbar-height);
  // --- CHANGEMENT ICI : Nouvelle couleur de fond pour la Navbar ---
  background: var(--color-neutral-0); /* Blanc pur */
  /* Alternative : un dégradé très léger et chaleureux si vous voulez plus d'audace */
  /* background: linear-gradient(90deg, var(--color-neutral-0) 0%, var(--color-neutral-50) 100%); */
  box-shadow: var(--shadow-lg);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-high);
  color: var(--color-neutral-800); /* Changer la couleur du texte pour qu'elle contraste avec le blanc */
  transition: all var(--transition-base);
`;

export const NavContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--space-8);

  @media (max-width: 768px) {
    padding: 0 var(--space-4);
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const Brand = styled(NavLink)`
  font-family: var(--font-family-heading); /* Applique la nouvelle police de titre */
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-700); /* Une couleur qui contraste bien avec le blanc du fond */
  text-shadow: var(--shadow-text-sm); /* Une ombre plus subtile si le fond est clair */
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  transition: transform var(--transition-fast);

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: var(--text-xl);
    flex-grow: 1;
  }
`;

export const BrandIcon = styled.span`
  font-size: var(--text-3xl);
  line-height: 1;
  @media (max-width: 768px) {
    font-size: var(--text-2xl);
  }
`;

export const NavLinks = styled(motion.ul)`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    top: var(--navbar-height);
    left: 0;
    width: 100%;
    // --- CHANGEMENT ICI : Fond des NavLinks en mode mobile ---
    background: var(--color-neutral-0); /* Utilise la même couleur que la navbar */
    box-shadow: var(--shadow-xl);
    transform: translateY(${props => (props.$isOpen ? '0' : '-100%')});
    transition: transform var(--transition-base);
    align-items: center;
    padding: var(--space-4) 0;
    z-index: var(--z-mid);
  }
`;

// --- CHANGEMENT MAJEUR ICI : StyledNavLink est maintenant un motion.custom(NavLink) ---
export const StyledNavLink = styled(motion(NavLink))`
  color: var(--color-neutral-700); /* Couleur des liens pour contraster avec le fond blanc */
  text-decoration: none;
  font-family: var(--font-family-sans); /* Applique la nouvelle police de texte */
  font-size: var(--text-lg);
  font-weight: var(--font-medium);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;
  margin: 0 var(--space-3);

  &:hover {
    background-color: rgba(0, 0, 0, 0.05); /* Fond de survol plus discret */
    color: var(--color-primary-600); /* Changer la couleur du texte au survol */
  }

  /* Les animations Framer Motion seront gérées via les props dans Navbar.jsx */

  &.activeLink {
    background-color: rgba(0, 0, 0, 0.1); /* Couleur pour le lien actif */
    font-weight: var(--font-semibold);
    color: var(--color-primary-700); /* Couleur du lien actif */
  }

  ${({ $isActive }) =>
    $isActive &&
    `
  `}

  ${({ $hasNotificationBadge }) =>
    $hasNotificationBadge &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 8px;
      height: 8px;
      background-color: var(--color-secondary-500);
      border-radius: 50%;
      border: 1px solid var(--color-neutral-0);
    }
  `}

  @media (max-width: 768px) {
    margin: var(--space-3) 0;
    width: 80%;
    text-align: center;
  }
`;

export const MenuToggle = styled(motion.div)`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  cursor: pointer;
  z-index: var(--z-high);

  @media (max-width: 768px) {
    display: flex;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    ${ToggleSpan}:nth-child(1) {
      transform: rotate(45deg);
    }
    ${ToggleSpan}:nth-child(2) {
      opacity: 0;
      transform: translateX(-20px);
    }
    ${ToggleSpan}:nth-child(3) {
      transform: rotate(-45deg);
    }
  `}
`;

export const ToggleSpan = styled.div`
  width: 100%;
  height: 3px;
  background-color: var(--color-primary-600); /* Couleur des barres du burger pour contraster avec le fond blanc */
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
  transform-origin: 1px;
`;

export const NotificationBadge = styled.span`
  /* Reste le même, le style est appliqué via $hasNotificationBadge sur StyledNavLink */
`;

export const LogoutButton = styled(motion.button)`
  background: var(--color-secondary-500); /* Une couleur audacieuse pour le bouton de déconnexion */
  color: var(--color-neutral-0);
  padding: var(--space-2) var(--space-4);
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-family-heading); /* Applique la police de titre */
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    background-color: var(--color-secondary-600); /* Légèrement plus foncé au survol */
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  @media (max-width: 768px) {
    width: 80%;
    margin-top: var(--space-3);
  }
`;