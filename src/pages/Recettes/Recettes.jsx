

// src/pages/Recettes/Recettes.jsx

import React, { useEffect, useState } from "react";
import { useAnimation } from 'framer-motion';
import axios from "../../api/axiosInstance";
import { toast } from "react-toastify";

// Importez les styles du fichier dédié
import {
  RecettesContainer, PageTitle, CategorySection, CategoryTitle,
  SubCategoryArticle, SubCategoryTitle, RecipeGrid, RecipeCard,
  RecipeName, RecipeDescription, Tag, BlobBackground
} from './Recettes.styles';

// Importez les données statiques du fichier dédié
import {
  categoryColors, sousCategoryColors, hoverAnimations
} from '../../data/recettesData';

// Importez le blob
import Blob1 from '../../assets/images/svg_blobs/blob (1).svg';

// --- Importez toutes vos images décoratives ici ---
// J'ai sélectionné celles qui semblent les plus adaptées pour un fond décoratif
// N'hésitez pas à ajuster cette liste selon vos préférences pour le style "décoratif"
import Avocado from '../../assets/images/Avocado.jpg';
import BigTomato from '../../assets/images/BigTomato.jpg';
import Cake from '../../assets/images/Cake.webp';
import Carrot from '../../assets/images/Carrot.jpg';
import Dish1 from '../../assets/images/Dish1.jpg';
import EvieSab from '../../assets/images/evie-s-aBvM_cKYMxc-unsplash.jpg';
import FoodBasket from '../../assets/images/Food basket.jpg';
import FoodItems from '../../assets/images/FoodItems.jpg';
import FruitsVegetables from '../../assets/images/FruitsVegetables.jpg';
import HerbsGarlic from '../../assets/images/HerbsGarlic.jpg';
import MathewSchwartz from '../../assets/images/mathew-schwartz-wPR7ilcymGg-unsplash.jpg';
import NotebookRecipe from '../../assets/images/NotebookRecipe.jpg';
import NotebookSpaghetti from '../../assets/images/NotebookSpaghetti.jpg';
import NotebookTomato from '../../assets/images/NotebookTomato.jpg';
import Pomegranate from '../../assets/images/Pomegranate.jpg';
import ShakeThePan from '../../assets/images/ShakeThePan.png';
import SomeDish from '../../assets/images/SomeDish.jpg';
import SomeSalad from '../../assets/images/SomeSalad.jpg';
import Tomato from '../../assets/images/Tomato.jpg';
import TomatoIcon from '../../assets/images/TomatoIcon.jpg';
import TomatoNav from '../../assets/images/TomatoNav.jpg';
import Vegetables from '../../assets/images/Vegetables.jpg';
import WhiteBackground from '../../assets/images/WhiteBackground.jpg';
import WhiteBackground2 from '../../assets/images/WhiteBackground2.jpg';
import WhiteBackground3 from '../../assets/images/WhiteBackground3.jpg';

import WhiteBackground5 from '../../assets/images/WhiteBackground5.png';
import WhiteBackground6 from '../../assets/images/WhiteBackground6.jpg';
import WhiteBackground7 from '../../assets/images/WhiteBackground7.avif';
import WhiteBackground8 from '../../assets/images/WhiteBackground8.png';

// Array de toutes les images décoratives importées
const decorativeImages = [
  Avocado, BigTomato, Cake, Carrot, Dish1, EvieSab, FoodBasket, FoodItems,
  FruitsVegetables, HerbsGarlic, MathewSchwartz, NotebookRecipe,
  NotebookSpaghetti, NotebookTomato, Pomegranate, ShakeThePan, SomeDish,
  SomeSalad, Tomato, TomatoIcon, TomatoNav, Vegetables, WhiteBackground,
  WhiteBackground2, WhiteBackground3, WhiteBackground5,
  WhiteBackground6, WhiteBackground7, WhiteBackground8
];

const Recettes = () => {
  const [recettes, setRecettes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCardHovered, setIsCardHovered] = useState(false);

  const controls = useAnimation();
  const blobControls = useAnimation();

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

  useEffect(() => {
    if (isCardHovered) {
      blobControls.start({
        scale: [0.1, 3],
        x: ['-50%', '10%'],
        y: ['-50%', '20%'],
        opacity: [0.5, 0.8],
        rotate: [0, 360],
        transition: {
          duration: 2,
          ease: "easeOut",
          repeat: Infinity,
          repeatType: "reverse",
          when: "beforeChildren"
        }
      });
    } else {
      blobControls.stop();
      blobControls.start({
        scale: 0.1,
        x: '-50%',
        y: '-50%',
        opacity: 0,
        rotate: 0,
        transition: {
          duration: 1,
          ease: "easeIn"
        }
      });
    }
  }, [isCardHovered, blobControls]);

  if (loading) {
    return (
      <RecettesContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p>Chargement des recettes...</p>
      </RecettesContainer>
    );
  }

  if (error) {
    return (
      <RecettesContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ color: 'var(--accent-red)' }}>Erreur: {error}</p>
      </RecettesContainer>
    );
  }

  if (Object.keys(recettes).length === 0) {
    return (
      <RecettesContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <p>Aucune recette trouvée pour le moment.</p>
      </RecettesContainer>
    );
  }

  return (
    <RecettesContainer
      variants={mainContainerVariants}
      initial="hidden"
      animate={controls}
    >
      <BlobBackground
        src={Blob1}
        alt="Animated Background Blob"
        animate={blobControls}
        initial={{ scale: 0.1, opacity: 0, x: '-50%', y: '-50%' }}
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
                      // Sélectionne une image décorative aléatoire de la liste
                      const randomDecorativeImage = decorativeImages[Math.floor(Math.random() * decorativeImages.length)];
                      const randomHoverAnimation = hoverAnimations[Math.floor(Math.random() * hoverAnimations.length)];

                      return (
                        <RecipeCard
                          key={recette._id}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={randomHoverAnimation}
                          whileTap={{ scale: 0.98 }}
                          onMouseEnter={() => setIsCardHovered(true)}
                          onMouseLeave={() => setIsCardHovered(false)}
                          $backgroundImage={randomDecorativeImage} // <-- PASSE L'IMAGE ALÉATOIRE
                        >
                          <div className="recipe-card-content">
                            <RecipeName>{recette.nom}</RecipeName>
                            <div style={{ marginBottom: 'var(--space-2)' }}>
                              {recette.categorie && <Tag $isCategory>{recette.categorie}</Tag>}
                              {recette.sousCategorie && <Tag>{recette.sousCategorie}</Tag>}
                            </div>
                            {recette.description && <RecipeDescription>{recette.description}</RecipeDescription>}
                          </div>
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
  );
};

export default Recettes;