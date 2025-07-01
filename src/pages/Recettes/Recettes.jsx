import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useAnimation, AnimatePresence } from 'framer-motion';
import axios from "../../api/axiosInstance";
import DefaultRecipeImage from '../../assets/images/default_recipe_image.jpg';
import Skeleton from 'react-loading-skeleton'; // <-- Importez Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // <-- Importez le CSS des skeletons

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
    StatusMessage, // <--- Assurez-vous que StatusMessage est importé
} from './Recettes.styles';

import {
    hoverAnimations,
} from '../../data/recettesData';

// Plus besoin d'importer styled ici car StatusMessage est déjà dans Recettes.styles
// import styled from 'styled-components';

const Recettes = () => {
    const [recettes, setRecettes] = useState({});
    const [allRecettesFlat, setAllRecettesFlat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState("Toutes");
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [hoveredRecipeId, setHoveredRecipeId] = useState(null);

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

                    if (!regroupées.hasOwnProperty(cat)) regroupées[cat] = {};
                    if (!regroupées[cat].hasOwnProperty(sousCat)) regroupées[cat][sousCat] = [];
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
                    // Ce message sera écrasé par celui d'axiosInstance pour les ERR_NETWORK ou ECONNABORTED
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

    const handleCategoryChange = useCallback((category) => {
        setActiveCategory(category);
    }, []);

    const openRecipeModal = useCallback((recipe) => {
        setSelectedRecipe(recipe);
    }, []);

    const closeRecipeModal = useCallback(() => {
        setSelectedRecipe(null);
    }, []);

    const handleMouseEnter = useCallback((id) => {
        setHoveredRecipeId(id);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredRecipeId(null);
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

    // Rendu des skeletons pendant le chargement
    if (loading) {
        return (
            <RecettesContainer style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                <PageTitle><Skeleton width={300} height={40} /></PageTitle>

                <CategoryFilterContainer>
                    {Array.from({ length: 4 }).map((_, i) => ( // 4 skeletons pour les boutons de catégorie
                        <Skeleton key={`cat-btn-skeleton-${i}`} width={120} height={45} style={{ borderRadius: '9999px' }} />
                    ))}
                </CategoryFilterContainer>

                <RecipeGrid>
                    {Array.from({ length: 9 }).map((_, i) => ( // 9 skeletons pour les cartes de recettes
                        <RecipeMiniCard key={`recipe-skeleton-${i}`} $anyCardHovered={false} $isHovered={false}>
                            <div className="image-container">
                                <Skeleton height="100%" /> {/* Image skeleton */}
                            </div>
                            <div className="recipe-info">
                                <Skeleton width="80%" height={20} style={{ marginBottom: '5px' }} /> {/* Nom de la recette skeleton */}
                                <Skeleton width="60%" height={15} /> {/* Catégorie/info additionnelle skeleton */}
                            </div>
                        </RecipeMiniCard>
                    ))}
                </RecipeGrid>
                <StatusMessage>
                    Nos chefs sont en cuisine... Un instant, les recettes arrivent !
                </StatusMessage>
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
                <StatusMessage>Aucune recette trouvée pour le moment. Revenez bientôt pour de nouvelles inspirations !</StatusMessage>
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
                            const imageUrl = recette.imageUrl || DefaultRecipeImage;
                            const isHovered = hoveredRecipeId === recette._id;

                            return (
                                <RecipeMiniCard
                                    key={recette._id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover={randomHoverAnimation}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => openRecipeModal(recette)}
                                    onMouseEnter={() => handleMouseEnter(recette._id)}
                                    onMouseLeave={handleMouseLeave}
                                    $isHovered={isHovered}
                                    $anyCardHovered={hoveredRecipeId !== null}
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