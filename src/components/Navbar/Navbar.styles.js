// src/components/Navbar/Navbar.styles.js
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledNavbar = styled(motion.nav)`
  background-color: var(--color-light-sky-blue);
  height: var(--navbar-height);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 var(--space-4);
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

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
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

  &:hover {
    color: var(--color-salmon);
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    font-size: var(--text-xl);
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
`;

export const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
  z-index: var(--z-mid);

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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

  /* Correction ici : Utilisez les props directement sur ToggleSpan */
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

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    background-color: var(--color-light-sky-blue);
    position: absolute;
    top: var(--navbar-height);
    left: 0;
    padding: var(--space-8) var(--space-4);
    box-shadow: var(--shadow-lg);
    transform: translateX(${props => (props.$isOpen ? '0' : '100%')});
    transition: transform 0.3s ease-in-out;
    opacity: ${props => (props.$isOpen ? '1' : '0')};
    pointer-events: ${props => (props.$isOpen ? 'auto' : 'none')};
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
    padding: var(--space-4);
    font-size: var(--text-xl);
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

  /* Correction ici : Utilisez les props directement sur NotificationBadge */
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