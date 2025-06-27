import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- Styled Components pour la Page de Recettes ---

export const RecettesContainer = styled(motion.div)`
  min-height: 100vh;
  padding: var(--space-8) 0;
  background: var(--gradient-mesh); /* Votre fond mesh existant */
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centrer horizontalement */
`;

export const PageTitle = styled(motion.h1)`
  font-family: var(--font-display);
  font-size: var(--text-5xl);
  font-weight: var(--font-extrabold);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: var(--space-4);
  line-height: 1.1;
  text-align: center;
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--gradient-primary);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    font-size: var(--text-4xl);
  }
`;

// NOUVEAU: Conteneur pour les boutons de catégorie/filtres
export const CategoryFilterContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap; /* Permet aux boutons de passer à la ligne sur petits écrans */
  justify-content: center;
  gap: var(--space-3); /* Espacement entre les boutons */
  margin: var(--space-8) auto;
  padding: 0 var(--space-4);
  max-width: 1200px;
  width: 100%;
  z-index: 1;

  @media (max-width: 768px) {
    margin: var(--space-6) auto;
    gap: var(--space-2);
    padding: 0 var(--space-2);
  }
`;

// NOUVEAU: Bouton de catégorie/filtre
export const CategoryButton = styled(motion.button)`
  background-color: ${props => props.$isActive ? 'var(--color-primary-500)' : 'rgba(255, 255, 255, 0.7)'};
  color: ${props => props.$isActive ? 'white' : 'var(--color-neutral-700)'};
  border: 1px solid ${props => props.$isActive ? 'var(--color-primary-500)' : 'rgba(255, 255, 255, 0.3)'};
  backdrop-filter: ${props => props.$isActive ? 'none' : 'blur(15px)'};
  -webkit-backdrop-filter: ${props => props.$isActive ? 'none' : 'blur(15px)'};
  border-radius: var(--radius-full);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$isActive ? 'var(--shadow-md)' : 'var(--shadow-sm)'};

  &:hover {
    background-color: ${props => props.$isActive ? 'var(--color-primary-600)' : 'rgba(255, 255, 255, 0.9)'};
    color: ${props => props.$isActive ? 'white' : 'var(--color-neutral-800)'};
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  @media (max-width: 768px) {
    font-size: var(--text-sm);
    padding: var(--space-2) var(--space-4);
  }
`;


// ANCIEN: CategorySection et CategoryTitle sont supprimés ou non exportés car la navigation change
// ANCIEN: SubCategoryArticle et SubCategoryTitle sont supprimés

export const RecipeGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); /* Plus petit pour voir plus de cartes */
  gap: var(--space-6); /* Espacement légèrement réduit */
  width: 100%;
  max-width: 1200px;
  padding: 0 var(--space-4);
  margin: var(--space-8) auto; /* Ajustez la marge pour l'espacement après les filtres */

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: var(--space-5);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); /* Encore plus petit sur mobile */
    gap: var(--space-4);
    padding: 0 var(--space-3);
  }
`;

// NOUVEAU: RecipeMiniCard (remplace RecipeCard)
export const RecipeMiniCard = styled(motion.div)`
  background: white;
  border-radius: var(--radius-xl) ; /* Légèrement plus petit que 3xl pour un look plus compact */
  overflow: hidden;
  box-shadow: var(--shadow-sm); /* Ombre plus subtile */
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  z-index: 1;
  text-align: center;
   

  /* Conteneur de l'image pour forcer le rapport d'aspect carré */
  .image-container {
    width: 100%;
    padding-bottom: 100%; /* Rapport 1:1 pour une image carrée */
    position: relative;
    overflow: hidden;
    background-color: var(--color-neutral-200); /* Couleur de fond si l'image ne charge pas */
  }

  .image-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Assure que l'image couvre l'espace sans distorsion */
    border-radius: var(--radius-xl) var(--radius-xl) 0 0; /* Rayon sur l'image aussi */
  }

  .recipe-info {
    padding: var(--space-3) var(--space-2); /* Padding réduit pour plus de compacité */
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centrer le contenu verticalement */
    flex-grow: 1; /* Permet au contenu de prendre l'espace restant */
  }

  &:hover {
    transform: translateY(-5px) scale(1.02); /* Animation de survol plus légère */
    box-shadow: var(--shadow-md); /* Ombre au survol */
    
  }

  @media (max-width: 768px) {
    border-radius: var(--radius-lg);
    .image-container {
      border-radius: var(--radius-lg);
    }
  }
`;

// NOUVEAU: RecipeName pour la mini-carte (plus petit)
export const RecipeMiniName = styled.h4`
  font-family: var(--font-family-heading);
  font-size: var(--text-base); /* Taille réduite */
  font-weight: var(--font-semibold); /* Moins gras pour la compacité */
  color: var(--color-neutral-800);
  margin-bottom: 0; /* Pas de marge en bas */
  line-height: 1.3;
  display: -webkit-box; /* Pour tronquer le texte si trop long */
  -webkit-line-clamp: 2; /* Limiter à 2 lignes */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; /* Ajouter des points de suspension */

  @media (max-width: 768px) {
    font-size: var(--text-sm);
  }
`;

// NOUVEAU: Composant pour les images des recettes (à utiliser dans RecipeMiniCard)
export const RecipeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-xl); /* Bords légèrement arrondis pour l'image */
  
  @media (max-width: 768px) {
    border-radius: var(--radius-lg);
  }
`;


// ANCIEN: RecipeName, RecipeDescription, Tag restent, mais seront utilisés DANS LA MODALE.
// Pour la mini-carte, on utilise RecipeMiniName.

// EXPORTATIONS DES ANCIENS ÉLÉMENTS QUI POURRAIENT ÊTRE UTILISÉS DANS LA MODALE
export const RecipeNameDetail = styled.h2`
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: var(--font-extrabold);
  color: var(--color-neutral-800);
  margin-bottom: var(--space-4);
  text-align: center;
  @media (max-width: 768px) {
    font-size: var(--text-3xl);
  }
`;

export const RecipeDescriptionDetail = styled.p`
  font-size: var(--text-lg);
  color: var(--color-neutral-700);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
`;

export const Tag = styled.span`
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  margin: 0 var(--space-1) var(--space-1) 0;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: capitalize;
  background-color: ${props => props.$isCategory ? 'var(--soft-green-100)' : 'var(--soft-blue-100)'};
  color: ${props => props.$isCategory ? 'var(--soft-green-700)' : 'var(--soft-blue-700)'};
  white-space: nowrap; /* Empêche le tag de se casser sur plusieurs lignes */
`;

export const ModalOverlay = styled(motion.div)`
  position: fixed; /* TRÈS IMPORTANT : Doit être fixed */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

export const ModalContent = styled(motion.div)`
  background: white;
  border-radius: var(--radius-3xl);
  padding: var(--space-8);
  max-width: 800px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-xl);
  position: relative; /* Changez ceci pour 'relative' si l'overlay gère déjà le centrage, ou 'absolute' avec top/left/transform pour centrage auto */

  /* --- AJOUTS / MODIFICATIONS CLÉS POUR LE CENTRAGE --- */
  /* Si ModalOverlay a display: flex et align-items/justify-content: center,
     ModalContent n'a pas besoin de position: fixed/absolute ou de top/left/transform pour le centrage.
     Il sera centré par son parent flex.
     Cependant, l'animation vient perturber ce centrage si elle utilise y: "..."
  */

  /* Si vous voulez que la modale sorte et rentre du centre, ajustez les variantes dans Recettes.jsx */
  /* Pour un centrage parfait et que l'animation de Framer Motion se fasse DUPUIS le centre,
     on va ajuster les VARIANTS dans Recettes.jsx et s'assurer que ModalContent est centré de base.
  */
  
  /* Retirons les propriétés de centrage qui peuvent entrer en conflit si le parent est flex */
  /* Les propriétés suivantes sont souvent utilisées pour centrer un élément ABSOLUTE/FIXED,
     mais si le parent (ModalOverlay) est un conteneur flex qui centre ses enfants,
     elles peuvent être redondantes ou causer des conflits avec Framer Motion. */
  /*
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  */

  @media (max-width: 768px) {
    padding: var(--space-6);
    width: 95%;
  }
`;





export const CloseButton = styled(motion.button)`
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  background: none;
  border: none;
  font-size: 2rem;
  font-weight: 600;
  color: black; // Couleur par défaut du bouton/X si pas d'image
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  display: flex;
  justify-content: center;
  align-items: center;
  width:2.5rem;
  height:2.5rem;
  margin: 1rem;
  text-align: center;

  &:hover {
    background: var(--color-error-light);
     
    transform: rotate(90deg)  ;
  }

  img {
    width: 28px; /* Taille de l'icône - pour qu'elle soit carrée, gardez la même valeur pour width et height */
    height: 28px; /* Taille de l'icône */
    /* MODIFICATION ICI : Enlever ou ajuster le filtre pour un X noir */
    filter: brightness(0) invert(1); /* Filtre pour rendre n'importe quelle icône blanche sur noir, ou inversement. Pour un X noir, c'est ce qu'il faut. */
    /* OU si votre icône est déjà noire et que vous voulez la garder noire : */
    /* filter: none; */
  }
`;

export const ModalImage = styled.img`
  width: 100%;
  height: 300px; /* Hauteur fixe pour l'image en modale */
  object-fit: cover;
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-6);

  @media (max-width: 768px) {
    height: 200px;
    margin-bottom: var(--space-4);
  }
`;

export const RecipeDetailsSection = styled.div`
  margin-top: var(--space-6);
  h3 {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--color-neutral-800);
    margin-bottom: var(--space-3);
  }
  ul, ol {
    list-style-position: inside;
    margin-bottom: var(--space-4);
    padding-left: var(--space-2);
  }
  li {
    font-size: var(--text-base);
    color: var(--color-neutral-700);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-2);
  }
`;