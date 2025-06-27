// src/styles/GlobalStyles.js

import { createGlobalStyle } from 'styled-components';

// Importations des nouvelles polices (exemple avec Google Fonts)
import QuicksandLightTTF from '../assets/fonts/Quicksand-Light.ttf';
import QuicksandRegularTTF from '../assets/fonts/Quicksand-Regular.ttf';
import QuicksandSemiBoldTTF from '../assets/fonts/Quicksand-SemiBold.ttf';
import QuicksandBoldTTF from '../assets/fonts/Quicksand-Bold.ttf';
import CabinSketchRegularTTF from '../assets/fonts/CabinSketch-Regular.ttf'; // Exemple pour la police de titre artistique

const GlobalStyles = createGlobalStyle`
  /* Suppression des anciennes polices ou mise à jour */
  @font-face {
    font-family: 'Cabin Sketch';
    src: url(${CabinSketchRegularTTF}) format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Quicksand';
    src: url(${QuicksandLightTTF}) format('truetype');
    font-weight: 300; /* Light */
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Quicksand';
    src: url(${QuicksandRegularTTF}) format('truetype');
    font-weight: 400; /* Regular */
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Quicksand';
    src: url(${QuicksandSemiBoldTTF}) format('truetype');
    font-weight: 600; /* SemiBold */
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Quicksand';
    src: url(${QuicksandBoldTTF}) format('truetype');
    font-weight: 700; /* Bold */
    font-style: normal;
    font-display: swap;
  }

  :root {
    /* Nouvelle Palette de Couleurs */
    --color-light-sky-blue: #9ac6e6;
    --color-cream: #eff1b3;
    --color-jasmine: #fcd180;
    --color-salmon: #fa8c73;
    --color-bright-pink-crayola: #f74f73;

    /* Vous pouvez garder certaines de vos couleurs neutres existantes pour le texte et les bordures */
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

    /* Couleurs de feedback */
    --color-success-light: #E8F5E9;
    --color-success: #4CAF50;
    --color-success-dark: #2E7D32;
    --color-success-soft: #d0f8d2;

    --color-error-light: #FFEBEE;
    --color-error: #F44336;
    --color-error-dark: #D32F2F;
    --color-error-soft: #fbd6d6;
    --color-error-500: #EF4444;
    --color-error-800: #991B1B;


    --color-warning-light: #FFF8E1;
    --color-warning: #FFC107;
    --color-warning-dark: #FFA000;

    --color-info-light: #E3F2FD;
    --color-info: #2196F3;
    --color-info-dark: #1976D2;
    --color-info-700: #0C4A6E;
    --color-info-300: #90CAF9;
    --color-info-500: #2196F3;


    /* Couleurs d'accent */
    --color-accent-blue: #3E82F7;
    --color-accent-blue-dark: #2A6DCF;
    --color-accent-blue-light: #6BA8FF;

    --color-accent-green: #4CAF50;
    --color-accent-green-dark: #388E3C;
    --color-accent-green-light: #81C784;

    --color-accent-purple: #8A2BE2;
    --color-accent-purple-dark: #6A1FB6;
    --color-accent-purple-light: #A052EE;

    /* Couleurs pour les cartes de stats */
    --color-tertiary-100: #E0F2F7;
    --color-tertiary-300: #B3E5FC;

    /* Couleurs pour le Rolodex et ses boutons */
    --color-primary-100: #FFF3E0;
    --color-primary-600: #FFA000;
    --color-primary-800: #E65100;

    --color-secondary-50: #F3F9F5;
    --color-secondary-300: #A5D6A7;
    --color-secondary-500: #4CAF50;

    --color-tertiary-500: #8D6E63;
    --color-tertiary-600: #6D4C41;
    --color-tertiary-700: #4E342E;


    /* Ombres de texte */
    --shadow-text-xs: 0 1px 0px rgba(0,0,0,0.05);
    --shadow-text-sm: 0 1px 1px rgba(0,0,0,0.1);
    --shadow-text-md: 0 2px 2px rgba(0,0,0,0.15);
    --shadow-text-lg: 0 3px 3px rgba(0,0,0,0.2);

    /* Espacement, Rayons, Ombres, Transitions, Z-index */
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

    --radius-sm: 0.125rem;
    --radius-md: 0.25rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --radius-full: 9999px;

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.2);
    --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);

    --shadow-text-sm: 1px 1px 2px rgba(0, 0, 0, 0.1);
    --shadow-text-md: 2px 2px 4px rgba(0, 0, 0, 0.2);
    --shadow-text-lg: 3px 3px 6px rgba(0, 0, 0, 0.3);

    --transition-base: 0.3s ease-in-out;
    --transition-fast: 0.15s ease-out;
    --transition-slow: 0.5s ease-in-out;

    --z-low: 10;
    --z-mid: 100;
    --z-high: 1000;
    --z-modal: 10000;
    --z-tooltip: 20000;

    /* Nouveaux dégradés avec votre palette */
    --gradient-quirky-1: linear-gradient(45deg, var(--color-light-sky-blue), var(--color-jasmine));
    --gradient-quirky-2: linear-gradient(135deg, var(--color-salmon), var(--color-bright-pink-crayola));
    --gradient-quirky-3: linear-gradient(90deg, var(--color-cream), var(--color-light-sky-blue));

    /* --- AJOUT/MODIFICATION ICI pour définir --gradient-primary et --gradient-secondary --- */
    --gradient-primary: var(--gradient-quirky-1); /* Utilisez votre dégradé préféré comme primaire */
    --gradient-secondary: var(--gradient-quirky-2); /* Utilisez un autre dégradé pour le hover */
    /* --- FIN AJOUT/MODIFICATION --- */


    /* Typographie - Mettre à jour avec les nouvelles polices */
    --font-family-heading: 'Cabin Sketch', cursive;
    --font-family-sans: 'Quicksand', sans-serif;

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

    --navbar-height: 5rem;
    --dashboard-blur: 0px; // Variable toujours présente, mais gérée sur RecettesContainer
    --dashboard-opacity: 1; // Variable toujours présente, mais gérée sur RecettesContainer
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
    background-color: var(--color-cream);
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;

    font-weight: var(--font-normal);
    font-size: var(--text-lg);

    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-heading);
    line-height: 1.2;
    margin-top: var(--space-6);
    margin-bottom: var(--space-4);
    color: var(--color-bright-pink-crayola);
  }

  a {
    color: var(--color-salmon);
    text-decoration: none;
    &:hover {
      color: var(--color-bright-pink-crayola);
    }
  }

  button, input[type="submit"] {
    cursor: pointer;
  }

  /* Styles pour React-Toastify - PLACÉ ICI DANS LE MÊME BLOC */
  .Toastify__toast-container {
    /* Ajuste la marge par rapport aux bords de l'écran */
    padding: 1rem; /* Ajoute un padding de 16px sur tous les côtés */
    box-sizing: border-box; /* S'assure que le padding n'augmente pas la taille totale */
    width: auto; /* Permet au conteneur de s'adapter à la largeur du contenu */
    max-width: 90vw; /* Limite la largeur maximale à 90% de la largeur de la vue pour les petits écrans */
    
    /* Si top-right cause toujours problème, vous pouvez essayer top-center */
    /* top: 20px !important; */
    /* right: 20px !important; */
    /* Ou, si vous passez à top-center dans le JS: */
    /* left: 50% !important; */
    /* transform: translateX(-50%) !important; */
  }

  /* Optionnel: Styles pour les toasts individuels si vous voulez plus de contrôle */
  .Toastify__toast {
    border-radius: var(--radius-md, 8px);
    box-shadow: var(--shadow-lg);
  }

  /* Vous pouvez aussi cibler spécifiquement les toasts de succès */
  .Toastify__toast--success {
    background-color: var(--color-success-500, #4CAF50);
    color: var(--color-neutral-0, #FFFFFF);
  }

  .Toastify__toast--error {
    background-color: var(--color-error-500, #F44336);
    color: var(--color-neutral-0, #FFFFFF);
  }
`;

export default GlobalStyles;