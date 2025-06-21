// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

// 1. Importe ton fichier de police OTF ici
import ComicZineOTF from '../assets/fonts/comic_zine_ot.otf';


const GlobalStyles = createGlobalStyle`
  /* 2. Déclaration de la police "Comic Zine OT" */
  @font-face {
    font-family: 'Comic Zine OT'; /* Le nom que tu utiliseras dans ton CSS */
    src: url(${ComicZineOTF}) format('opentype'); /* Très important : utilise 'opentype' pour les fichiers .otf */
    font-weight: normal; /* Ou le poids spécifique si la police en a un (ex: 400, 700) */
    font-style: normal;
    font-display: swap; /* Affiche un texte de secours pendant le chargement de la police, c'est crucial ! */
  }

  // Définition des variables CSS pour une gestion facile des styles
  :root {
    /* Couleurs principales */
    --color-background-primary: #F8F8F0; // Ton blanc cassé doux
    --color-text-primary: #333333;      // Ton gris foncé pour le texte
    --color-primary-green: #22c55e;     // Un vert vif
    --color-accent-orange: #fbbf24;     // Un orange pour les accents
    --color-error: #ef4444;             // Rouge pour les erreurs/notifications

    /* Polices */
    --font-family-heading: 'Comic Zine OT', sans-serif; // Ta nouvelle police pour les titres
    --font-family-body: 'Helvetica Neue', Arial, sans-serif; // Une police de secours pour le corps du texte

    /* Espacements (exemples, tu pourras les affiner) */
    --space-1: 0.25rem; // 4px
    --space-2: 0.5rem;  // 8px
    --space-3: 0.75rem; // 12px
    --space-4: 1rem;    // 16px
    --space-6: 1.5rem;  // 24px
    --space-8: 2rem;    // 32px
    --space-10: 2.5rem; // 40px
    --space-12: 3rem;   // 48px

    /* Tailles de texte (exemples) */
    --text-xs: 0.75rem;   // 12px
    --text-sm: 0.875rem;  // 14px
    --text-base: 1rem;    // 16px
    --text-lg: 1.125rem;  // 18px
    --text-xl: 1.25rem;   // 20px
    --text-2xl: 1.5rem;   // 24px
    --text-3xl: 1.875rem; // 30px
    --text-4xl: 2.25rem;  // 36px
    --text-5xl: 3rem;     // 48px

    /* Poids de police */
    --font-light: 300;
    --font-normal: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
    --font-extrabold: 800;
    --font-black: 900;

    /* Rayons de bordure */
    --radius-sm: 0.125rem; // 2px
    --radius-md: 0.375rem; // 6px
    --radius-lg: 0.5rem;   // 8px
    --radius-xl: 0.75rem;  // 12px
    --radius-2xl: 1rem;    // 16px
    --radius-3xl: 1.5rem;  // 24px
    --radius-full: 9999px; // Complètement rond

    /* Ombres */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadow-glass: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    --shadow-glass-hover: 0 16px 64px 0 rgba(31, 38, 135, 0.5);

    /* Transitions */
    --transition-base: 0.3s ease-in-out;

    /* Line height */
    --leading-none: 1;
    --leading-tight: 1.25;
    --leading-snug: 1.375;
    --leading-normal: 1.5;
    --leading-relaxed: 1.625;
    --leading-loose: 2;

    /* Gradients (exemples, à adapter si vous en avez d'autres) */
    --gradient-primary: linear-gradient(to right top, #22c55e, #16a34a);
    --gradient-mesh: radial-gradient(at 0% 0%, hsl(207, 72%, 91%) 0, transparent 50%),
                     radial-gradient(at 100% 0%, hsl(39, 90%, 85%) 0, transparent 50%),
                     radial-gradient(at 50% 100%, hsl(145, 60%, 75%) 0, transparent 50%);
  }


  /* Ton couleur de fond "white space" globale */
  body {
    background-color: var(--color-background-primary);
    color: var(--color-text-primary);
    font-family: var(--font-family-body); // Utilise la police de secours par défaut ici
    margin: 0;
    padding: 0;
    box-sizing: border-box; // Bonne pratique pour tous les éléments
    line-height: var(--leading-normal); // Pour une meilleure lisibilité
    -webkit-font-smoothing: antialiased; // Améliore le rendu des polices sur WebKit
    -moz-osx-font-smoothing: grayscale;  // Améliore le rendu des polices sur Firefox
  }

  /* Styles de base pour les titres, etc. */
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-heading); // Applique ta nouvelle police aux titres !
    margin: 0;
    padding: 0;
    line-height: var(--leading-tight); // Resserre un peu les lignes pour les titres
    color: var(--color-text-primary); // Utilise la couleur de texte définie
  }

  p {
    font-family: var(--font-family-body); // Assure que les paragraphes utilisent la police body
    margin: 0;
    margin-bottom: var(--space-md); // Ajoute un peu d'espace sous les paragraphes
  }

  // Quelques réinitialisations utiles pour un style uniforme
  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }

  ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  // Styles globaux pour les formulaires (exemples, à ajuster)
  input, select, textarea {
    padding: var(--space-3);
    border: 1px solid var(--color-neutral-300);
    border-radius: var(--radius-md);
    font-family: var(--font-family-body);
    font-size: var(--text-base);
    color: var(--color-text-primary);
    background-color: white;
    transition: border-color var(--transition-base), box-shadow var(--transition-base);

    &:focus {
      outline: none;
      border-color: var(--color-primary-green);
      box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
    }
  }

  textarea {
    resize: vertical;
  }
`;

export default GlobalStyles;