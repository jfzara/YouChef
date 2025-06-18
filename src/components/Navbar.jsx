// src/components/Navbar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom'; // Utilisez NavLink pour le style actif si besoin
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext'; // Pour gérer le lien de déconnexion

// --- Styled Components pour les éléments de la Navbar ---

// Le conteneur principal de la navbar.
// Nous allons le positionner en absolu ou fixe pour qu'il "flotte"
// et laisser le contenu de la page s'écouler en dessous.
const StyledNavContainer = styled(motion.nav)`
  position: absolute; /* Permet un positionnement libre sans affecter le flux du document */
  top: 0;
  left: 0;
  width: 100%; /* Pour couvrir la largeur et pouvoir positionner les éléments à l'intérieur */
  height: 100vh; /* Pour couvrir la hauteur et avoir de l'espace pour disperser les liens */
  pointer-events: none; /* Par défaut, les événements de souris passent à travers */
  z-index: 1000; /* Assure que la navbar est au-dessus des autres contenus */
  display: flex; /* Utilisation de flexbox pour la disposition des liens (même si dispersés) */
  justify-content: space-between; /* Aide à la dispersion */
  align-items: flex-start; /* Aligne les éléments en haut */
  padding: var(--space-4); /* Un peu de padding global pour l'aération */
`;

// Style de chaque lien de navigation. C'est un motion.div pour les animations.
// Chaque lien est un élément interactif.
const NavItem = styled(motion.div)`
  font-family: var(--font-display); /* Utilise notre police fantaisiste */
  font-size: var(--text-2xl); /* Grande taille pour la visibilité des éléments dispersés */
  color: var(--neutral-800); /* Couleur de texte douce */
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full); /* Pour un aspect doux et organique, comme des bulles */
  background-color: var(--neutral-100); /* Un fond léger pour que les liens "ressortent" */
  cursor: pointer;
  pointer-events: auto; /* Réactive les événements de souris pour les liens individuels */
  white-space: nowrap; /* Empêche le texte de se casser sur plusieurs lignes */
  transition: background-color var(--transition-fast); /* Transition douce pour le fond */

  &:hover {
    background-color: var(--soft-green-100); /* Changement de couleur au survol pour feedback */
    color: var(--soft-green-800);
  }

  /* Styles spécifiques pour le lien actif de NavLink si désiré */
  &.active {
    background-color: var(--soft-blue-200); /* Exemple pour le lien actif */
    color: var(--soft-blue-900);
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
    // Nous allons utiliser 'position' pour simuler le "rapprochement"
    // Les valeurs de x et y seront ajustées pour chaque élément.
    hover: (custom) => ({
      scale: 1.1,
      rotate: custom.rotate, // Chaque item peut avoir une légère rotation différente
      x: custom.xOffset,     // Décalage personnalisé pour simuler le rapprochement
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
       {/* eslint-disable-next-line no-unused-vars */} {/* <-- Ajoutez cette ligne ici */}
      {navLinks.map((link, _index) => (
        <NavLink
          key={link.name}
          to={link.path}
          onClick={link.onClick}
          // Les styles de positionnement sont appliqués directement ici
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