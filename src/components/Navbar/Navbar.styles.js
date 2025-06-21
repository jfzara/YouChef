// src/components/Navbar/Navbar.styles.js

import styled, { keyframes, css } from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Keyframes
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

const glitchEffect = keyframes`
  0% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75), -0.02em -0.04em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  14% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.035em 0 rgba(0, 255, 0, 0.75), -0.03em -0.03em 0 rgba(0, 0, 255, 0.75);
  }
  15% {
    text-shadow: none;
  }
  17% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.035em 0 rgba(0, 255, 0, 0.75), -0.03em -0.03em 0 rgba(0, 0, 255, 0.75);
  }
  20%, 100% {
    text-shadow: none;
  }
`;

const popInAndRotate = keyframes`
  0% { opacity: 0; transform: scale(0) rotate(0deg); }
  70% { opacity: 1; transform: scale(1.2) rotate(20deg); }
  100% { opacity: 1; transform: scale(1) rotate(15deg); }
`;

const glossyShine = keyframes`
  0% {
    transform: translateX(-100%) skewX(-30deg);
  }
  100% {
    transform: translateX(100%) skewX(-30deg);
  }
`;

export const StyledNavbar = styled(motion.nav)`
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
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
    transition: opacity var(--transition-base);
  }

  &:hover::before {
      opacity: 1;
  }

  @media (max-width: 768px) {
    &:hover::before {
      opacity: 0;
      transform: scale(1);
    }
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
  position: relative;
  will-change: text-shadow;

  &:hover {
    color: var(--color-primary-700);
    transform: translateY(-1px);
    animation: ${glitchEffect} 0.8s infinite alternate;
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
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 10;

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

    &.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
`;

// Le LinkIllustration est maintenu car il était utilisé dans StyledNavLink précédemment
// Même si le lien Contact est supprimé, cette définition peut rester si vous prévoyez de l'utiliser ailleurs
// ou si vous voulez la garder pour référence pour d'autres liens futurs avec illustration.
const LinkIllustration = styled(motion.span)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '🌿'; /* Exemple, l'emoji était '✨' pour Contact */
    font-size: var(--text-xl);
    opacity: 0;
    transform: scale(0);
    transition: none;
    position: absolute;
    color: var(--soft-green-600); /* Couleur ajustée si vous utilisez cet emoji */
  }
`;


export const StyledNavLink = styled(NavLink)`
  position: relative;
  text-decoration: none;
  color: var(--color-neutral-700);
  font-weight: var(--font-medium);
  font-size: var(--text-base);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;

  background-color: var(--color-neutral-100);
  box-shadow: var(--shadow-xs);
  z-index: 1;

  & > span {
    position: relative;
    z-index: 2;
    color: inherit;
    transition: color var(--transition-base);
    ${({ hasNotificationBadge }) => hasNotificationBadge && css`
      margin-right: 16px;
    `}
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.4) 25%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.4) 75%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: translateX(-100%) skewX(-30deg);
    z-index: 1;
    pointer-events: none;
  }

  &:hover::before {
    animation: ${glossyShine} 0.8s ease-in-out forwards;
  }

  &:hover {
    color: var(--color-neutral-800);
    background-color: rgba(34, 197, 94, 0.15);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-primary-500), 0 0 0 4px rgba(34, 197, 94, 0.2);
  }

  &.activeLink {
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
    z-index: 2;
  }

  ${({ index }) => css`
    animation: ${fadeIn} 0.6s ease-out forwards;
    animation-delay: ${0.1 + (index * 0.1)}s;
  `}

  ${({ $hasIllustration }) => $hasIllustration && css`
    ${LinkIllustration} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 0;

      &::before {
        content: '✨';
        font-size: var(--text-xl);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        opacity: 0;
        transition: none;
        color: var(--accent-orange);
      }
    }

    &:hover ${LinkIllustration}::before {
      animation: ${popInAndRotate} 0.5s ease-out forwards;
      animation-delay: 0.1s;
    }
  `}

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: var(--space-4);
    border-radius: var(--radius-xl);
  }
`;

export const MenuToggle = styled.button`
  display: none;
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
    display: flex;
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
  top: 6px;
  right: 6px;
  width: 12px;
  height: 12px;
  background: var(--color-error);
  border-radius: var(--radius-full);
  border: 2px solid white;
  animation: ${pulse} 2s infinite;
  z-index: 3;
`;

// NOUVEAU: Styled Component pour le bouton de déconnexion
export const LogoutButton = styled(motion.button)`
  position: relative;
  text-decoration: none;
  color: var(--color-error);
  font-weight: var(--font-medium);
  font-size: var(--text-base);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  border: none;
  background-color: var(--color-neutral-100);
  box-shadow: var(--shadow-xs);
  z-index: 1;

  & > span {
    position: relative;
    z-index: 2;
    color: inherit;
    transition: color var(--transition-base);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.4) 25%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.4) 75%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: translateX(-100%) skewX(-30deg);
    z-index: 1;
    pointer-events: none;
  }

  &:hover::before {
    animation: ${glossyShine} 0.8s ease-in-out forwards;
  }

  &:hover {
    color: var(--color-error-dark);
    background-color: rgba(255, 0, 0, 0.1);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-error), 0 0 0 4px rgba(255, 0, 0, 0.2);
  }

  ${({ index }) => css`
    animation: ${fadeIn} 0.6s ease-out forwards;
    animation-delay: ${0.1 + (index * 0.1)}s;
  `}

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: var(--space-4);
    border-radius: var(--radius-xl);
  }
`;