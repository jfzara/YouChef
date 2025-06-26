import React from 'react';
import { motion } from 'framer-motion'; // motion vient de framer-motion
import styled, { keyframes } from 'styled-components'; // keyframes vient de styled-components

// --- Keyframes pour les animations des boutons ---
// AUCUN MATH.RANDOM() N'EST UTILISÉ DANS LES DÉFINITIONS DES KEYFRAMES.
// C'est ce qui cause le TypeError.
const bounceAndWiggle = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-3px) rotate(1deg); }
  50% { transform: translateY(0) rotate(-1deg); }
  75% { transform: translateY(-1px) rotate(0.5deg); }
`;

// Toutes les valeurs de transformation sont fixes ici.
const glitchEffect = keyframes`
  0% { transform: scale(1.2) translateY(-10px) rotate(0deg) translateX(0px); filter: hue-rotate(0deg); }
  20% { transform: scale(1.2) translateY(-10px) rotate(3deg) translateX(3px) skewX(3deg); filter: hue-rotate(8deg); }
  40% { transform: scale(1.2) translateY(-10px) rotate(-2deg) translateX(-4px) skewX(-2deg); filter: hue-rotate(0deg); }
  60% { transform: scale(1.2) translateY(-10px) rotate(1deg) translateX(2px) skewX(2deg); filter: hue-rotate(4deg); }
  80% { transform: scale(1.2) translateY(-10px) rotate(-3deg) translateX(-3px) skewX(-3deg); filter: hue-rotate(0deg); }
  100% { transform: scale(1.2) translateY(-10px) rotate(0deg) translateX(0px); filter: hue-rotate(0deg); }
`;

const pulseBorder = keyframes`
  0% { border-color: var(--color-bright-pink-crayola); }
  50% { border-color: var(--color-dark-purple); }
  100% { border-color: var(--color-bright-pink-crayola); }
`;

const hoverWiggle = keyframes`
  0%, 100% { transform: translateY(0) scale(1.1) rotate(0deg); }
  25% { transform: translateY(-5px) scale(1.2) rotate(3deg); }
  50% { transform: translateY(0) scale(1.1) rotate(-3deg); }
  75% { transform: translateY(-2px) scale(1.15) rotate(1deg); }
`;

// --- Styled Component NavButton ---
const StyledNavButton = styled(motion.button)`
  background: var(--color-bright-pink-crayola);
  color: var(--color-neutral-0);
  border: 3px solid var(--color-bright-pink-crayola);
  border-radius: var(--radius-full);
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: var(--font-bold);
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  /* Ceci est une propriété de style directe, donc Math.random() peut être utilisé.
     Il sera évalué une fois lors du rendu initial du composant. */
  transform: rotate(${(Math.random() - 0.5) * 8}deg); 
  text-shadow: var(--shadow-text-sm);
  outline: none;
  position: relative;
  overflow: hidden;
  z-index: 1;
  font-family: 'Comic Sans MS', cursive;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--text-3xl);
    line-height: 1;
    position: relative;
    top: -3px;
    z-index: 2;
    transform: translateY(-2px);
    transition: transform 0.2s ease-out;
  }

  span.occasional-wiggle {
    animation: ${bounceAndWiggle} 2s infinite ease-in-out;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0%;
    height: 0%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.4s ease-out, opacity 0.4s ease-out;
    opacity: 0;
    z-index: -1;
  }

  &:hover {
    background: var(--color-salmon);
    border-color: var(--color-bright-pink-crayola);
    /* La rotation aléatoire au hover est également une propriété de style directe. */
    transform: scale(1.2) translateY(-10px) rotate(${(Math.random() - 0.5) * -18}deg);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
    /* Les animations ici ne posent pas problème car les keyframes sont statiques. */
    animation: ${glitchEffect} 0.4s 1 alternate, ${pulseBorder} 1s 1 alternate;
    
    span {
      animation: ${hoverWiggle} 0.8s 1 ease-in-out;
      transform: translateY(-2px) scale(1.1);
    }

    &::before {
      transform: translate(-50%, -50%) scale(2);
      opacity: 1;
    }
  }

  &:active {
    background: var(--color-bright-pink-crayola);
    /* La rotation aléatoire au clic est également une propriété de style directe. */
    transform: scale(0.85) translateY(2px) rotate(${(Math.random() - 0.5) * 5}deg);
    box-shadow: var(--shadow-sm);
    animation: none;
  }

  &:disabled {
    background: var(--color-neutral-300);
    color: var(--color-neutral-500);
    border-color: var(--color-neutral-400);
    cursor: not-allowed;
    box-shadow: var(--shadow-sm);
    transform: none;
    animation: none;
    pointer-events: none;
    opacity: 0.7;
    
    span {
      animation: none;
      transform: translateY(-2px);
    }
  }
`;

const NavButton = ({ children, className, onClick, ...props }) => {
  return (
    <StyledNavButton onClick={onClick} {...props}>
      <span className={className}>{children}</span>
    </StyledNavButton>
  );
};
