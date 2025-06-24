// src/pages/Dashboard/Dashboard.styles.js
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const RecipeImage = styled.img`
  width: 100%;
  height: 150px; /* Hauteur fixe pour uniformité */
  object-fit: cover; /* Recadre l'image pour couvrir l'espace */
  border-radius: var(--radius-md); /* Bords arrondis pour l'image */
  margin-bottom: var(--space-3); /* Espace sous l'image */
`;

export const DashboardContainer = styled(motion.div)`
  padding: var(--space-8);
  padding-top: calc(var(--navbar-height) + var(--space-8)); /* Ajustement pour la navbar */
  min-height: 100vh;
  position: relative;
  overflow: hidden; /* Empêche le contenu de déborder avec les animations bancales */

  @media (max-width: 768px) {
    padding: var(--space-4);
    padding-top: calc(var(--navbar-height) + var(--space-4));
  }
`;

export const WelcomeSection = styled(motion.div)`
  text-align: center;
  margin-bottom: var(--space-8);
  color: var(--color-neutral-800);

  h1 {
    font-size: var(--text-5xl);
    color: var(--color-primary-700);
    text-shadow: var(--shadow-text-md); /* Ombre de texte subtile */

    @media (max-width: 768px) {
      font-size: var(--text-4xl);
    }
  }

  p {
    font-size: var(--text-lg);
    margin-top: var(--space-4);
    color: var(--color-neutral-700);
  }
`;

export const ContentGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 2fr 1fr; /* Plus d'espace pour les recettes */
  gap: var(--space-8);
  align-items: start; /* Alignement en haut des colonnes */

  @media (max-width: 992px) {
    grid-template-columns: 1fr; /* Une seule colonne sur les petits écrans */
  }
`;

export const MainContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
`;

export const SidebarContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: var(--space-8);

  @media (max-width: 992px) {
    order: -1; /* Place la sidebar au-dessus sur mobile */
  }
`;

export const Card = styled(motion.div)`
  background: var(--color-neutral-0); /* Blanc pur pour l'opacité maximale */
  border-radius: var(--radius-2xl); /* Bords plus arrondis pour un aspect plus doux */
  padding: var(--space-6);
  box-shadow: var(--shadow-xl); /* Ombre plus prononcée */
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  position: relative;
  overflow: hidden; /* Pour gérer les débordements des animations internes */
  border: 4px solid var(--color-secondary-500); /* Bordure épaisse et criarde */
  transform: rotate(${(Math.random() - 0.5) * 2}deg); /* Légère inclinaison aléatoire sur toutes les cartes */
`;

export const DashboardTitle = styled.h2`
  text-align: center;
  margin-bottom: var(--space-6);
  color: var(--color-primary-800);
  font-size: var(--text-3xl);
  text-shadow: var(--shadow-text-sm);
`;

export const AddRecipeToggleCard = styled(motion.button)` /* Changé en motion.button */
  background: var(--color-accent-blue); /* Nouvelle couleur qui se détache du jaune */
  color: var(--color-neutral-0); /* Texte blanc */
  border: 4px solid var(--color-accent-blue-dark); /* Bordure épaisse qui ressort */
  border-radius: var(--radius-2xl); /* Bouton rond, ou radius-2xl pour une carte-bouton */
  padding: var(--space-6) var(--space-6); /* Plus de padding pour le rendre imposant */
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  cursor: pointer;
  transition: all var(--transition-base); /* Transition plus longue pour le hover */
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column; /* Pour empiler titre et icône */
  align-items: center;
  justify-content: center;
  gap: var(--space-2); /* Espace entre l'icône et le texte */
  text-transform: uppercase; /* Texte en majuscules pour plus d'impact */
  letter-spacing: 1px; /* Espacement des lettres */
  overflow: hidden;
  position: relative;
  z-index: 1;
  text-align: center;
  min-height: 180px; /* Hauteur minimale pour que ce soit bien visible */
  transform: rotate(-5deg); /* Inclinaison initiale plus prononcée */

  &:before {
    content: '✨'; /* Un petit éclat fun */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    font-size: var(--text-5xl); /* Plus grand */
    opacity: 0;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Rebondissant */
    z-index: -1;
    pointer-events: none; /* Ne doit pas interférer avec le clic */
  }

  &:hover {
    background: var(--color-accent-blue-dark); /* Changement de dégradé au survol */
    box-shadow: var(--shadow-xl); /* Ombre plus prononcée */
    transform: translateY(-5px) rotate(0deg) scale(1.02); /* Léger saut, se redresse et grossit */
    border-color: var(--color-accent-blue-light); /* Changement de couleur de bordure */

    &:before {
      transform: translate(-50%, -50%) scale(1.5); /* L'éclat grossit et devient visible */
      opacity: 1;
      transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
  }

  &:active {
    transform: translateY(0) rotate(0deg) scale(0.98); /* Retour à la normale au clic, léger rétrécissement */
    box-shadow: var(--shadow-sm);
  }

  h3 {
    color: var(--color-neutral-0);
    margin-top: 0;
    margin-bottom: var(--space-4);
    font-size: var(--text-2xl);
    text-shadow: var(--shadow-text-md);
    line-height: 1.2;
  }

  .add-icon {
    font-size: var(--text-7xl); /* Très grande taille pour le '+' */
    line-height: 1;
    text-shadow: var(--shadow-text-lg);
    display: inline-block;
    transition: transform 0.3s ease-out;
  }

  &:hover .add-icon {
    transform: rotate(180deg) scale(1.2); /* Tourne complètement et grossit au survol */
  }
`;

export const FormGroup = styled.div`
  margin-bottom: var(--space-4);
  width: 100%;

  label {
    display: block;
    font-weight: var(--font-medium);
    margin-bottom: var(--space-2);
    color: var(--color-neutral-700);
    font-size: var(--text-sm);
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  textarea {
    width: 100%;
    padding: var(--space-3);
    border: 1px solid var(--color-neutral-300);
    border-radius: var(--radius-md);
    font-family: var(--font-family-sans);
    font-size: var(--text-base);
    color: var(--color-neutral-800);
    background-color: var(--color-neutral-50);
    transition: all var(--transition-base);

    &:focus {
      outline: none;
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 2px var(--color-primary-100);
    }
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;

export const Button = styled(motion.button)`
  background: var(--gradient-primary);
  color: white;
  padding: var(--space-3) var(--space-5);
  border: none;
  border-radius: var(--radius-lg);
  font-family: var(--font-family-heading);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);
  margin-top: var(--space-2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    filter: brightness(1.05);
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  &:disabled {
    background: var(--color-neutral-300);
    cursor: not-allowed;
    filter: none;
    transform: none;
    box-shadow: var(--shadow-sm);
  }
`;

export const StatusMessage = styled(motion.p)`
  padding: var(--space-3);
  border-radius: var(--radius-md);
  margin-top: var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  text-align: center;

  &.success {
    background-color: var(--color-success-light);
    color: var(--color-success-dark);
    border: 1px solid var(--color-success);
  }

  &.error {
    background-color: var(--color-error-light);
    color: var(--color-error-dark);
    border: 1px solid var(--color-error);
  }
`;

// Ces styles de modale ne sont plus utilisés car RecipeFormModal définit les siens.
// Je les laisse commentés au cas où vous les utiliseriez ailleurs.
/*
export const AddRecipeModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal);
  padding: var(--space-4);
`;

export const AddRecipeModalContent = styled(motion.div)`
  background: var(--color-neutral-0);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-2xl);
  max-width: 600px;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    padding: var(--space-6);
  }
`;
*/

// La seule et unique CloseButton pour les modals, maintenant définie dans RecipeFormModal.jsx
// export const CloseButton = styled(motion.button)`...`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
`;

export const StatCard = styled(Card)`
  text-align: center;
  padding: var(--space-5);
  background: var(--color-neutral-50);
  box-shadow: var(--shadow-md);

  h3 {
    font-family: var(--font-family-heading);
    font-size: var(--text-4xl);
    color: var(--color-primary-600);
    margin-bottom: var(--space-2);
  }

  p {
    font-size: var(--text-lg);
    color: var(--color-neutral-700);
    margin: 0;
  }
`;

export const RecentRecipesSection = styled.div`
  margin-top: var(--space-8);
`;

export const RecipeList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
`;

export const RecipeListItem = styled(motion.li)`
  background: var(--color-neutral-0);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
  }

  h4 {
    font-family: var(--font-family-heading);
    font-size: var(--text-xl);
    color: var(--color-primary-700);
    margin: 0;
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-neutral-600);
    margin: 0;
  }

  span {
    font-size: var(--text-xs);
    color: var(--color-neutral-500);
    align-self: flex-end;
  }
`;