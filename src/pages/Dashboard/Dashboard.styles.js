// src/pages/Dashboard/Dashboard.styles.js
import styled from 'styled-components';
import { motion } from 'framer-motion';

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
  transform: rotate(${(Math.random() - 0.5) * 1}deg); /* Légère inclinaison aléatoire */
`;

export const DashboardTitle = styled.h2`
  text-align: center;
  margin-bottom: var(--space-6);
  color: var(--color-primary-800);
  font-size: var(--text-3xl);
  text-shadow: var(--shadow-text-sm);
`;

export const AddRecipeToggleCard = styled(Card)`
  cursor: pointer;
  background: var(--gradient-secondary); /* Un beau dégradé pour la carte "Ajouter" */
  color: var(--color-neutral-0);
  text-align: center;
  padding: var(--space-8); /* Plus de padding pour la rendre plus "chaleureuse" */
  transition: all var(--transition-base);

  // Inclinaison initiale et effet de redressement pour le survol
  transform: rotate(-3deg); /* Plus prononcé */
  border: 4px solid var(--color-primary-500); /* Bordure épaisse et contrastée */

  &:hover {
    transform: scale(1.03) rotate(0deg); /* Se redresse et grossit légèrement au survol */
    box-shadow: var(--shadow-2xl); /* Ombre encore plus intense au survol */
    background: var(--gradient-primary); /* Change de gradient au survol */
    border-color: var(--color-secondary-700); /* Changement de couleur de bordure au survol */
  }

  h3 {
    color: var(--color-neutral-0);
    margin-top: 0;
    margin-bottom: var(--space-4);
    font-size: var(--text-2xl);
    text-shadow: var(--shadow-text-md);
  }

  .add-icon {
    font-size: var(--text-6xl); /* Très grande taille pour le '+' */
    line-height: 1;
    text-shadow: var(--shadow-text-lg);
    display: inline-block;
    transition: transform var(--transition-fast);
  }

  &:hover .add-icon {
    transform: rotate(90deg) scale(1.1); /* Tourne et grossit au survol */
  }
`;

// Tu auras peut-être aussi besoin de ces styles s'ils sont utilisés ailleurs dans ton dashboard
// Je les garde ici pour le cas où tu en aurais besoin dans les composants importés
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

export const CloseButton = styled(motion.button)`
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  background: none;
  border: none;
  font-size: var(--text-2xl);
  color: var(--color-neutral-500);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);

  &:hover {
    color: var(--color-error);
    background-color: var(--color-neutral-100);
    transform: rotate(90deg);
  }
`;

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