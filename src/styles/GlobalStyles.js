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

    /* Adapter les couleurs de feedback si nécessaire, ou les garder comme des couleurs utilitaires */
    --color-success-light: #E8F5E9;
    --color-success: #4CAF50;
    --color-success-dark: #2E7D32;
    --color-success-soft: #d0f8d2;

    --color-error-light: #FFEBEE;
    --color-error: #F44336;
    --color-error-dark: #D32F2F;
    --color-error-soft: #fbd6d6;

    --color-warning-light: #FFF8E1;
    --color-warning: #FFC107;
    --color-warning-dark: #FFA000;

    --color-info-light: #E3F2FD;
    --color-info: #2196F3;
    --color-info-dark: #1976D2;

    /* Espacement, Rayons, Ombres, Transitions, Z-index - Gardez-les, ils sont excellents */
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


    /* Typographie - Mettre à jour avec les nouvelles polices */
    --font-family-heading: 'Cabin Sketch', cursive; /* Ou 'Quicksand', sans-serif; si vous préférez */
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
    --font-medium: 500; /* Quicksand n'a pas ce poids, utilisez semi-bold */
    --font-semibold: 600;
    --font-bold: 700;
    --font-extrabold: 800; /* Quicksand n'a pas ce poids */

    --navbar-height: 5rem;
    --dashboard-blur: 0px;
    --dashboard-opacity: 1;
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
    color: var(--color-neutral-800); /* Garder un texte foncé pour la lisibilité */
    line-height: 1.6;
    background-color: var(--color-cream); /* Utilisation de votre nouvelle couleur crème pour le fond */
    position: relative;
    min-height: 100vh;
    overflow-x: hidden;

    font-weight: var(--font-normal);
    font-size: var(--text-lg);

    /* Gestion de l'image de fond pour un look plus "quirky" */
   
    background-position: center center; /* Ajusté */
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    /* Pour un look "quirky", le flou peut être plus prononcé ou l'image plus abstraite/graphique */
    filter: blur(var(--dashboard-blur)) brightness(var(--dashboard-opacity));
    transition: filter 0.5s ease-in-out;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-family-heading);
    line-height: 1.2;
    margin-top: var(--space-6);
    margin-bottom: var(--space-4);
    color: var(--color-bright-pink-crayola); /* Utilisez une couleur plus vive pour les titres ! */
  }

  a {
    color: var(--color-salmon); /* Utilisez Salmon pour les liens */
    text-decoration: none;
    &:hover {
      color: var(--color-bright-pink-crayola); /* Un joli effet au survol */
    }
  }

  button, input[type="submit"] {
    cursor: pointer;
  }
`;

export default GlobalStyles;