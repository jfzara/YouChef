// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Votre couleur de fond "white space" globale */
  body {
    background-color: #F8F8F0; /* Exemple: un blanc cassé très doux */
    color: #333333; /* Couleur de texte par défaut, à affiner */
    /* Polices seront définies ici une fois choisies */
    /* font-family: 'VotreBellePolice', sans-serif; */
  }

  /* Styles de base pour les titres, etc., à affiner plus tard */
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  p {
    margin: 0;
  }
`;

export default GlobalStyles;