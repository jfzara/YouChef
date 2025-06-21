// src/pages/Recettes/Recettes.jsx

import React, { useEffect, useState } from "react";
import { useAnimation } from 'framer-motion';
// import Navbar from "../../components/Navbar/Navbar"; // <-- SUPPRIMEZ CETTE LIGNE
import axios from "../../api/axiosInstance";
import { toast } from "react-toastify";

// Importez les styles du fichier dédié
import { 
  RecettesContainer, PageTitle, CategorySection, CategoryTitle, 
  SubCategoryArticle, SubCategoryTitle, RecipeGrid, RecipeCard, 
  RecipeCardBackground, RecipeName, RecipeDescription, Tag, BlobBackground 
} from './Recettes.styles';

// Importez les données statiques du fichier dédié
import { 
  cardBackgroundImages, categoryColors, sousCategoryColors, hoverAnimations 
} from '../../data/recettesData';

// Importez le blob (si non géré par recettesData.js, car c'est une seule image spécifique)
import Blob1 from '../../assets/images/svg_blobs/blob (1).svg'; 

const Recettes = () => {
  const [recettes, setRecettes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const controls = useAnimation();

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
                          <RecipeCardBackground $imageUrl={randomImage} />

                          <RecipeName>{recette.nom}</RecipeName>
                          <div style={{ marginBottom: 'var(--space-2)' }}>
                            {recette.categorie && <Tag $isCategory>{recette.categorie}</Tag>}
                            {recette.categorie && <Tag>{recette.sousCategorie}</Tag>} {/* Correction pour afficher sousCategorie ici */}
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
  );
};

export default Recettes;