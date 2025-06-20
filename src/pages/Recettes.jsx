import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navbar from "../components/Navbar";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";

// --- Styled Components pour la Page Recettes ---

const RecettesContainer = styled(motion.div)` 
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--neutral-50); 
  color: var(--neutral-800); 

  padding-top: calc(var(--space-8) + 60px); // Laissez ceci pour l'espace supérieur (si votre Navbar est aussi en haut)


position: absolute;
right: 0;
  padding-right: var(--space-4);
  max-width: 94%;
  box-sizing: border-box;
  overflow-y: auto;

 


  @media (max-width: 768px) {
    padding-top: calc(var(--space-6) + 60px);
    padding-left: var(--space-2); // Réduisez pour les petits écrans si la Navbar disparaît ou change
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


`;

const CategorySection = styled(motion.section)` 
  width: 100%;
  max-width: 1000px; 
  margin-top: var(--space-8);
  padding: 0 var(--space-4);
  box-sizing: border-box;
  text-align: left;
  margin-bottom: var(--space-8);


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
  z-index: 1; 

  /* === DEBUG STYLE === */
  background-color: rgba(255, 255, 0, 0.2) !important; /* Jaune transparent */
  border: 1px solid blue !important; /* Bordure pour le titre de catégorie */
  color: black !important; /* Force le texte à être noir pour la visibilité */
  /* === FIN DEBUG STYLE === */

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
  background-color: var(--soft-green-50); 
  box-shadow: 0 2px 5px rgba(0,0,0,0.05); 
  padding-top: var(--space-4);
  padding-bottom: var(--space-4);
  margin-bottom: var(--space-6);
  position: relative;
  z-index: 1; 



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
  z-index: 1;

 
  @media (max-width: 768px) {
    font-size: var(--text-lg);
  }
`;

const RecipeGrid = styled(motion.div)` 
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
  margin-top: var(--space-4);
  position: relative;
  z-index: 1;


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



  &:hover {
    box-shadow: 0 8px 16px rgba(0,0,0,0.15); 
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

// --- Composant Recettes ---

const Recettes = () => {
  const [recettes, setRecettes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.15, 
        duration: 0.5, 
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 }, 
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120, 
        damping: 18, 
        duration: 0.6, 
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 }, 
    visible: { opacity: 1, scale: 1, y: 0,
      transition: {
        type: "spring",
        stiffness: 150, 
        damping: 20, 
        duration: 0.7, 
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
  }, []);

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
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {/* Commentez variants={itemVariants} pour le débogage */}
  <PageTitle variants={itemVariants} >Toutes les Recettes</PageTitle>

  {Object.entries(recettes).map(([categorie, sousCategoriesMap]) => {
    const catColor = categoryColors[categorie] || categoryColors['Autres'];

    return (
      // === DÉBUG : Commentez aussi variants={itemVariants} ici ===
      <CategorySection key={categorie} /* variants={itemVariants} */> 
        <CategoryTitle $color={catColor}>{categorie}</CategoryTitle>

        {Object.entries(sousCategoriesMap).map(([sousCategorie, listeRecettes]) => {
          const sousCatColor = sousCategoryColors[sousCategorie] || sousCategoryColors['Divers'];

          return (
            // === DÉBUG : Commentez aussi variants={itemVariants} ici ===
            <SubCategoryArticle
              key={sousCategorie}
              $color={sousCatColor}
              /* variants={itemVariants} */ 
            >
              <SubCategoryTitle $color={sousCatColor}>
                {sousCategorie} ({listeRecettes.length} recettes)
              </SubCategoryTitle>
              {/* Laissez variants={containerVariants} sur RecipeGrid pour le stagger des cartes */}
              <RecipeGrid variants={containerVariants}> 
                {listeRecettes.map((recette) => (
                  <RecipeCard
                    key={recette._id}
                    variants={cardVariants} // Laissez ceci actif pour voir si les cartes s'animent
                    whileHover={{
                      y: -5,
                      boxShadow: `0 8px 16px ${sousCatColor.replace('var(', '').replace(')', '').split(',')[0]}33`,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RecipeName>{recette.nom}</RecipeName>
                    <div style={{ marginBottom: 'var(--space-2)' }}>
                      {recette.categorie && <Tag $isCategory>{recette.categorie}</Tag>}
                      {recette.sousCategorie && <Tag>{recette.sousCategorie}</Tag>}
                    </div>
                    {recette.description && <RecipeDescription>{recette.description}</RecipeDescription>}
                  </RecipeCard>
                ))}
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