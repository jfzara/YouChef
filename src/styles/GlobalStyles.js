// src/styles/GlobalStyles.js

import { createGlobalStyle } from 'styled-components';
import DashboardBg from '../assets/images/DashboardBackground.jpg';

import AbrilFatfaceOTF from '../assets/fonts/AbrilFatface-Regular.otf';
import MuliRegularTTF from '../assets/fonts/Muli.ttf';
import MuliSemiBoldTTF from '../assets/fonts/Muli-SemiBold.ttf';

const GlobalStyles = createGlobalStyle`
  /* Polices des titres (Abril Fatface) */
  @font-face {
    font-family: 'Abril Fatface';
    src: url(${AbrilFatfaceOTF}) format('opentype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  /* Polices du corps de texte (Muli) */
  @font-face {
    font-family: 'Muli';
    src: url(${MuliRegularTTF}) format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Muli';
    src: url(${MuliSemiBoldTTF}) format('truetype');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  :root {
    /* Couleurs Neutres (Vérifiez qu'elles sont bien définies) */
    --color-neutral-0: #FFFFFF;
    --color-neutral-50: #F8F8F8;
    --color-neutral-100: #F0F0F0;
    --color-neutral-200: #E0E0E0;
    --color-neutral-300: #CCCCCC;
    --color-neutral-400: #AAAAAA;
    --color-neutral-500: #888888;
    --color-neutral-600: #666666;
    --color-neutral-700: #444444;
    --color-neutral-800: #222222;
    --color-neutral-900: #000000;

    /* Couleurs Primaires */
    --color-primary-50: #E0F7FA;
    --color-primary-100: #B2EBF2;
    --color-primary-200: #80DEEA;
    --color-primary-300: #4DD0E1;
    --color-primary-400: #26C6DA;
    --color-primary-500: #00BCD4;
    --color-primary-600: #00ACC1;
    --color-primary-700: #0097A7;
    --color-primary-800: #00838F;
    --color-primary-900: #006064;

    /* Couleurs Secondaires */
    --color-secondary-50: #FFF3E0;
    --color-secondary-100: #FFE0B2;
    --color-secondary-200: #FFCC80;
    --color-secondary-300: #FFB74D;
    --color-secondary-400: #FFA726;
    --color-secondary-500: #FF9800;
    --color-secondary-600: #FB8C00;
    --color-secondary-700: #F57C00;
    --color-secondary-800: #EF6C00;
    --color-secondary-900: #E65100;

    /* Couleurs de Feedback */
    --color-success-light: #E8F5E9;
    --color-success: #4CAF50;
    --color-success-dark: #2E7D32;

    --color-error-light: #FFEBEE;
    --color-error: #F44336;
    --color-error-dark: #D32F2F;

    --color-warning-light: #FFF8E1;
    --color-warning: #FFC107;
    --color-warning-dark: #FFA000;

    --color-info-light: #E3F2FD;
    --color-info: #2196F3;
    --color-info-dark: #1976D2;

    /* Espacement */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-7: 1.75rem;
    --space-8: 2rem;
    --space-9: 2.5rem;
    --space-10: 3rem;
    --space-12: 4rem;
    --space-16: 6rem;
    --space-20: 8rem;

    /* Rayons de Bordure */
    --radius-sm: 0.125rem;
    --radius-md: 0.25rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --radius-full: 9999px;

    /* Ombres */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.2);
    --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);

    /* Ombres de Texte */
    --shadow-text-sm: 1px 1px 2px rgba(0, 0, 0, 0.1);
    --shadow-text-md: 2px 2px 4px rgba(0, 0, 0, 0.2);
    --shadow-text-lg: 3px 3px 6px rgba(0, 0, 0, 0.3);

    /* Transitions */
    --transition-base: 0.3s ease-in-out;
    --transition-fast: 0.15s ease-out;
    --transition-slow: 0.5s ease-in-out;

    /* Z-index */
    --z-low: 10;
    --z-mid: 100;
    --z-high: 1000;
    --z-modal: 10000;
    --z-tooltip: 20000;

    /* Dégradés (Gradients) */
    --gradient-primary: linear-gradient(45deg, var(--color-primary-600), var(--color-primary-400));
    --gradient-secondary: linear-gradient(45deg, var(--color-secondary-600), var(--color-secondary-400));
    --gradient-neutral: linear-gradient(45deg, var(--color-neutral-300), var(--color-neutral-100));

    /* Typographie */
    --font-family-heading: 'Abril Fatface', serif;
    --font-family-sans: 'Muli', sans-serif;

    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.25rem;
    --text-xl: 1.5rem;
    --text-2xl: 1.875rem;
    --text-3xl: 2.25rem;
    --text-4xl: 2.8rem;
    --text-5xl: 3.5rem;
    --text-6xl: 4.5rem;

    --font-light: 300;
    --font-normal: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
    --font-extrabold: 800;

    /* Hauteur de la barre de navigation */
    --navbar-height: 5rem;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: var(--font-family-sans);
    color: var(--color-neutral-800);
    line-height: 1.6;
    background-color: var(--color-neutral-50);
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;

    font-weight: var(--font-normal);
    font-size: var(--text-lg);

    /* --- VÉRIFICATION / AJUSTEMENT DU BACKGROUND --- */
    background-image: url(${DashboardBg});
    background-position: center top; /* Changer top pour s'assurer qu'il ne masque pas la navbar */
    background-repeat: no-repeat;
    background-size: cover; /* Changer à 'cover' pour s'assurer qu'il remplit l'écran sans trop dépasser */
    background-attachment: fixed; /* Mettre 'fixed' si vous voulez qu'il reste en place au scroll */

    transition: transform 0.1s ease-out;
    will-change: transform;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-heading);
    line-height: 1.2;
    margin-top: var(--space-6);
    margin-bottom: var(--space-4);
    color: var(--color-primary-700);
  }

  a {
    color: var(--color-primary-600);
    text-decoration: none;
    &:hover {
      color: var(--color-primary-700);
    }
  }

  button, input[type="submit"] {
    cursor: pointer;
  }
`;

export default GlobalStyles;