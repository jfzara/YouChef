Absolument ! Voici le code de votre Navbar.jsx avec toutes les modifications que nous avons discutées pour le responsive design, incluant la correction pour l'avertissement no-unused-vars et les ajustements de styles pour mobile.

J'ai intégré les media queries directement dans les styled components StyledNavContainer et NavItem pour une adaptation fluide.

JavaScript

// src/components/Navbar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext'; // Pour gérer le lien de déconnexion

// --- Styled Components pour les éléments de la Navbar ---

const StyledNavContainer = styled(motion.nav)`
  position: absolute; /* Par défaut, positionnement absolu pour le desktop */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* Permet la dispersion des liens sur toute la hauteur du viewport */
  pointer-events: none; /* Les événements de souris passent à travers le conteneur */
  z-index: 1000;
  padding: var(--space-4); /* Espacement général */

  @media (max-width: 768px) {
    height: auto; /* La hauteur s'adapte au contenu sur mobile */
    position: fixed; /* La navbar reste en bas de l'écran lors du défilement */
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex; /* Utilise flexbox pour une disposition horizontale */
    justify-content: space-around; /* Distribue les liens horizontalement */
    align-items: center;
    padding: var(--space-3) var(--space-2); /* Padding réduit pour mobile */
    background-color: rgba(255, 255, 255, 0.9); /* Fond semi-transparent pour le bandeau */
    box-shadow: 0 -2px 10px rgba(0,0,0,0.05); /* Ombre subtile vers le haut */
    border-top-left-radius: var(--radius-lg); /* Coins arrondis en haut */
    border-top-right-radius: var(--radius-lg);
    pointer-events: auto; /* Réactive les événements de souris pour le conteneur mobile */
  }
`;

const NavItem = styled(motion.div)`
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--neutral-800);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  background-color: var(--neutral-100);
  cursor: pointer;
  pointer-events: auto; /* Réactive les événements de souris pour les liens individuels */
  white-space: nowrap; /* Empêche le texte de se casser sur plusieurs lignes */
  transition: background-color var(--transition-fast), color var(--transition-fast);

  &:hover {
    background-color: var(--soft-green-100);
    color: var(--soft-green-800);
  }

  &.active {
    background-color: var(--soft-blue-200);
    color: var(--soft-blue-900);
  }

  @media (max-width: 768px) {
    position: static !important; /* Force le positionnement statique sur mobile, annulant l'inline style */
    top: auto !important;         /* Annule les propriétés top/left/right/bottom */
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    transform: none !important;   /* Annule toute transformation (comme le whileHover) pour la disposition fixe */
    font-size: var(--text-base); /* Taille de police plus petite */
    padding: var(--space-2);     /* Padding réduit */
    text-align: center;          /* Centrer le texte dans chaque NavItem */
    flex: 1;                     /* Permet aux éléments de prendre une largeur égale dans le flexbox parent */
    min-width: 0;                /* Permet aux éléments de rétrécir si le contenu est long */
  }
`;

// --- Composant Navbar ---

const Navbar = () => {
  const { token, logout } = useAuth(); // Récupère le token et la fonction de déconnexion

  // Variantes d'animation pour Framer Motion
  const navVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Les enfants apparaissent un par un
        delayChildren: 0.5,    // Délai avant que les enfants commencent à apparaître
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    // Animation au survol pour l'effet de "rapprochement" / fantaisie
    hover: (custom) => ({
      scale: 1.1,
      rotate: custom.rotate,
      x: custom.xOffset,
      y: custom.yOffset,
      transition: { type: "spring", stiffness: 300, damping: 10 }
    }),
  };

  // Configuration des liens avec des positions et des animations personnalisées
  const navLinks = [
    { name: "Accueil", path: "/", x: "5%", y: "5%", rotate: -2, xOffset: 20, yOffset: 10 },
    { name: "Recettes", path: "/recettes", x: "85%", y: "10%", rotate: 3, xOffset: -20, yOffset: 15 },
    // Le Dashboard n'apparaît que si l'utilisateur est connecté
    ...(token ? [{ name: "Dashboard", path: "/dashboard", x: "5%", y: "90%", rotate: 0, xOffset: 15, yOffset: -10 }] : []),
    ...(token ? // Si connecté, un bouton de déconnexion
        [{ name: "Déconnexion", path: "#", onClick: logout, x: "80%", y: "90%", rotate: 5, xOffset: -10, yOffset: -15 }]
        : // Si non connecté, les liens de connexion/inscription
        [
          { name: "Connexion", path: "/connexion", x: "70%", y: "2%", rotate: -5, xOffset: -20, yOffset: 5 },
          { name: "Inscription", path: "/inscription", x: "50%", y: "95%", rotate: 8, xOffset: 20, yOffset: -5 }
        ]
    ),
  ];

  return (
    <StyledNavContainer
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      {/* eslint-disable-next-line no-unused-vars */}
      {navLinks.map((link, index) => ( // 'index' est laissé pour le contexte, mais non utilisé
        <NavLink
          key={link.name} // Utiliser link.name comme clé est OK si les noms sont uniques
          to={link.path}
          onClick={link.onClick}
          // Le style de positionnement absolu est appliqué ici.
          // Il sera overridden par `position: static !important` sur mobile via le media query dans NavItem.
          style={{ position: 'absolute', top: link.y, left: link.x }}
        >
          <NavItem
            variants={itemVariants}
            custom={{ rotate: link.rotate, xOffset: link.xOffset, yOffset: link.yOffset }}
            whileHover="hover"
          >
            {link.name}
          </NavItem>
        </NavLink>
      ))}
    </StyledNavContainer>
  );
};

export default Navbar;