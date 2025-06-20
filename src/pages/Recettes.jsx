import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion'; // Importez useAnimation
import Navbar from "../components/Navbar";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";

import Blob1 from '../assets/images/svg_blobs/blob (1).svg'; 

import Avocado from '../assets/images/Avocado.jpg';
import BigTomato from '../assets/images/BigTomato.jpg';
import BigTomato2 from '../assets/images/BigTomato2.png';
import Cake from '../assets/images/Cake.webp';
import Cake2 from '../assets/images/Cake2.jpg';
import Carrot from '../assets/images/Carrot.jpg';
import Dish1 from '../assets/images/Dish1.jpg';
import EvieSchwartz from '../assets/images/evie-s-aBvM_cKYMxc-unsplash.jpg';
import FoodBasket from '../assets/images/Food basket.jpg';
import FoodItems from '../assets/images/FoodItems.jpg';
import FruitsVegetables from '../assets/images/FruitsVegetables.jpg';
import HerbsGarlic from '../assets/images/HerbsGarlic.jpg';
import MathewSchwartz from '../assets/images/mathew-schwartz-wPR7ilcymGg-unsplash.jpg';
import NotebookRecipe from '../assets/images/NotebookRecipe.jpg';
import NotebookSpaghetti from '../assets/images/NotebookSpaghetti.jpg';
import NotebookTomato from '../assets/images/NotebookTomato.jpg';
import Pomegranate from '../assets/images/Pomegranate.jpg';
import ShakeThePan from '../assets/images/ShakeThePan.png';
import SomeDish from '../assets/images/SomeDish.jpg';
import SomeSalad from '../assets/images/SomeSalad.jpg';
import Tomato from '../assets/images/Tomato.jpg';
import TomatoIcon from '../assets/images/TomatoIcon.jpg';
import TomatoNav from '../assets/images/TomatoNav.jpg';
import Vegetables from '../assets/images/Vegetables.jpg';
import WhiteBackground from '../assets/images/WhiteBackground.jpg';
import WhiteBackground2 from '../assets/images/WhiteBackground2.jpg';
import WhiteBackground3 from '../assets/images/WhiteBackground3.jpg';
import WhiteBackground4 from '../assets/images/WhiteBackground4.png';
import WhiteBackground5 from '../assets/images/WhiteBackground5.png';
import WhiteBackground6 from '../assets/images/WhiteBackground6.jpg';
import WhiteBackground7 from '../assets/images/WhiteBackground7.avif';
import WhiteBackground8 from '../assets/images/WhiteBackground8.png';

const cardBackgroundImages = [
  Avocado, BigTomato, BigTomato2, Cake, Cake2, Carrot, Dish1, 
  EvieSchwartz, FoodBasket, FoodItems, FruitsVegetables, HerbsGarlic,
  MathewSchwartz, NotebookRecipe, NotebookSpaghetti, NotebookTomato,
  Pomegranate, ShakeThePan, SomeDish, SomeSalad, Tomato, TomatoIcon,
  TomatoNav, Vegetables, WhiteBackground, WhiteBackground2, WhiteBackground3,
  WhiteBackground4, WhiteBackground5, WhiteBackground6, WhiteBackground7, WhiteBackground8
];

// --- Styled Components ---

const RecettesContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--neutral-50);
  color: var(--neutral-800);

  padding-top: calc(var(--space-8) + 60px);
  padding-left: calc(250px + var(--space-8)); 
  padding-right: var(--space-4);
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;

  position: relative; 
  z-index: 1; 

  @media (max-width: 768px) {
    padding-top: calc(var(--space-6) + 60px);
    padding-left: var(--space-2); 
    padding-right: var(--space-2);
    padding-bottom: calc(var(--space-8) + 70px);
    align-items: center;
    text-align: center;
  }
`;

const PageTitle = styled(motion.h1)`
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  color: var(--soft-green-800);
  margin-bottom: var(--space-6);
  width: 100%;
  text-align: center;
  position: relative; 
  z-index: 2;
`;

const CategorySection = styled(motion.section)`
  width: 100%;
  max-width: 1000px;
  margin-top: var(--space-8);
  padding: 0 var(--space-4);
  box-sizing: border-box;
  text-align: left;
  margin-bottom: var(--space-8);
  position: relative; 
  z-index: 2;

  &:first-of-type {
    margin-top: var(--space-4);
  }

  @media (max-width: 768px) {
    padding: 0 var(--space-2);
    text-align: center;
  }
`;

const CategoryTitle = styled(motion.h2)`
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  color: ${props => props.$color || 'var(--soft-green-700)'};
  border-bottom: 3px solid ${props => props.$color || 'var(--soft-green-700)'};
  padding-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: var(--space-6);
  position: relative;
  z-index: 3; 

  @media (max-width: 768px) {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-4);
    text-align: center;
  }
`;

const SubCategoryArticle = styled(motion.article)`
  margin-left: var(--space-4);
  margin-top: var(--space-6);
  border-left: 5px solid ${props => props.$color || 'var(--soft-blue-500)'};
  padding-left: var(--space-6);
  border-radius: var(--radius-md);
  background-color: transparent; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  padding-top: var(--space-4);
  padding-bottom: var(--space-4);
  margin-bottom: var(--space-6);
  position: relative; 
  overflow: hidden; 
  z-index: 2; 
  
  border: 1px solid var(--soft-green-100); 

  @media (max-width: 768px) {
    margin-left: var(--space-0); 
    padding-left: var(--space-4);
    margin-top: var(--space-4);
  }
`;

const SubCategoryTitle = styled(motion.h3)`
  color: ${props => props.$color || 'var(--soft-blue-600)'};
  margin-bottom: var(--space-4);
  font-weight: 600;
  font-size: var(--text-xl);
  position: relative;
  z-index: 3; 

  @media (max-width: 768px) {
    font-size: var(--text-lg);
  }
`;

const RecipeGrid = styled(motion.div)`
  display: block; 
  column-count: 2; 
  column-gap: var(--space-4); 
  margin-top: var(--space-4);
  position: relative;
  z-index: 2; 

  & > * { 
    break-inside: avoid-column; 
    margin-bottom: var(--space-4); 
  }

  @media (max-width: 1024px) { 
    column-count: 1;
  }
`;

const RecipeCard = styled(motion.article)`
  background-color: white; /* Card background is white by default */
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--soft-green-300);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  position: relative;
  overflow: hidden;
  min-height: 180px; 
  z-index: 1; 

  & > *:not(${props => props.imageBackgroundClassName}) {
      position: relative;
      z-index: 2; 
  }
`;

const RecipeCardBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  /* The background image is completely invisible by default */
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  opacity: 0; /* The image is invisible by default */
  
  z-index: 1; /* Image is beneath card content */
  transition: opacity 0.3s ease, transform 0.3s ease; /* Transitions for the image */
  
  /* The GREEN mask that appears on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--soft-green-500); /* The desired green color */
    opacity: 0; /* Totally transparent by default (the white comes from RecipeCard) */
    z-index: 2; /* Above the image (z-index 1) and below the content (z-index 2 on content) */
    transition: opacity 0.3s ease; /* Transition for its appearance */
  }

  /* On card hover, the image and green mask appear */
  ${RecipeCard}:hover & {
    /* Background image appears */
    opacity: 0.4; /* Adjust image opacity on hover if needed */
    transform: scale(1.05); /* Image continues to zoom slightly */

    /* Green mask appears on top of the image */
    &::before {
      opacity: 0.6; /* Adjust this opacity for the intensity of the green veil */
    }
  }
`;

const RecipeName = styled.h4`
  color: var(--soft-green-700);
  margin: 0 0 var(--space-2) 0;
  font-size: var(--text-xl);
`;

const RecipeDescription = styled.p`
  color: var(--neutral-700);
  margin: 0;
  font-size: var(--text-base);
  line-height: 1.5;
`;

const Tag = styled(motion.span)`
  background-color: ${props => props.$isCategory ? 'var(--soft-green-500)' : 'var(--soft-blue-500)'};
  color: var(--neutral-50);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  white-space: nowrap;
  display: inline-block;
  margin-right: var(--space-2);
  margin-bottom: var(--space-2);
`;

const BlobBackground = styled(motion.img)`
  position: fixed; 
  top: 50%;
  left: 50%;
  width: 1200px; 
  height: 1200px;
  object-fit: cover;
  opacity: 0.05; 
  z-index: 0; 
  pointer-events: none;
  transform: translate(-50%, -50%) rotate(0deg);
`;
const hoverAnimations = [
  // Animation 1: "Rebond Joyeux" (Bouncy Joy)
  {
    y: -15, // Plus d'élévation
    scale: 1.05, // Zoom un peu plus grand
    rotate: 3, // Rotation plus prononcée
    boxShadow: `0 20px 30px -10px rgba(0,0,0,0.35)`, // Ombre très marquée
    transition: { type: "spring", stiffness: 200, damping: 8, mass: 1, duration: 0.7 } // Plus de rebond, plus lent
  },
  // Animation 2: "Glissade Amusante" (Funny Glide)
  {
    y: -10,
    x: 8, // Glisse sur le côté
    scale: 1.03,
    rotate: -4, // Rotation plus nette
    boxShadow: `0 18px 25px -8px rgba(0,0,0,0.3)`,
    transition: { type: "spring", stiffness: 180, damping: 10, mass: 0.8, duration: 0.75 } // Doux rebond latéral
  },
  // Animation 3: "Chute et Rebond" (Fall and Bounce)
  {
    y: -20, // Montée plus haute
    scale: 1.06, // Zoom encore plus grand
    rotate: 1,
    boxShadow: `0 22px 35px -12px rgba(0,0,0,0.4)`,
    transition: { type: "spring", stiffness: 150, damping: 7, mass: 1.5, duration: 0.8 } // Très rebondissant, plus lourd
  },
  // Animation 4: "Petite Danse" (Little Dance)
  {
    y: -12,
    rotate: [0, 2, -2, 0], // Séquence de rotation
    scale: 1.04,
    boxShadow: `0 15px 22px -7px rgba(0,0,0,0.32)`,
    transition: { 
      y: { type: "spring", stiffness: 220, damping: 12, duration: 0.6 },
      rotate: { duration: 0.5, ease: "easeInOut" }, // Rotation plus rapide
      scale: { type: "spring", stiffness: 200, damping: 10, duration: 0.6 }
    }
  },
  // Animation 5: "L'Émerveillement" (The Wow) - Plus de zoom, plus de 'pop'
  {
    y: -8,
    scale: 1.08, // Très grand zoom
    rotate: 0,
    boxShadow: `0 25px 40px -15px rgba(0,0,0,0.45)`, // Ombre très prononcée
    transition: { type: "spring", stiffness: 250, damping: 10, mass: 0.7, duration: 0.6 } // Rapide et percutant
  }
];
// --- Main Recettes Component ---

const Recettes = () => {
  const [recettes, setRecettes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const controls = useAnimation();

  const categoryColors = {
    'Entrées': 'var(--soft-green-700)',
    'Plats principaux': 'var(--soft-blue-700)',
    'Desserts': 'var(--accent-red)',
    'Boissons': 'var(--purple-500, #8A2BE2)',
    'Apéritifs': 'var(--accent-orange)',
    'Salades': 'var(--green-500, #4CAF50)',
    'Soupes': 'var(--brown-500, #A0522D)',
    'Pâtisseries': 'var(--pink-500, #FF69B4)',
    'Autres': 'var(--neutral-600)',
  };

  const sousCategoryColors = {
    'Végétarien': 'var(--soft-green-600)',
    'Végétalien': 'var(--soft-green-500)',
    'Sans gluten': 'var(--soft-blue-400)',
    'Rapide': 'var(--orange-400, #FFA726)',
    'Facile': 'var(--yellow-400, #FFCA28)',
    'Difficile': 'var(--red-600, #D32F2F)',
    'Traditionnel': 'var(--brown-400, #D2B48C)',
    'Moderne': 'var(--purple-400, #9575CD)',
    'Divers': 'var(--neutral-500)',
  };

  // NOUVEAU: Préréglages d'animations de survol pour les cartes
  const hoverAnimations = [
    // Animation 1: Léger zoom et rotation avec une ombre marquée
    {
      y: -5,
      scale: 1.02,
      rotate: 1,
      boxShadow: `0 12px 20px -5px rgba(0,0,0,0.25)`, // Plus d'ombre
      transition: { type: "spring", stiffness: 300, damping: 25, duration: 0.6 } // Durée plus longue
    },
    // Animation 2: Zoom un peu plus prononcé avec une rotation opposée et une ombre différente
    {
      y: -7,
      scale: 1.03,
      rotate: -2,
      boxShadow: `0 15px 25px -7px rgba(0,0,0,0.3)`, // Encore plus d'ombre
      transition: { type: "spring", stiffness: 280, damping: 22, duration: 0.65 } // Légèrement différente
    },
    // Animation 3: Glisse légèrement vers le haut avec un effet d'inclinaison subtil
    {
      y: -10,
      x: 2,
      rotate: 0.5,
      scale: 1.01,
      boxShadow: `0 10px 18px -4px rgba(0,0,0,0.2)`,
      transition: { type: "spring", stiffness: 320, damping: 28, duration: 0.55 }
    },
    // Animation 4: Léger rebond vers le haut sans rotation, avec un zoom rapide
    {
      y: -8,
      scale: 1.03,
      rotate: 0,
      boxShadow: `0 14px 22px -6px rgba(0,0,0,0.28)`,
      transition: { type: "spring", stiffness: 350, damping: 20, duration: 0.5 }
    },
    // Animation 5: Simple élévation et zoom, mais avec une transition élastique
    {
        y: -12,
        scale: 1.04,
        rotate: 0,
        boxShadow: `0 16px 25px -8px rgba(0,0,0,0.35)`,
        transition: { type: "spring", stiffness: 250, damping: 15, mass: 1.2, duration: 0.7 }
    },
  ];

  // Variants pour le conteneur principal (RecettesContainer)
  const mainContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      } 
    },
  };

  // Variants pour chaque CategorySection (avec staggerChildren pour ses sous-articles)
  const categorySectionVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        when: "beforeChildren", 
        staggerChildren: 0.15
      } 
    },
  };

  // Variants pour chaque SubCategoryArticle (avec staggerChildren pour les RecipeCard)
  const subCategoryArticleVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 18,
        when: "beforeChildren", 
        staggerChildren: 0.05
      } 
    },
  };

  // Variants pour les éléments individuels (titres, etc. si utilisés avec itemVariants directement)
  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, 
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100, 
        damping: 15, 
      },
    },
  };

  // Variants pour les cartes de recette
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0,
      transition: {
        type: "spring",
        stiffness: 150, 
        damping: 20, 
      }
    },
  };

  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        console.log("🔄 Chargement des recettes...");
        const res = await axios.get("/recettes");
        const data = res.data;
        console.log("✅ Données reçues:", data);
        const regroupées = {};
        data.forEach(recette => {
          const cat = recette.categorie?.trim() || "Autres";
          const sousCat = recette.sousCategorie?.trim() || "Divers";

          if (!regroupées[cat]) regroupées[cat] = {};
          if (!regroupées[cat][sousCat]) regroupées[cat][sousCat] = [];
          regroupées[cat][sousCat].push(recette);
        });
        console.log("📚 Données restructurées:", regroupées);
        setRecettes(regroupées);
        
        // Once data is loaded, trigger the main container animation
        controls.start("visible");

      } catch (err) {
        console.error("❌ Erreur lors du chargement:", err);
        if (err.response) {
            setError(`Erreur du serveur: ${err.response.status} - ${err.response.data.message || 'Quelque chose s\'est mal passé'}`);
        } else if (err.request) {
            setError('Impossible de se connecter au serveur. Vérifiez votre connexion internet ou que le backend est démarré.');
        } else {
            setError(`Erreur inattendue: ${err.message}`);
        }
        toast.error("Erreur de chargement des recettes");
      } finally {
        setLoading(false);
      }
    };
    fetchRecettes();
  }, [controls]);

  if (loading) {
    return (
      <>
        <Navbar />
        <RecettesContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
          <p>Chargement des recettes...</p>
        </RecettesContainer>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <RecettesContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ color: 'var(--accent-red)' }}>Erreur: {error}</p>
        </RecettesContainer>
      </>
    );
  }

  if (Object.keys(recettes).length === 0) {
    return (
      <>
        <Navbar />
        <RecettesContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
          <p>Aucune recette trouvée pour le moment.</p>
        </RecettesContainer>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <RecettesContainer
        variants={mainContainerVariants}
        initial="hidden"
        animate={controls} 
      >
        <BlobBackground
          src={Blob1}
          alt="Animated Background Blob"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }} 
        />

        <PageTitle variants={itemVariants}>Toutes les Recettes</PageTitle>

        {Object.entries(recettes).map(([categorie, sousCategoriesMap]) => {
          const catColor = categoryColors[categorie] || categoryColors['Autres'];

          return (
            <CategorySection 
              key={categorie} 
              variants={categorySectionVariants} 
              initial="hidden" 
              animate="visible"
            > 
              <CategoryTitle $color={catColor}>{categorie}</CategoryTitle>

              {Object.entries(sousCategoriesMap).map(([sousCategorie, listeRecettes]) => {
                const sousCatColor = sousCategoryColors[sousCategorie] || sousCategoryColors['Divers'];

                return (
                  <SubCategoryArticle 
                    key={sousCategorie} 
                    $color={sousCatColor}
                    variants={subCategoryArticleVariants} 
                    initial="hidden"
                    animate="visible"
                    whileHover={{ 
                      scale: 1.01, 
                      boxShadow: `0 8px 15px -3px ${sousCatColor.replace('var(', '').replace(')', '').split(',')[0]}30`,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                  > 
                    <SubCategoryTitle $color={sousCatColor}>
                      {sousCategorie} ({listeRecettes.length} recettes)
                    </SubCategoryTitle>
                    <RecipeGrid> 
                      {listeRecettes.map((recette) => {
                        const randomImage = cardBackgroundImages[Math.floor(Math.random() * cardBackgroundImages.length)];
                        // Select a random hover animation for this card
                        const randomHoverAnimation = hoverAnimations[Math.floor(Math.random() * hoverAnimations.length)];

                        return (
                          <RecipeCard
                            key={recette._id}
                            variants={cardVariants} 
                            initial="hidden"
                            animate="visible"
                            whileHover={randomHoverAnimation} // Use the random hover animation here
                            whileTap={{ scale: 0.98 }}
                          >
                            <RecipeCardBackground $imageUrl={randomImage} />

                            <RecipeName>{recette.nom}</RecipeName>
                            <div style={{ marginBottom: 'var(--space-2)' }}>
                              {recette.categorie && <Tag $isCategory>{recette.categorie}</Tag>}
                              {recette.sousCategorie && <Tag>{recette.sousCategorie}</Tag>}
                            </div>
                            {recette.description && <RecipeDescription>{recette.description}</RecipeDescription>}
                          </RecipeCard>
                        );
                      })}
                    </RecipeGrid>
                  </SubCategoryArticle>
                );
              })}
            </CategorySection>
          );
        })}
      </RecettesContainer>
    </>
  );
};

export default Recettes;