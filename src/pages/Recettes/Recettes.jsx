import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useAnimation, AnimatePresence } from 'framer-motion';
import axios from "../../api/axiosInstance";
import DefaultRecipeImage from '../../assets/images/default_recipe_image.jpg';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
    StatusMessage,
} from './Recettes.styles';

import {
    hoverAnimations,
} from '../../data/recettesData';

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
        const fetchRecettes = async () => { // Pas d'accent ici
            try {
                console.log("🔄 Chargement des recettes...");
                const res = await axios.get("/recettes/all");
                const data = res.data;
                console.log("✅ Donnees recues:", data); // Pas d'accent ici

                const regroupees = {}; // Pas d'accent ici
                const allRecipesArray = [];

                data.forEach(recette => {
                    const cat = recette.categorie?.trim() || "Autres";
                    const sousCat = recette.sousCategorie?.trim() || "Divers";

                    // Utilisation correcte de hasOwnProperty
                    if (!Object.prototype.hasOwnProperty.call(regroupees, cat)) regroupees[cat] = {};
                    if (!Object.prototype.hasOwnProperty.call(regroupees[cat], sousCat)) regroupees[cat][sousCat] = [];
                    regroupees[cat][sousCat].push(recette);

                    allRecipesArray.push(recette);
                });

                setRecettes({ "Toutes": { "Tous": allRecipesArray }, ...regroupees }); // Pas d'accent ici
                setAllRecettesFlat(allRecipesArray);
                controls.start("visible");

            } catch (err) {
                console.error("❌ Erreur lors du chargement:", err); // Pas d'accent ici
                if (err.response) {
                    setError(`Erreur du serveur: ${err.response.status} - ${err.response.data.message || 'Quelque chose s\'est mal passe'}`); // Pas d'accent ici
                } else if (err.request) {
                    setError('Oups ! Nous n\'arrivons pas a charger les recettes pour le moment. Veuillez verifier votre connexion internet et reessayer plus tard.'); // Pas d'accent ici
                } else {
                    setError(`Erreur inattendue: ${err.message}`); // Pas d'accent ici
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
        // La cle "Toutes" est ajoutée par le frontend, donc on ne l'inclut pas si elle ne vient pas du backend
        const keys = Object.keys(recettes);
        if (keys.includes("Toutes") && recettes["Toutes"]?.Tous?.length === allRecettesFlat.length) {
            return keys; // "Toutes" est deja presente et complete
        }
        return ["Toutes", ...keys.filter(key => key !== "Toutes")]; // Assure que "Toutes" est toujours la premiere option
    }, [recettes, allRecettesFlat]);


    if (loading) {
        return (
            <RecettesContainer style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                <PageTitle><Skeleton width={300} height={40} /></PageTitle>

                <CategoryFilterContainer>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={`cat-btn-skeleton-${i}`} width={120} height={45} style={{ borderRadius: '9999px' }} />
                    ))}
                </CategoryFilterContainer>

                <RecipeGrid>
                    {Array.from({ length: 9 }).map((_, i) => (
                        <RecipeMiniCard key={`recipe-skeleton-${i}`} $anyCardHovered={false} $isHovered={false}>
                            <div className="image-container">
                                <Skeleton height="100%" />
                            </div>
                            <div className="recipe-info">
                                <Skeleton width="80%" height={20} style={{ marginBottom: '5px' }} />
                                <Skeleton width="60%" height={15} />
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

    if (Object.keys(recettes).length === 0 || allRecettesFlat.length === 0) {
        return (
            <RecettesContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
                <StatusMessage>Aucune recette trouvee pour le moment. Revenez bientot pour de nouvelles inspirations !</StatusMessage>
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
                    return <StatusMessage key={categorie}>Aucune recette dans cette categorie.</StatusMessage>; // Pas d'accent ici
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
                                    <h3>Ingredients</h3> {/* Pas d'accent ici */}
                                    <ul>
                                        {selectedRecipe.ingredients.map((ing, index) => (
                                            <li key={index}>{ing}</li>
                                        ))}
                                    </ul>
                                </RecipeDetailsSection>
                            )}

                            {selectedRecipe.etapes && selectedRecipe.etapes.length > 0 && (
                                <RecipeDetailsSection>
                                    <h3>Preparation</h3> {/* Pas d'accent ici */}
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