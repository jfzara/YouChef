

import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledNavbar = styled(motion.nav)`
  background-color: var(--color-light-sky-blue);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: var(--z-high);
  width: 100%;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 var(--space-4);

  @media (max-width: 880px) {
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding-bottom: calc(var(--space-2));
  }

  @media (max-width: 490px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 5vh;
    padding-bottom: calc(var(--space-4) + 2rem);
    height: 14vh;
  }
`;

export const Brand = styled.div`
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

  @media (max-width: 880px) {
    font-size: var(--text-2xl);
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

  @media (max-width: 880px) {
    font-size: var(--text-3xl);
  }
`;

export const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
  z-index: var(--z-mid);
  position: relative;

  @media (max-width: 880px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: var(--space-8);
    height: var(--space-8);
  }

  @media (max-width: 490px) {
    align-self: center;
    order: 2;
    width: var(--space-9);
    height: var(--space-9);
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
  gap: var(--space-6); /* Gap entre les liens sur desktop */

  @media (max-width: 880px) {
    flex-direction: row; /* Affiche les liens en ligne */
    justify-content: space-around; /* Distribue l'espace entre les liens */
    align-items: center; /* Centre verticalement les liens */
    width: 100%; /* LE CONTENEUR PREND 100% DE LA LARGEUR DISPONIBLE */
    box-shadow: var(--shadow-lg);
    
    /* Styles pour le menu coulissant (si le menu burger est utilisé) */
    transform: translateX(${props => (props.$isOpen ? '0' : '100%')});
    transition: transform 0.3s ease-in-out;
    opacity: ${props => (props.$isOpen ? '1' : '0')};
    pointer-events: ${props => (props.$isOpen ? 'auto' : 'none')};
    
    padding: var(--space-2) var(--space-4); /* Padding plus compact du conteneur */
    height: var(--navbar-height); /* Hauteur fixe pour la ligne de liens */
    position: relative; /* Réinitialise la position si le menu n'est pas coulissant */
    top: auto;
    left: auto;
    background-color: var(--color-light-sky-blue);
  }

  @media (max-width: 490px) {
    flex-direction: row;
    justify-content: space-around;
    width: 100%; /* Également 100% pour les très petits écrans */
    padding: var(--space-2) var(--space-2); /* Padding ajusté pour les très petits */
    height: var(--navbar-height);
    position: absolute; /* Si le menu doit glisser hors de l'écran en largeur */
    top: var(--navbar-height); /* Positionne sous la navbar si elle a une hauteur fixe */
    left: 0;
  }
`;

export const StyledNavLink = styled(motion.a)`
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
  flex: 1; /* Chaque lien prend une part égale de l'espace disponible */
  justify-content: center; /* Centre le contenu du lien horizontalement */
  text-align: center; /* Assure que le texte est centré dans sa cellule */
  white-space: nowrap; /* Empêche le texte de se casser sur plusieurs lignes */

  &:hover {
    color: var(--color-bright-pink-crayola);
    background-color: var(--color-cream);
  }

  &.active {
    color: var(--color-bright-pink-crayola);
    background-color: var(--color-jasmine);
    box-shadow: var(--shadow-sm);
  }

  @media (max-width: 768px) {
    padding: var(--space-2); /* Un padding plus petit pour les cellules horizontales */
    font-size: var(--text-lg); /* Peut-être revenir à une taille un peu plus petite pour que ça tienne */
  }

  @media (max-width: 490px) {
    font-size: var(--text-sm); /* Encore plus petit pour les très petits mobiles si nécessaire */
    padding: var(--space-1); /* Encore moins de padding pour les très petits mobiles */
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
`;

export const LogoutButton = styled(motion.button)`
  background-color: var(--color-bright-pink-crayola);
  color: var(--color-neutral-0);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-full);
  border: none;
  font-family: var(--font-family-sans);
  font-weight: var(--font-bold);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: var(--transition-base);

  &:hover {
    background-color: var(--color-salmon);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: var(--space-4);
  }
`;