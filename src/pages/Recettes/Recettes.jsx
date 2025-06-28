// src/pages/Recettes/Recettes.jsx (MODIFIÉ)

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useAnimation, AnimatePresence } from 'framer-motion'; // Importe AnimatePresence
import axios from "../../api/axiosInstance";
import DefaultRecipeImage from '../../assets/images/default_recipe_image.jpg';
import {
  RecettesContainer,
  PageTitle,
  RecipeGrid,
  RecipeMiniCard, // Nouveau nom pour les cartes compactes
  RecipeMiniName, // Nouveau nom pour le titre compact
  RecipeImage,    // Nouveau pour les images de carte
  // Importation des éléments pour la modale
  ModalOverlay,
  ModalContent,
  CloseButton,
  ModalImage,
  RecipeNameDetail,
  RecipeDescriptionDetail,
  RecipeDetailsSection,
  Tag,
  // Nouveaux imports pour les filtres de catégorie
  CategoryFilterContainer,
  CategoryButton,
} from './Recettes.styles';

import {
  categoryColors,
  hoverAnimations,
  
} from '../../data/recettesData';

// --- Nouveau Styled Component pour les messages d'état (inchangé) ---
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

// --- Composant Recettes ---
const Recettes = () => {
  const [recettes, setRecettes] = useState({}); // Les recettes regroupées par catégorie
  const [allRecettesFlat, setAllRecettesFlat] = useState([]); // Toutes les recettes à plat
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Toutes"); // Nouvelle état pour la catégorie active
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Pour la modale de détail

  const controls = useAnimation();

  // Animations (conservées et adaptées si besoin)
  const mainContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  const cardVariants = { // Adaptées pour les mini-cartes
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1, scale: 1, y: 0,
      transition: { type: "spring", stiffness: 150, damping: 20 }
    },
  };

  // Variantes pour la modale
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
        // Initialiser "Toutes" comme une catégorie contenant toutes les recettes
        const allRecipesArray = [];

        data.forEach(recette => {
          const cat = recette.categorie?.trim() || "Autres";
          const sousCat = recette.sousCategorie?.trim() || "Divers";

          if (!regroupées[cat]) regroupées[cat] = {};
          if (!regroupées[cat][sousCat]) regroupées[cat][sousCat] = [];
          regroupées[cat][sousCat].push(recette);

          allRecipesArray.push(recette); // Ajouter à la liste "Toutes"
        });

        // Ajout de la catégorie "Toutes" au début de l'objet regroupées
        setRecettes({ "Toutes": { "Tous": allRecipesArray }, ...regroupées });
        setAllRecettesFlat(allRecipesArray); // Stocke la liste à plat pour un filtrage facile
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


  // Fonction pour gérer le clic sur une catégorie
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  // Fonction pour ouvrir la modale de détail
  const openRecipeModal = useCallback((recipe) => {
    setSelectedRecipe(recipe);
  }, []);

  // Fonction pour fermer la modale de détail
  const closeRecipeModal = useCallback(() => {
    setSelectedRecipe(null);
  }, []);

  // Filtrer les recettes basées sur la catégorie active
  const filteredRecettes = useMemo(() => {
    if (activeCategory === "Toutes") {
      // Retourne une structure similaire pour la catégorie "Toutes"
      return { "Toutes": { "Tous": allRecettesFlat } };
    }
    return { [activeCategory]: recettes[activeCategory] || {} };
  }, [activeCategory, recettes, allRecettesFlat]);

  // Récupérer toutes les catégories uniques pour les boutons de filtre
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
    >
      <PageTitle variants={itemVariants}>Toutes les Recettes</PageTitle>

      {/* NOUVEAU: Boutons de filtre par catégorie */}
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

      {/* Affichage de la grille de recettes pour la catégorie active */}
      {Object.entries(filteredRecettes).map(([categorie, sousCategoriesMap]) => {
        // Ignorer la sous-catégorie si on est sur "Toutes" et prendre directement la liste plate
        const recipesToDisplay = activeCategory === "Toutes"
          ? sousCategoriesMap["Tous"]
          : Object.values(sousCategoriesMap).flat(); // Utilise flat pour toutes les sous-catégories

        if (!recipesToDisplay || recipesToDisplay.length === 0) {
          return <StatusMessage key={categorie}>Aucune recette dans cette catégorie.</StatusMessage>;
        }

        return (
          // Pas de CategorySection/SubCategoryArticle comme avant, directement la grille
          <RecipeGrid key={categorie}>
            {recipesToDisplay.map((recette) => {
              const randomHoverAnimation = hoverAnimations[Math.floor(Math.random() * hoverAnimations.length)];
              // Utilise une image aléatoire si recette.imageUrl n'existe pas
             const imageUrl = recette.imageUrl || DefaultRecipeImage;

              return (
                <RecipeMiniCard
                  key={recette._id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={randomHoverAnimation}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openRecipeModal(recette)} // Ouvre la modale au clic
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

      {/* Modale de détail de recette */}
      <AnimatePresence>
        {selectedRecipe && (
          <ModalOverlay
            variants={modalOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeRecipeModal} // Fermer en cliquant sur l'overlay
          >
            <ModalContent
              variants={modalContentVariants}
              onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique dans la modale
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