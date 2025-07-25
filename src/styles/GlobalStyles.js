import { createGlobalStyle } from 'styled-components';

// Importations des polices Quicksand (vous pouvez les garder si vous les utilisez ailleurs,
// ou les retirer si Quicksand n'est plus utilisée du tout)
import QuicksandLightTTF from '../assets/fonts/Quicksand-Light.ttf';
import QuicksandRegularTTF from '../assets/fonts/Quicksand-Regular.ttf';
import QuicksandSemiBoldTTF from '../assets/fonts/Quicksand-SemiBold.ttf';
import QuicksandBoldTTF from '../assets/fonts/Quicksand-Bold.ttf';

const GlobalStyles = createGlobalStyle`
    /* Définition de la police Quicksand pour toutes ses graisses */
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

    /* --- Importation de Google Fonts pour Roboto (plus classique) --- */
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    /* Vous pouvez ajouter d'autres graisses si nécessaire, par exemple 300, 500, 900 */

    :root {
        /* Nouvelle Palette de Couleurs (inchangée) */
        --color-light-sky-blue:#b2d3eb;
        --color-cream: #eff1b3;
        --color-jasmine: #fcd180;
        --color-salmon: #fa8c73;
        --color-bright-pink-crayola: #f74f73;

        /* Couleurs neutres (inchangées) */
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

        /* Couleurs de feedback (inchangées) */
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

        /* Couleurs d'accent (inchangées) */
        --color-accent-blue: #3E82F7;
        --color-accent-blue-dark: #2A6DCF;
        --color-accent-blue-light: #6BA8FF;

        --color-accent-green: #4CAF50;
        --color-accent-green-dark: #388E3C;
        --color-accent-green-light: #81C784;

        --color-accent-purple: #8A2BE2;
        --color-accent-purple-dark: #6A1FB6;
        --color-accent-purple-light: #A052EE;

        /* Couleurs pour les cartes de stats (inchangées) */
        --color-tertiary-100: #E0F2F7;
        --color-tertiary-300: #B3E5FC;

        /* Couleurs pour le Rolodex et ses boutons (inchangées) */
        --color-primary-100: #FFF3E0;
        --color-primary-600: #FFA000;
        --color-primary-800: #E65100;

        --color-secondary-50: #F3F9F5;
        --color-secondary-300: #A5D6A7;
        --color-secondary-500: #4CAF50;

        --color-tertiary-500: #8D6E63;
        --color-tertiary-600: #6D4C41;
        --color-tertiary-700: #4E342E;

        /* Ombres de texte (inchangées) */
        --shadow-text-xs: 0 1px 0px rgba(0,0,0,0.05);
        --shadow-text-sm: 0 1px 1px rgba(0,0,0,0.1);
        --shadow-text-md: 0 2px 2px rgba(0,0,0,0.15);
        --shadow-text-lg: 0 3px 3px rgba(0,0,0,0.2);

        /* Espacement, Rayons, Ombres, Transitions, Z-index (inchangées) */
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

        /* Nouveaux dégradés avec votre palette (inchangés) */
        --gradient-quirky-1: linear-gradient(45deg, var(--color-light-sky-blue), var(--color-jasmine));
        --gradient-quirky-2: linear-gradient(135deg, var(--color-salmon), var(--color-bright-pink-crayola));
        --gradient-quirky-3: linear-gradient(90deg, #f2f3c3, var(--color-light-sky-blue));

        --gradient-primary: var(--gradient-quirky-1);
        --gradient-secondary: var(--gradient-quirky-2);


        /* --- TYPOGRAPHIE - MISE À JOUR ICI --- */
        /* La police de titre sera maintenant Roboto (plus classique) */
        --font-family-heading: 'Roboto', sans-serif; 
        /* La police de corps reste Quicksand */
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
        --dashboard-blur: 0px;
        --dashboard-opacity: 1;
    }

    *, *::before, *::after {
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
        height: 100%; /* Important pour que le body puisse prendre 100vh */
    }

    body {
        margin: 0;
        font-family: var(--font-family-sans); /* Utilise Quicksand pour le corps de texte */
        color: var(--color-neutral-800);
        line-height: 1.6;
        background-color: #f2f3c3;
        /* Retiré : position: relative; */ 
        /* Retiré : overflow-x: hidden; (peut causer des problèmes avec le défilement si le contenu dépasse) */
        /* Retiré : background-position, background-repeat, background-size, background-attachment (si vous les voulez en global, mettez-les sur #root ou un conteneur principal d'application) */

        font-weight: var(--font-normal);
        font-size: var(--text-lg);

        /* --- Ajouts pour Flexbox et le footer en bas du contenu --- */
        display: flex;
        flex-direction: column;
        min-height: 100vh; /* S'assurer que le body occupe au moins toute la hauteur de la fenêtre */
    }

    /* Ajoutez ceci si votre application React est montée dans une div avec l'ID "root" */
    #root {
        display: flex;
        flex-direction: column;
        flex-grow: 1; /* Permet à #root de prendre l'espace restant pour pousser le footer */
        /* Si vous avez un fond sur le body, vous pouvez le déplacer ici pour qu'il s'étende avec le contenu */
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        background-attachment: fixed;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-family-heading); /* Utilise Roboto pour les titres */
        font-weight: var(--font-bold); 
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

    /* Styles pour React-Toastify */
    .Toastify__toast-container {
        padding: 1rem;
        box-sizing: border-box;
        width: auto;
        max-width: 90vw;
    }

    .Toastify__toast {
        border-radius: var(--radius-md, 8px);
        box-shadow: var(--shadow-lg);
    }

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