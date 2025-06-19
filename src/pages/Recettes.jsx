import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { motion } from 'framer-motion'; // Réactiver l'import de motion
import Navbar from "../components/Navbar";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";

// --- Styled Components pour la Page Recettes ---

// Réactiver motion pour tous les styled-components qui utiliseront des props Framer Motion
const RecettesContainer = styled(motion.div)` 
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--neutral-50, #F9FAFB);
  color: var(--neutral-800, #333333);

  padding-top: calc(var(--space-8) + 60px);
  padding-left: calc(var(--space-4) + 200px); 
  padding-right: var(--space-4);
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;

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
  /* Ces opacités et transforms sont gérées par Framer Motion, mais les laisser en fallback n'est pas un problème */
  opacity: 1; 
  transform: translateY(0);

  @media (max-width: 768px) {
    font-size: var(--text-3xl);
    margin-bottom: var(--space-4);
  }
`;

const CategorySection = styled(motion.section)` 
  width: 100%;
  max-width: 1000px; 
  margin-top: var(--space-8);
  padding: 0 var(--space-4);
  box-sizing: border-box;
  text-align: left;
  margin-bottom: var(--space-8);
  opacity: 1;
  transform: translateY(0);

  &:first-of-type {
    margin-top: var(--space-4);
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
  opacity: 1;
  transform: translateY(0);

  @media (max-width: 768px) {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-4);
  }
`;

const SubCategoryArticle = styled(motion.article)` 
  margin-left: var(--space-4);
  margin-top: var(--space-6);
  border-left: 5px solid ${props => props.$color || 'var(--soft-blue-500)'};
  padding-left: var(--space-6);
  border-radius: var(--radius-md);
  background-color: var(--soft-green-50, #F0FFF0);
  box-shadow: var(--shadow-sm);
  padding-top: var(--space-4);
  padding-bottom: var(--space-4);
  margin-bottom: var(--space-6);
  position: relative;
  z-index: 1;
  opacity: 1;
  transform: translateY(0);

  @media (max-width: 768px) {
    margin-left: var(--space-2);
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
  opacity: 1;
  transform: translateY(0);

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
  opacity: 1;
  transform: translateY(0);
`;

const RecipeCard = styled(motion.article)` 
  background-color: rgba(var(--soft-green-100-rgb, 220, 255, 220), 0.95);
  padding: var(--space-6);
  border-radius: var(--radius-lg);
  border: 1px solid var(--soft-green-300, #ADD8E6);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  position: relative;
  overflow: hidden;
  min-height: 180px;
  z-index: 1; 
  opacity: 1;
  transform: translateY(0);

  &:hover {
    box-shadow: var(--shadow-md);
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
  color: var(--neutral-0);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 600;
  white-space: nowrap;
  display: inline-block;
  margin-right: var(--space-2);
  margin-bottom: var(--space-2);
  opacity: 1;
  transform: translateY(0);
`;

// --- Composant Recettes ---

const Recettes = () => {
  const [recettes, setRecettes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryColors = {
    'Entrées': 'var(--soft-green-700, #2E8B57)',
    'Plats principaux': 'var(--soft-blue-700, #3A6690)',
    'Desserts': 'var(--red-500, #D32F2F)',
    'Boissons': 'var(--purple-500, #8A2BE2)',
    'Apéritifs': 'var(--orange-500, #FF7F50)',
    'Salades': 'var(--green-500, #4CAF50)',
    'Soupes': 'var(--brown-500, #A0522D)',
    'Pâtisseries': 'var(--pink-500, #FF69B4)',
    'Autres': 'var(--neutral-600, #757575)',
  };

  const sousCategoryColors = {
    'Végétarien': 'var(--soft-green-600, #4CAF50)',
    'Végétalien': 'var(--soft-green-500, #66BB6A)',
    'Sans gluten': 'var(--soft-blue-400, #64B5F6)',
    'Rapide': 'var(--orange-400, #FFA726)',
    'Facile': 'var(--yellow-400, #FFCA28)',
    'Difficile': 'var(--red-600, #D32F2F)',
    'Traditionnel': 'var(--brown-400, #D2B48C)',
    'Moderne': 'var(--purple-400, #9575CD)',
    'Divers': 'var(--neutral-500, #9E9E9E)',
  };

  // Réactiver les variantes
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
        setError(err.message);
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
          <p style={{ color: 'var(--red-500, red)' }}>Erreur: {error}</p>
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
        variants={containerVariants} // Réactivé
        initial="hidden"            // Réactivé
        animate="visible"           // Réactivé
      >
        <PageTitle variants={itemVariants}>Toutes les Recettes</PageTitle> {/* Réactivé */}

        {Object.entries(recettes).map(([categorie, sousCategoriesMap]) => {
          const catColor = categoryColors[categorie] || categoryColors['Autres'];

          return (
            <CategorySection key={categorie} variants={itemVariants}> {/* Réactivé */}
              <CategoryTitle $color={catColor}>{categorie}</CategoryTitle>

              {Object.entries(sousCategoriesMap).map(([sousCategorie, listeRecettes]) => {
                const sousCatColor = sousCategoryColors[sousCategorie] || sousCategoryColors['Divers'];

                return (
                  <SubCategoryArticle
                    key={sousCategorie}
                    $color={sousCatColor}
                    variants={itemVariants} // Réactivé
                  >
                    <SubCategoryTitle $color={sousCatColor}>
                      {sousCategorie} ({listeRecettes.length} recettes)
                    </SubCategoryTitle>
                    <RecipeGrid variants={containerVariants}> {/* Réactivé pour staggerChildren */}
                      {listeRecettes.map((recette) => (
                        <RecipeCard
                          key={recette._id}
                          variants={cardVariants} // Réactivé
                          whileHover={{
                            y: -5,
                            boxShadow: `0 8px 16px ${sousCatColor}33`,
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