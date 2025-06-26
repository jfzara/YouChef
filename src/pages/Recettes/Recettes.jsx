// src/pages/Recettes/Recettes.jsx

import React, { useEffect, useState } from "react";
import { useAnimation } from 'framer-motion';
import axios from "../../api/axiosInstance";
// import { toast } from "react-toastify"; // Supprimé car le toast n'est plus utilisé

import {
  RecettesContainer, PageTitle, CategorySection, CategoryTitle,
  SubCategoryArticle, SubCategoryTitle, RecipeGrid, RecipeCard,
  RecipeName, RecipeDescription, Tag
} from './Recettes.styles';

import {
  categoryColors, sousCategoryColors, hoverAnimations
} from '../../data/recettesData';

// --- Nouveau Styled Component pour les messages d'état ---
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
  const [recettes, setRecettes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const controls = useAnimation();


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
        const res = await axios.get("/recettes/all");
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
            setError('Oups ! Nous n\'arrivons pas à charger les recettes pour le moment. Veuillez vérifier votre connexion internet et réessayer plus tard.');
        } else {
            setError(`Erreur inattendue: ${err.message}`);
        }
        // toast.error("Erreur de chargement des recettes", { // Cette ligne a été supprimée
        //   toastId: "recettes-load-error"
        // });
      } finally {
        setLoading(false);
      }
    };
    fetchRecettes();
  }, [controls]);

    
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
                      
                      const randomHoverAnimation = hoverAnimations[Math.floor(Math.random() * hoverAnimations.length)];

                      return (
                        <RecipeCard
                          key={recette._id}
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={randomHoverAnimation}
                          whileTap={{ scale: 0.98 }}
                          
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