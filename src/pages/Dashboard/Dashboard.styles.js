// src/pages/Dashboard/Dashboard.styles.js
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const DashboardContainer = styled(motion.div)`
  padding: var(--space-8) var(--space-6);
  max-width: 1200px;
  margin: var(--space-8) auto;
  background: var(--color-background-soft);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  text-align: center;
  position: relative;
  overflow: hidden;

  h1 {
    font-family: var(--font-family-heading);
    font-size: var(--text-4xl);
    color: var(--color-primary-700);
    margin-bottom: var(--space-8);
    position: relative;
    display: inline-block; /* Pour l'underline */

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: var(--gradient-primary);
      border-radius: var(--radius-full);
    }

    @media (max-width: 768px) {
      font-size: var(--text-3xl);
      margin-bottom: var(--space-6);
    }
  }

  @media (max-width: 768px) {
    padding: var(--space-6) var(--space-4);
    margin: var(--space-6) auto;
  }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-10);
  align-items: flex-start; /* Alignement en haut pour les cartes */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-family: var(--font-family-heading);
  font-size: var(--text-3xl);
  color: var(--color-neutral-800);
  margin-top: var(--space-10);
  margin-bottom: var(--space-6);
  text-align: left;
  border-bottom: 2px solid var(--color-neutral-200);
  padding-bottom: var(--space-3);

  @media (max-width: 768px) {
    font-size: var(--text-2xl);
    margin-top: var(--space-8);
    margin-bottom: var(--space-4);
    text-align: center;
  }
`;

export const Card = styled(motion.div)`
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  border: 1px solid var(--color-neutral-200);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl-hover);
    border-color: var(--color-primary-200);
  }
`;

export const FormGroup = styled.div`
  margin-bottom: var(--space-4);
  text-align: left;
  label {
    display: block;
    margin-bottom: var(--space-2);
    font-weight: var(--font-semibold);
    color: var(--color-neutral-700);
  }
  input, textarea, select {
    width: 100%;
    padding: var(--space-3);
    border: 1px solid var(--color-neutral-300);
    border-radius: var(--radius-md);
    font-size: var(--text-base);
    transition: all var(--transition-sm);
    &:focus {
      outline: none;
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1);
    }
  }
  textarea {
    min-height: 100px;
    resize: vertical;
  }
`;

export const Button = styled(motion.button)`
  background: var(--gradient-primary);
  color: white;
  padding: var(--space-3) var(--space-6);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
    opacity: 0.95;
  }

  &:disabled {
    background: var(--color-neutral-400);
    cursor: not-allowed;
    box-shadow: none;
  }
`;

// Styles pour les messages de statut (succès/erreur)
export const StatusMessage = styled(motion.div)`
  padding: var(--space-3);
  border-radius: var(--radius-md);
  margin-top: var(--space-4);
  font-weight: var(--font-medium);
  text-align: center;

  &.success {
    background-color: var(--color-success-soft);
    color: var(--color-success-dark);
    border: 1px solid var(--color-success-light);
  }

  &.error {
    background-color: var(--color-error-soft);
    color: var(--color-error-dark);
    border: 1px solid var(--color-error-light);
  }
`;