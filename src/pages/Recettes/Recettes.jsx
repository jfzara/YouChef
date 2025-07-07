// src/pages/Recettes/Recettes.jsx (Aucune modification requise par rapport à la version précédente)
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

import Footer from '../../components/Footer/Footer';

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
            // --- DÉBOGAGE FRONTEND : Démarrage du fetch ---
            console.log("FRONTEND DEBUG: Début du fetch des recettes sur /recettes/all.");
            setError(null); // Réinitialiser l'erreur à chaque nouvel essai
            setLoading(true); // Remettre à loading true si on re-déclenche

            try {
                // console.log("🔄 Chargement des recettes..."); // Votre log existant
                const res = await axios.get("/recettes/all");
                const data = res.data;
                
                // --- DÉBOGAGE FRONTEND : Données reçues ---
                console.log("FRONTEND DEBUG: Données brutes reçues du backend:", data);
                // console.log("✅ Donnees recues:", data); // Votre log existant

                const regroupees = {};
                const allRecipesArray = [];

                data.forEach(recette => {
                    const cat = recette.categorie?.trim() || "Autres";
                    const sousCat = recette.sousCategorie?.trim() || "Divers";

                    if (!Object.prototype.hasOwnProperty.call(regroupees, cat)) regroupees[cat] = {};
                    if (!Object.prototype.hasOwnProperty.call(regroupees[cat], sousCat)) regroupees[cat][sousCat] = [];
                    regroupees[cat][sousCat].push(recette);

                    allRecipesArray.push(recette);
                });

                setRecettes({ "Toutes": { "Tous": allRecipesArray }, ...regroupees });
                setAllRecettesFlat(allRecipesArray);
                
                // --- DÉBOGAGE FRONTEND : État après traitement ---
                console.log("FRONTEND DEBUG: Recettes traitées et mises à jour dans l'état du composant.");
                console.log("FRONTEND DEBUG: Nombre total de recettes (allRecettesFlat):", allRecipesArray.length);

                controls.start("visible");

            } catch (err) {
                // --- DÉBOGAGE FRONTEND : Erreur lors du fetch ---
                console.error("FRONTEND DEBUG ERROR: Erreur lors du fetch des recettes:", err);
                // console.error("❌ Erreur lors du chargement:", err); // Votre log existant

                let errorMessage = 'Une erreur inattendue est survenue.';
                if (err.response) {
                    console.error("FRONTEND DEBUG ERROR: Réponse du serveur:", err.response.data);
                    console.error("FRONTEND DEBUG ERROR: Statut HTTP:", err.response.status);
                    errorMessage = `Erreur du serveur: ${err.response.status} - ${err.response.data.message || 'Quelque chose s\'est mal passé'}`;
                } else if (err.request) {
                    console.error("FRONTEND DEBUG ERROR: Pas de réponse du serveur (requête envoyée mais aucune réponse).");
                    errorMessage = 'Oups ! Nous n\'arrivons pas à charger les recettes pour le moment. Veuillez vérifier votre connexion internet ou le serveur.';
                } else {
                    console.error("FRONTEND DEBUG ERROR: Erreur de configuration de la requête Axios:", err.message);
                    errorMessage = `Erreur lors de l'envoi de la requête: ${err.message}`;
                }
                setError(errorMessage);
            } finally {
                setLoading(false);
                console.log("FRONTEND DEBUG: Fin de l'opération de fetch. Loading = false.");
            }
        };
        fetchRecettes();
    }, [controls]);

    const handleCategoryChange = useCallback((category) => {
        console.log("FRONTEND DEBUG: Changement de catégorie vers:", category);
        setActiveCategory(category);
    }, []);

    const openRecipeModal = useCallback((recipe) => {
        console.log("FRONTEND DEBUG: Ouverture modale pour la recette:", recipe.nom);
        setSelectedRecipe(recipe);
    }, []);

    const closeRecipeModal = useCallback(() => {
        console.log("FRONTEND DEBUG: Fermeture de la modale.");
        setSelectedRecipe(null);
    }, []);

    const handleMouseEnter = useCallback((id) => {
        setHoveredRecipeId(id);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredRecipeId(null);
    }, []);

    const filteredRecettes = useMemo(() => {
        const displayedRecettes = {};
        if (activeCategory === "Toutes") {
            displayedRecettes["Toutes"] = { "Tous": allRecettesFlat };
        } else {
            displayedRecettes[activeCategory] = recettes[activeCategory] || {};
        }
        console.log("FRONTEND DEBUG: Recettes filtrées (catégorie active:", activeCategory, "):", displayedRecettes);
        return displayedRecettes;
    }, [activeCategory, recettes, allRecettesFlat]);

    const availableCategories = useMemo(() => {
        const keys = Object.keys(recettes);
        let categories = ["Toutes", ...keys.filter(key => key !== "Toutes")];
        console.log("FRONTEND DEBUG: Catégories disponibles:", categories);
        return categories;
    }, [recettes, allRecettesFlat]);

    // Rendu pour l'état de chargement
    if (loading) {
        console.log("FRONTEND DEBUG: Affichage de l'état de chargement (skeletons).");
        return (
            <>
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
                <Footer />
            </>
        );
    }

    // Rendu pour l'état d'erreur
    if (error) {
        console.log("FRONTEND DEBUG: Affichage du message d'erreur:", error);
        return (
            <>
                <RecettesContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <StatusMessage $isError>{error}</StatusMessage>
                </RecettesContainer>
                <Footer />
            </>
        );
    }

    // Rendu si aucune recette n'est trouvée (après chargement sans erreur)
    if (Object.keys(recettes).length === 0 || allRecettesFlat.length === 0) {
        console.log("FRONTEND DEBUG: Aucune recette trouvée (état vide).");
        return (
            <>
                <RecettesContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <StatusMessage>Aucune recette trouvée pour le moment. Revenez bientôt pour de nouvelles inspirations !</StatusMessage>
                </RecettesContainer>
                <Footer />
            </>
        );
    }

    // Rendu principal des recettes
    console.log("FRONTEND DEBUG: Affichage des recettes.");
    return (
        <>
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
                        console.log(`FRONTEND DEBUG: Pas de recettes à afficher pour la catégorie "${categorie}".`);
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
                                        <h3>Ingredients</h3>
                                        <ul>
                                            {selectedRecipe.ingredients.map((ing, index) => (
                                                <li key={index}>{ing}</li>
                                            ))}
                                        </ul>
                                    </RecipeDetailsSection>
                                )}

                                {selectedRecipe.etapes && selectedRecipe.etapes.length > 0 && (
                                    <RecipeDetailsSection>
                                        <h3>Preparation</h3>
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
            <Footer />
        </>
    );
};

export default Recettes;