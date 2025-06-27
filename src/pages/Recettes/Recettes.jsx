// src/pages/Recettes/Recettes.jsx

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useAnimation, AnimatePresence } from 'framer-motion';
import axios from "../../api/axiosInstance";

import {
  RecettesContainer,
  PageTitle,
  RecipeGrid,
  RecipeMiniCard,
  RecipeMiniName,
  RecipeImage,
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalImage,
  RecipeNameDetail,
  RecipeDescriptionDetail,
  RecipeDetailsSection,
  Tag,
  CategoryFilterContainer,
  CategoryButton,
} from './Recettes.styles';

import {
  categoryColors,
  hoverAnimations,
  cardBackgroundImages
} from '../../data/recettesData';

import styled from 'styled-components';
const StatusMessage = styled.p`
  text-align: center;
  color: ${props => props.$isError ? 'var(--color-error)' : 'var(--color-neutral-700)'};
  font-size: var(--text-lg);
  padding: var(--space-4);
  max-width: 600px;
  margin: auto;

  @media (max-width: 768px) {
    font-size: var(--text-base);
    max-width: 85vw;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Recettes = () => {
  const [recettes, setRecettes] = useState({});
  const [allRecettesFlat, setAllRecettesFlat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Toutes");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const controls = useAnimation();

  const mainContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { type: "spring", stiffness: 150, damping: 20 }
    },
  };

  const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  const modalContentVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: { y: "100vh", opacity: 0, transition: { duration: 0.2 } }
  };

  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        console.log("🔄 Chargement des recettes...");
        const res = await axios.get("/recettes/all");
        const data = res.data;
        console.log("✅ Données reçues:", data);

        const regroupées = {};
        const allRecipesArray = [];

        data.forEach(recette => {
          const cat = recette.categorie?.trim() || "Autres";
          const sousCat = recette.sousCategorie?.trim() || "Divers";

          if (!regroupées[cat]) regroupées[cat] = {};
          if (!regroupées[cat][sousCat]) regroupées[cat][sousCat] = [];
          regroupées[cat][sousCat].push(recette);

          allRecipesArray.push(recette);
        });

        setRecettes({ "Toutes": { "Tous": allRecipesArray }, ...regroupées });
        setAllRecettesFlat(allRecipesArray);
        controls.start("visible");

      } catch (err) {
        console.error("❌ Erreur lors du chargement:", err);
        if (err.response) {
          setError(`Erreur du serveur: ${err.response.status} - ${err.response.data.message || 'Quelque chose s\'est mal passé'}`);
        } else if (err.request) {
          setError('Oups ! Nous n\'arrivons pas à charger les recettes pour le moment. Veuillez vérifier votre connexion internet et réessayer plus tard.');
        } else {
          setError(`Erreur inattendue: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRecettes();
  }, [controls]);

  // --- NOUVEAU useEffect pour gérer le style du body ---
  useEffect(() => {
    if (selectedRecipe) {
      document.body.style.overflow = 'hidden'; // Cache la barre de défilement
      document.body.style.filter = 'blur(5px) brightness(0.7)'; // Applique le flou et l'assombrissement
      document.body.style.transition = 'filter 0.3s ease-in-out'; // Transition douce
      document.body.style.pointerEvents = 'none'; // Désactive les événements sur le fond flouté

      // Calculer la largeur de la barre de défilement pour éviter le "saut" de contenu
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      document.body.style.overflow = ''; // Rétablit le défilement
      document.body.style.filter = ''; // Retire le flou
      document.body.style.transition = ''; // Retire la transition
      document.body.style.pointerEvents = ''; // Rétablit les événements
      document.body.style.paddingRight = ''; // Retire le padding
    }
    // Nettoyage à l'unmount ou si la recette est désélectionnée
    return () => {
      document.body.style.overflow = '';
      document.body.style.filter = '';
      document.body.style.transition = '';
      document.body.style.pointerEvents = '';
      document.body.style.paddingRight = '';
    };
  }, [selectedRecipe]);
  // ----------------------------------------------------


  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  const openRecipeModal = useCallback((recipe) => {
    setSelectedRecipe(recipe);
  }, []);

  const closeRecipeModal = useCallback(() => {
    setSelectedRecipe(null);
  }, []);

  const filteredRecettes = useMemo(() => {
    if (activeCategory === "Toutes") {
      return { "Toutes": { "Tous": allRecettesFlat } };
    }
    return { [activeCategory]: recettes[activeCategory] || {} };
  }, [activeCategory, recettes, allRecettesFlat]);

  const availableCategories = useMemo(() => {
    return Object.keys(recettes);
  }, [recettes]);


  if (loading) {
    return (
      <RecettesContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <StatusMessage>Chargement des recettes...</StatusMessage>
      </RecettesContainer>
    );
  }

  if (error) {
    return (
      <RecettesContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <StatusMessage $isError>{error}</StatusMessage>
      </RecettesContainer>
    );
  }

  if (Object.keys(recettes).length === 0) {
    return (
      <RecettesContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <StatusMessage>Aucune recette trouvée pour le moment.</StatusMessage>
      </RecettesContainer>
    );
  }

  return (
    <RecettesContainer
      variants={mainContainerVariants}
      initial="hidden"
      animate={controls}
      // --- MODIFICATION ICI : On enlève la prop $isModalOpen de RecettesContainer ---
      // Elle est désormais gérée directement sur le body via useEffect
    >
      <PageTitle variants={itemVariants}>Toutes les Recettes</PageTitle>

      <CategoryFilterContainer>
        {availableCategories.map((category) => (
          <CategoryButton
            key={category}
            onClick={() => handleCategoryChange(category)}
            $isActive={activeCategory === category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryFilterContainer>

      {Object.entries(filteredRecettes).map(([categorie, sousCategoriesMap]) => {
        const recipesToDisplay = activeCategory === "Toutes"
          ? sousCategoriesMap["Tous"]
          : Object.values(sousCategoriesMap).flat();

        if (!recipesToDisplay || recipesToDisplay.length === 0) {
          return <StatusMessage key={categorie}>Aucune recette dans cette catégorie.</StatusMessage>;
        }

        return (
          <RecipeGrid key={categorie}>
            {recipesToDisplay.map((recette) => {
              const randomHoverAnimation = hoverAnimations[Math.floor(Math.random() * hoverAnimations.length)];
              const imageUrl = recette.imageUrl || cardBackgroundImages[Math.floor(Math.random() * cardBackgroundImages.length)];

              return (
                <RecipeMiniCard
                  key={recette._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={randomHoverAnimation}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openRecipeModal(recette)}
                >
                  <div className="image-container">
                    <RecipeImage src={imageUrl} alt={recette.nom} />
                  </div>
                  <div className="recipe-info">
                    <RecipeMiniName>{recette.nom}</RecipeMiniName>
                  </div>
                </RecipeMiniCard>
              );
            })}
          </RecipeGrid>
        );
      })}

      <AnimatePresence>
        {selectedRecipe && (
          <ModalOverlay
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeRecipeModal}
          >
            <ModalContent
              variants={modalContentVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeRecipeModal}>×</CloseButton>
              {selectedRecipe.imageUrl && (
                <ModalImage src={selectedRecipe.imageUrl} alt={selectedRecipe.nom} />
              )}
              <RecipeNameDetail>{selectedRecipe.nom}</RecipeNameDetail>

              <div style={{ marginBottom: 'var(--space-4)', textAlign: 'center' }}>
                {selectedRecipe.categorie && <Tag $isCategory>{selectedRecipe.categorie}</Tag>}
                {selectedRecipe.sousCategorie && <Tag>{selectedRecipe.sousCategorie}</Tag>}
              </div>

              {selectedRecipe.description && (
                <RecipeDescriptionDetail>{selectedRecipe.description}</RecipeDescriptionDetail>
              )}

              {selectedRecipe.ingredients && selectedRecipe.ingredients.length > 0 && (
                <RecipeDetailsSection>
                  <h3>Ingrédients</h3>
                  <ul>
                    {selectedRecipe.ingredients.map((ing, index) => (
                      <li key={index}>{ing}</li>
                    ))}
                  </ul>
                </RecipeDetailsSection>
              )}

              {selectedRecipe.etapes && selectedRecipe.etapes.length > 0 && (
                <RecipeDetailsSection>
                  <h3>Préparation</h3>
                  <ol>
                    {selectedRecipe.etapes.map((etape, index) => (
                      <li key={index}>{etape}</li>
                    ))}
                  </ol>
                </RecipeDetailsSection>
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </RecettesContainer>
  );
};

export default Recettes;