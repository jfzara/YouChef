// src/components/Navbar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

// --- Styled Components pour les éléments de la Navbar ---

// Conteneur principal de la Navbar.
// Il s'agit d'une bande qui change d'orientation et de position selon la taille de l'écran.
const StyledNavContainer = styled(motion.nav)`
  position: fixed; /* Reste visible même en scrollant */
  top: 0;
  left: 0;
  height: 100vh; /* Prend toute la hauteur sur desktop */
  width: 100px; /* Largeur fixe de la bande sur desktop */
  background: linear-gradient(180deg, var(--soft-green-100), var(--soft-blue-100)); /* Dégradé doux vertical */
  padding: var(--space-4) var(--space-2); /* Padding interne */
  display: flex;
  flex-direction: column; /* Les liens s'empilent verticalement sur desktop */
  align-items: center; /* Centre les éléments horizontalement dans la bande */
  justify-content: flex-start; /* Aligne les éléments en haut */
  gap: var(--space-6); /* Espacement entre les liens */
  z-index: 1000; /* Assure que la navbar est au-dessus du contenu */
  box-shadow: 2px 0 10px rgba(0,0,0,0.05); /* Petite ombre latérale pour la profondeur (plate) */

  /* Media Query pour les écrans mobiles (max-width: 768px) */
  @media (max-width: 768px) {
    width: 100vw; /* Prend toute la largeur sur mobile */
    height: 70px; /* Hauteur fixe de la bande sur mobile */
    bottom: 0; /* Se positionne en bas de l'écran */
    top: auto; /* Annule la position 'top' pour mobile */
    left: 0; /* S'aligne à gauche */
    right: 0; /* S'aligne à droite */
    flex-direction: row; /* Les liens s'alignent horizontalement sur mobile */
    justify-content: space-around; /* Distribue les liens uniformément */
    align-items: center; /* Centre les éléments verticalement */
    padding: var(--space-2); /* Padding réduit pour mobile */
    background: linear-gradient(90deg, var(--soft-green-100), var(--soft-blue-100)); /* Dégradé doux horizontal */
    box-shadow: 0 -2px 10px rgba(0,0,0,0.05); /* Ombre vers le haut */
    border-top-left-radius: var(--radius-lg); /* Coins arrondis pour le bandeau du bas */
    border-top-right-radius: var(--radius-lg);
  }
`;

// Style de chaque élément de navigation (lien individuel).
const NavItem = styled(motion.div)`
  font-family: var(--font-display); /* Utilise la police fantaisiste pour le texte */
  font-size: var(--text-2xl); /* Taille généreuse pour une bonne lisibilité */
  color: var(--neutral-800); /* Couleur de texte par défaut */
  padding: var(--space-2) var(--space-3); /* Padding autour du texte */
  border-radius: var(--radius-lg); /* Coins arrondis pour un aspect doux */
  background-color: transparent; /* Fond transparent par défaut pour le lien */
  cursor: pointer;
  white-space: nowrap; /* Empêche le texte de se casser sur plusieurs lignes */
  display: flex; /* Utilise flexbox pour centrer contenu si nécessaire */
  align-items: center;
  justify-content: center;
  text-align: center; /* Assure le centrage du texte */
  position: relative; /* Nécessaire pour les pseudo-éléments ou débordements animés */
  overflow: hidden; /* Cache le débordement initial pour l'effet de "pop" */

  /* Effets au survol/focus */
  &:hover, &:focus-visible {
    color: var(--soft-green-800); /* Couleur de texte au survol */
    background-color: var(--soft-green-200); /* Fond léger au survol */
  }

  /* Style pour le lien actif */
  &.active {
    color: var(--soft-blue-900);
    background-color: var(--soft-blue-200);
    /* Optionnel: un petit indicateur de page active */
    &::after {
      content: '';
      position: absolute;
      bottom: -4px; /* Sous l'élément */
      left: 50%;
      transform: translateX(-50%);
      width: 80%;
      height: 3px;
      background-color: var(--soft-blue-500); /* Une ligne "dessinée" */
      border-radius: var(--radius-full);
    }
  }

  /* Media Query pour les éléments sur mobile */
  @media (max-width: 768px) {
    font-size: var(--text-lg); /* Taille de police plus petite sur mobile */
    padding: var(--space-2) var(--space-1); /* Padding réduit */
    /* Assure que l'indicateur actif s'adapte à la version horizontale */
    &.active::after {
      bottom: -2px; /* Ajuste la position pour le bandeau du bas */
      width: 60%;
    }
  }
`;

// --- Composant Navbar ---

const Navbar = () => {
  const { token, logout } = useAuth(); // Récupère le token et la fonction de déconnexion

  // Variantes d'animation Framer Motion pour l'apparition de la Navbar elle-même
  const navContainerVariants = {
    hidden: { x: -100, opacity: 0 }, // Part de la gauche, invisible
    visible: {
      x: 0, // Glisse en place
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: 0.2, // Délai après le chargement de la page
        when: "beforeChildren" // Apparaît avant les enfants (liens)
      }
    },
    // Variante pour mobile : la navbar glisse depuis le bas
    mobileHidden: { y: 100, opacity: 0 },
    mobileVisible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: 0.2,
        when: "beforeChildren"
      }
    }
  };

  // Variantes d'animation Framer Motion pour chaque NavItem (lien)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Les liens partent du bas (desktop)
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    // Effet de "débordement" ou de "gonflement" au survol/focus
    hover: {
      scale: 1.15, // Plus grand que d'habitude
      x: 10,       // Déborde légèrement vers la droite (pour navbar verticale)
      boxShadow: "0px 4px 15px rgba(0,0,0,0.1)", // Petite ombre sous l'élément gonflé
      transition: { type: "spring", stiffness: 400, damping: 20 }
    },
    // Effet de "débordement" pour mobile (gonfle vers le haut)
    mobileHover: {
      scale: 1.15,
      y: -5, // Déborde légèrement vers le haut
      boxShadow: "0px -4px 15px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 400, damping: 20 }
    }
  };

  // Liste des liens de navigation avec leurs propriétés
  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Recettes", path: "/recettes" },
    // Affiche "Dashboard" si l'utilisateur est connecté
    ...(token ? [{ name: "Dashboard", path: "/dashboard" }] : []),
    // Affiche "Déconnexion" si connecté, sinon "Connexion" et "Inscription"
    ...(token ?
        [{ name: "Déconnexion", path: "#", onClick: logout }]
        :
        [
          { name: "Connexion", path: "/connexion" },
          { name: "Inscription", path: "/inscription" }
        ]
    ),
  ];

  // Détecter si l'écran est mobile pour choisir les bonnes variantes d'animation
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  return (
    <StyledNavContainer
      // Choisir la variante d'apparition de la navbar en fonction de la taille de l'écran
      variants={isMobile ? navContainerVariants.mobileHidden : navContainerVariants.hidden}
      initial={isMobile ? "mobileHidden" : "hidden"}
      animate={isMobile ? "mobileVisible" : "visible"}
    >
      {navLinks.map((link) => (
        // Utilisation de NavLink de react-router-dom pour gérer l'état actif et la navigation
        <NavLink
          key={link.name} /* key est crucial pour React, link.name doit être unique */
          to={link.path}
          onClick={link.onClick}
        >
          <NavItem
            // Animer chaque NavItem lors de l'apparition et au survol
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            // Choisir la variante de survol en fonction de la taille de l'écran
            whileHover={isMobile ? "mobileHover" : "hover"}
            whileTap={isMobile ? "mobileHover" : "hover"} // Un léger feedback au tap sur mobile
            custom={link} // Passer des props personnalisées si besoin dans les variantes (non utilisé ici directement, mais bonne pratique)
          >
            {link.name}
          </NavItem>
        </NavLink>
      ))}
    </StyledNavContainer>
  );
};

export default Navbar;