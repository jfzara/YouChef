// src/pages/Dashboard/Dashboard.styles.js

import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- New Keyframes for Modal Effect ---
const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const slideInTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// --- Existing Styled Components (if any, ensure they are here) ---
export const DashboardContainer = styled(motion.div)`
  padding: var(--space-8);
  max-width: 1200px;
  margin: var(--space-8) auto;
  min-height: calc(100vh - var(--navbar-height) - var(--footer-height, 0px)); // Adjust as needed
  display: flex;
  flex-direction: column;
  gap: var(--space-8);

  @media (max-width: 768px) {
    padding: var(--space-6);
  }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
`;

export const Card = styled(motion.div)`
  background: var(--color-neutral-0);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-items: flex-start; // Align content to the start
  position: relative;
  overflow: hidden; // Ensures nothing spills out during animations

  // Add subtle texture or background for fun
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.15' fill-rule='evenodd'%3E%3Cpath d='M0 0h3v3H0V0zm3 3h3v3H3V3z'/%3E%3C/g%3E%3C/svg%3E");
`;

export const SectionTitle = styled.h2`
  font-family: var(--font-family-heading);
  font-size: var(--text-2xl);
  color: var(--color-primary-700);
  margin-bottom: var(--space-4);
  text-shadow: var(--shadow-text-sm); // Using your new text shadow variable if defined
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

// --- New Styled Components for the Add Recipe Modal/Collapsible Effect ---

export const AddRecipeToggleCard = styled(Card)`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 150px; // Ensure it's big enough to click

  &:hover {
    background: var(--color-primary-50);
    transform: scale(1.02);
    box-shadow: var(--shadow-xl);
  }

  h2 {
    color: var(--color-primary-600);
    font-size: var(--text-2xl);
    transition: all var(--transition-base);
  }

  &:hover h2 {
    color: var(--color-primary-700);
  }
`;

export const AddRecipeModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6); // Semi-transparent dark background
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal); // Make sure it's above everything
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
  animation: ${fadeInScale} 0.4s ease-out forwards; // Apply the animation here

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
  background: var(--color-neutral-50); // Lighter background for stats
  box-shadow: var(--shadow-md);

  h3 {
    font-family: var(--font-family-heading);
    font-size: var(--text-4xl); // Larger for the number
    color: var(--color-primary-600);
    margin-bottom: var(--space-2);
  }

  p {
    font-size: var(--text-lg); // Clear description
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