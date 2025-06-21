// src/components/Navbar/Navbar.styles.js

import styled, { keyframes, css } from 'styled-components';
import { Link, NavLink } from 'react-router-dom'; // Correction : NavLink importé ici aussi

// Keyframes pour les animations
const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledNavbar = styled.nav`
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-base);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient-glass);
    border-radius: inherit;
    z-index: -1;
  }
`;

export const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-4) var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: var(--space-3) var(--space-4);
  }
  @media (max-width: 480px) {
    padding: var(--space-2) var(--space-3);
  }
`;

export const Brand = styled(Link)`
  font-family: var(--font-family-heading);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-primary-600);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  transition: all var(--transition-base);

  &:hover {
    color: var(--color-primary-700);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    font-size: var(--text-xl);
  }
  @media (max-width: 480px) {
    font-size: var(--text-lg);
    gap: var(--space-1);
  }
`;

export const BrandIcon = styled.div`
  width: 32px;
  height: 32px;
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: var(--text-lg);
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
  @media (max-width: 480px) {
    width: 24px;
    height: 24px;
    font-size: var(--text-base);
  }
`;

export const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  list-style: none;
  margin: 0; // Remove default ul margin
  padding: 0; // Remove default ul padding

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    flex-direction: column;
    padding: var(--space-4);
    gap: var(--space-2);
    box-shadow: var(--shadow-lg);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    transform: translateY(-10px);
    opacity: 0;
    visibility: hidden;
    transition: all var(--transition-base);

    &.active { /* This class is added by Navbar.jsx's state */
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
`;

export const StyledNavLink = styled(NavLink)` // Use NavLink from react-router-dom
  position: relative;
  text-decoration: none;
  color: var(--color-neutral-700);
  font-weight: var(--font-medium);
  font-size: var(--text-base);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  overflow: hidden;
  display: block; /* Ensure it takes full width in mobile menu */
  white-space: nowrap; /* Prevent wrapping */

  /* Pseudo-element for hover effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--gradient-primary);
    transition: left var(--transition-base);
    z-index: -1;
    opacity: 0.1;
  }

  /* Pseudo-element for advanced hover effect (radial gradient) */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: all var(--transition-base);
    border-radius: var(--radius-full);
    z-index: -1;
  }

  &:hover {
    color: var(--color-primary-700);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:hover::before {
    left: 0;
  }

  &:hover::after {
    width: 120px;
    height: 120px;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-500), 0 0 0 4px rgba(34, 197, 94, 0.2);
  }

  /* Active link style from react-router-dom's NavLink */
  &.activeLink { /* This class name comes from activeClassName prop on NavLink */
    color: var(--color-primary-600);
    background: rgba(34, 197, 94, 0.08);
    box-shadow: var(--shadow-sm);
  }

  &.activeLink::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 24px;
    height: 3px;
    background: var(--gradient-primary);
    border-radius: var(--radius-full);
    /* Ensure this ::after (active indicator) is above the radial hover ::after */
    z-index: 1; 
  }

  /* Animation d'entrée pour les liens - applied directly via keyframes */
  ${({ index }) => css`
    animation: ${fadeIn} 0.6s ease-out forwards;
    animation-delay: ${0.1 + (index * 0.1)}s; /* Dynamic delay based on index */
  `}


  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: var(--space-4);
    border-radius: var(--radius-xl);
  }
`;

export const MenuToggle = styled.button`
  display: none; /* Hidden by default on desktop */
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);

  &:hover {
    background: rgba(34, 197, 94, 0.08);
  }

  @media (max-width: 768px) {
    display: flex; /* Show on mobile */
  }
`;

export const ToggleSpan = styled.span`
  width: 24px;
  height: 2px;
  background: var(--color-neutral-700);
  margin: 2px 0;
  transition: all var(--transition-base);
  transform-origin: center;

  ${MenuToggle}.active &:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  ${MenuToggle}.active &:nth-child(2) {
    opacity: 0;
  }
  ${MenuToggle}.active &:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 12px;
  height: 12px;
  background: var(--color-error);
  border-radius: var(--radius-full);
  border: 2px solid white;
  animation: ${pulse} 2s infinite;
`;