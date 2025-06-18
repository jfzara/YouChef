// src/components/Navbar.jsx
import React, { useState } from 'react'; // Importer useState
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

// --- Styled Components (restent globalement les mêmes) ---
// Vos StyledNavContainer et NavItem restent comme précédemment pour le responsive.
// Les modifications spécifiques au comportement viendront des props de Framer Motion.

const StyledNavContainer = styled(motion.nav)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 1000;
  padding: var(--space-4);

  @media (max-width: 768px) {
    height: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: var(--space-3) var(--space-2);
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
    border-top-left-radius: var(--radius-lg);
    border-top-right-radius: var(--radius-lg);
    pointer-events: auto; /* Réactive les événements sur le conteneur mobile */
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
  pointer-events: auto;
  white-space: nowrap;
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
    position: static !important;
    top: auto !important;
    left: auto !important;
    right: auto !important;
    bottom: auto !important;
    transform: none !important;
    font-size: var(--text-base);
    padding: var(--space-2);
    text-align: center;
    flex: 1;
    min-width: 0;
  }
`;

// --- Composant Navbar ---

const Navbar = () => {
  const { token, logout } = useAuth();
  // État pour suivre l'élément survolé/focus
  const [hoveredItem, setHoveredItem] = useState(null);

  // Variantes d'animation pour Framer Motion
  const navVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    // État initial (quand rien n'est survolé)
    idle: (custom) => ({
      y: custom.initialY, // Position verticale de base avec un petit décalage aléatoire
      x: custom.initialX, // Position horizontale de base avec un petit décalage aléatoire
      opacity: 0.8,       // Légèrement estompé au repos
      scale: 1,
      rotate: custom.rotate,
      transition: {
        duration: 2 + Math.random() * 2, // Durée aléatoire pour un mouvement "nuageux"
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: Math.random() * 0.5 // Petit délai initial aléatoire
      }
    }),
    // État d'apparition (une fois au chargement)
    hidden: { y: -20, opacity: 0 },
    visible: (custom) => ({
      y: custom.initialY,
      x: custom.initialX,
      opacity: 0.8, // Apparaît à 0.8
      scale: 1,
      transition: {
        type: "spring", stiffness: 100, damping: 20, // Douce animation d'apparition
        duration: 0.8,
        delay: custom.delay // Utilise le delay défini par staggerChildren
      }
    }),
    // État au survol/focus
    hoverFocus: (custom) => ({
      scale: 1.2, // Agrandissement un peu plus prononcé
      rotate: custom.rotate * 1.5, // Rotation accentuée
      x: custom.xOffset,     // Décalage personnalisé (sort de sa position de base)
      y: custom.yOffset,
      opacity: 1, // Devient pleinement opaque
      transition: { type: "spring", stiffness: 300, damping: 15 } // Animation vive
    }),
    // État des éléments non survolés quand un autre est survolé
    otherHovered: (custom) => ({
      opacity: 0.1, // Devient très translucide
      scale: 0.95, // Rétrécit légèrement
      x: custom.initialX * 0.9, // Recule un peu sur l'axe X
      y: custom.initialY * 0.9, // Recule un peu sur l'axe Y
      transition: { duration: 0.4, ease: "easeOut" } // Transition douce mais vive
    }),
  };

  const navLinks = [
    // Nous ajoutons 'id' pour identifier les liens, c'est plus robuste que le nom pour key et hover
    { id: 'accueil', name: "Accueil", path: "/", x: "15%", y: "15%", rotate: -2, initialX: 0, initialY: 0, xOffset: 30, yOffset: 15 },
    { id: 'recettes', name: "Recettes", path: "/recettes", x: "75%", y: "20%", rotate: 3, initialX: 0, initialY: 0, xOffset: -30, yOffset: 20 },
    ...(token ? [{ id: 'dashboard', name: "Dashboard", path: "/dashboard", x: "10%", y: "80%", rotate: 0, initialX: 0, initialY: 0, xOffset: 25, yOffset: -15 }] : []),
    ...(token ?
        [{ id: 'deconnexion', name: "Déconnexion", path: "#", onClick: logout, x: "70%", y: "85%", rotate: 5, initialX: 0, initialY: 0, xOffset: -25, yOffset: -20 }]
        :
        [
          { id: 'connexion', name: "Connexion", path: "/connexion", x: "60%", y: "5%", rotate: -5, initialX: 0, initialY: 0, xOffset: -20, yOffset: 10 },
          { id: 'inscription', name: "Inscription", path: "/inscription", x: "40%", y: "90%", rotate: 8, initialX: 0, initialY: 0, xOffset: 25, yOffset: -10 }
        ]
    ),
  ];

  // Randomiser les positions initiales pour l'effet de "nuage"
  // et les petites variations de mouvement au repos.
  // Pour éviter des débordements, on garde les x/y d'origine pour le style absolu.
  // Les initialX/initialY sont des décalages pour le mouvement "idle".
  const processedNavLinks = navLinks.map(link => ({
    ...link,
    initialX: (Math.random() - 0.5) * 10, // Petit décalage aléatoire entre -5 et 5px
    initialY: (Math.random() - 0.5) * 10, // Petit décalage aléatoire entre -5 et 5px
  }));


  return (
    <StyledNavContainer
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      {/* eslint-disable-next-line no-unused-vars */}
      {processedNavLinks.map((link, index) => (
        <NavLink
          key={link.id} // Utilisez l'ID unique pour la clé
          to={link.path}
          onClick={link.onClick}
          // Appliquer le style de positionnement absolu pour desktop
          style={{ position: 'absolute', top: link.y, left: link.x }}
          onMouseEnter={() => setHoveredItem(link.id)} // Quand la souris entre
          onMouseLeave={() => setHoveredItem(null)}   // Quand la souris sort
          onFocus={() => setHoveredItem(link.id)}     // Pour l'accessibilité clavier
          onBlur={() => setHoveredItem(null)}         // Pour l'accessibilité clavier
        >
          <NavItem
            variants={itemVariants}
            custom={link} // Passer toutes les propriétés 'link' comme custom prop
            animate={hoveredItem === link.id ? "hoverFocus" : (hoveredItem !== null ? "otherHovered" : "idle")}
          >
            {link.name}
          </NavItem>
        </NavLink>
      ))}
    </StyledNavContainer>
  );
};

export default Navbar;