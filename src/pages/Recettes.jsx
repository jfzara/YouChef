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
  background-color: var(--soft-green-100);
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
  background-image: url(${props => props.$imageUrl});
  background-size: cover;
  background-position: center;
  opacity: 0.1; 
  z-index: 1; 
  transition: opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease; /* Ajoutez filter ici */
  filter: brightness(1) hue-rotate(0deg); /* État initial du filtre */

  ${RecipeCard}:hover & {
    opacity: 0.2; 
    transform: scale(1.05); 
    /* Applique un filtre au survol */
    filter: brightness(0.8) hue-rotate(30deg); /* Ajustez les valeurs pour l'effet désiré */
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


const Recettes = () => {
  const [recettes, setRecettes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utilisez useAnimation pour un contrôle explicite de l'animation du conteneur principal
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

  // NOUVEAU: Variants pour le conteneur principal (RecettesContainer)
  // Simplifié pour déboguer l'opacité
  const mainContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.8, // Durée un peu plus longue pour voir l'effet
        ease: "easeOut"
      } 
    },
  };

  // NOUVEAU: Variants pour chaque CategorySection (avec staggerChildren pour ses sous-articles)
  const categorySectionVariants = {
    hidden: { y: 30, opacity: 0 }, // Animation d'entrée pour la section
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        when: "beforeChildren", 
        staggerChildren: 0.15 // Délai pour chaque SubCategoryArticle
      } 
    },
  };

  // NOUVEAU: Variants pour chaque SubCategoryArticle (avec staggerChildren pour les RecipeCard)
  const subCategoryArticleVariants = {
    hidden: { x: -30, opacity: 0 }, // Animation d'entrée pour l'article
    visible: { 
      x: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 18,
        when: "beforeChildren", 
        staggerChildren: 0.05 // Délai pour chaque RecipeCard
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
        
        // Une fois les données chargées, déclencher l'animation du conteneur principal
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
  }, [controls]); // Ajouter controls comme dépendance de useEffect

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
        // Utilisez controls pour démarrer l'animation explicitement
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
              // Initial et animate ne sont pas nécessaires ici si le parent gère le staggerChildren
              // Mais pour le débogage, on peut les ajouter temporairement si la section ne s'affiche pas
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
                    // Idem pour subCategoryArticle
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
                    {/* RecipeGrid n'a pas de variants d'opacité, juste sa structure de colonnes */}
                    <RecipeGrid> 
                      {listeRecettes.map((recette) => {
                        const randomImage = cardBackgroundImages[Math.floor(Math.random() * cardBackgroundImages.length)];

                        return (
                          <RecipeCard
                            key={recette._id}
                            variants={cardVariants} 
                            initial="hidden" // Chaque carte commence cachée
                            animate="visible" // Et s'anime pour devenir visible
                            whileHover={{
                              y: -5,
                              scale: 1.02,
                              rotate: 1,
                              boxShadow: `0 12px 20px -5px ${sousCatColor.replace('var(', '').replace(')', '').split(',')[0]}40`,
                              transition: { type: "spring", stiffness: 300, damping: 25 }
                            }}
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