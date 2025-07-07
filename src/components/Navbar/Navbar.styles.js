

// src/components/Navbar/Navbar.styles.js

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

export const StyledNavbar = styled(motion.nav)`
  background-color: var(--color-light-sky-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow-sm);
  position: sticky; /* Garde la navbar en haut lors du défilement */
  top: 0;
  z-index: var(--z-high); /* Assure que la navbar est au-dessus du contenu de la page */
  width: 100%;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 var(--space-4);
  height: var(--navbar-height); /* Assure une hauteur constante pour la navbar */

  @media (max-width: 978px) {
    justify-content: space-between;
    padding: var(--space-2) var(--space-4);
  }

  @media (max-width: 490px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-2) var(--space-4);
    height: var(--navbar-height);
  }
`;

export const Brand = styled(motion(NavLink))`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-family: var(--font-family-heading);
  font-size: var(--text-2xl);
  color: var(--color-bright-pink-crayola);
  text-shadow: var(--shadow-text-sm);
  cursor: pointer;
  transition: var(--transition-fast);
  padding: var(--space-2);
  white-space: nowrap;

  &:hover {
    color: var(--color-salmon);
    transform: scale(1.02);
  }

  @media (max-width: 978px) {
    font-size: var(--text-xl);
  }
  @media (max-width: 490px) {
    font-size: var(--text-lg);
  }
`;

export const BrandIcon = styled.span`
  font-size: var(--text-3xl);
  margin-right: var(--space-2);
  color: var(--color-jasmine);
  transform: rotate(-10deg);
  display: inline-block;
  transition: transform var(--transition-base);

  ${Brand}:hover & {
    transform: rotate(10deg) scale(1.1);
    color: var(--color-bright-pink-crayola);
  }

  @media (max-width: 978px) {
    font-size: var(--text-2xl);
  }
  @media (max-width: 490px) {
    font-size: var(--text-xl);
  }
`;

export const MenuToggle = styled.button`
  display: none; /* Masqué par défaut sur les grands écrans */
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
  z-index: calc(var(--z-high) + 1); /* TRÈS IMPORTANT : Assure qu'il est au-dessus de tout, y compris la navbar */
  position: relative; /* Nécessaire pour que z-index prenne effet */

  @media (max-width: 978px) {
    display: flex; /* Affiché sur les écrans plus petits */
    flex-direction: column;
    justify-content: space-around;
    width: var(--space-9);
    height: var(--space-9);
  }

  @media (max-width: 490px) {
    width: var(--space-8);
    height: var(--space-8);
  }
`;

export const ToggleSpan = styled.span`
  display: block;
  width: 100%;
  height: 3px;
  background-color: var(--color-neutral-800);
  border-radius: var(--radius-full);
  transition: all 0.3s ease-in-out;

  ${props => props.$isOpen && `
    &:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    &:nth-child(2) {
      opacity: 0;
    }
    &:nth-child(3) {
      transform: rotate(-45deg) translate(5px, -5px);
    }
  `}
`;

export const NavLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: var(--space-6);

  @media (max-width: 978px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    position: fixed; /* Le menu latéral est en position fixe */
    top: var(--navbar-height); /* Commence juste en dessous de la navbar */
    left: 0;
    height: calc(100vh - var(--navbar-height)); /* Prend le reste de la hauteur de l'écran */
    background-color: var(--color-light-sky-blue);
    box-shadow: var(--shadow-lg);
    transform: translateX(${props => (props.$isOpen ? '0' : '100%')}); /* Anime l'ouverture/fermeture */
    transition: transform 0.3s ease-in-out;
    opacity: ${props => (props.$isOpen ? '1' : '0')}; /* Transition d'opacité pour le contenu */
    pointer-events: ${props => (props.$isOpen ? 'auto' : 'none')}; /* Permet ou non les interactions */
    padding: var(--space-3) 0;
    gap: var(--space-3);
    overflow-y: auto; /* Permet le défilement si le contenu dépasse */
  }

  @media (max-width: 490px) {
    padding: var(--space-2) 0;
    gap: var(--space-2);
  }
`;

export const StyledNavLink = styled(motion(NavLink))`
  font-family: var(--font-family-sans);
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--color-neutral-800);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: background-color var(--transition-fast), color var(--transition-fast);
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  min-width: fit-content;
  min-width: -moz-fit-content;

  &:hover {
    color: var(--color-bright-pink-crayola);
    background-color: var(--color-cream);
  }

  &.active {
    color: var(--color-bright-pink-crayola);
    background-color: var(--color-jasmine);
    box-shadow: var(--shadow-sm);
  }

  @media (max-width: 978px) {
    width: 80%;
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-lg);
  }

  @media (max-width: 490px) {
    width: 90%;
    font-size: var(--text-base);
    padding: var(--space-2) var(--space-4);
  }
`;

export const NotificationBadge = styled.span`
  background-color: var(--color-salmon);
  color: var(--color-neutral-0);
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  border-radius: var(--radius-full);
  padding: 0.1rem 0.4rem;
  position: absolute;
  top: var(--space-1);
  right: var(--space-1);
  transform: translate(50%, -50%);
  display: none;

  ${props => props.$hasNotificationBadge && `
    display: block;
  `}

  @media (max-width: 978px) {
    top: 0.2rem;
    right: 0.2rem;
    font-size: var(--text-xs);
    padding: 0.05rem 0.3rem;
  }
`;

export const LogoutButton = styled(motion.button)`
  background-color: var(--color-bright-pink-crayola);
  color: var(--color-neutral-0);
  padding: 0.6rem var(--space-5);
  border-radius: var(--radius-full);
  border: none;
  font-family: var(--font-family-sans);
  font-weight: var(--font-bold);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-base);
  min-width: fit-content;
  min-width: -moz-fit-content;
  
  &:hover {
    background-color: var(--color-salmon);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  @media (max-width: 978px) {
    width: 80%;
    margin-top: var(--space-4);
    padding: 0.5rem var(--space-4);
    font-size: var(--text-base);
  }

  @media (max-width: 490px) {
    width: 90%;
    margin-top: var(--space-3);
    padding: 0.4rem var(--space-4);
    font-size: var(--text-sm);
  }
`;