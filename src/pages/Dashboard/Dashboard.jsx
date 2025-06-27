import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import de AnimatePresence
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance'; // Import de l'instance Axios pour les appels API

import RecipeFormModal from './RecipeFormModal';
import RecipeCarousel from '../../components/RecipeCarousel';
import RecentRecipes from './RecentRecipes';
import StatsBubble from './StatsBubble'; // Assurez-vous que ce chemin est correct

// Import des composants de style de la modale depuis Recettes.styles.js
import {
    ModalOverlay,
    ModalContent,
    CloseButton,
    ModalImage,
    RecipeNameDetail,
    RecipeDescriptionDetail,
    RecipeDetailsSection,
    Tag,
} from '../Recettes/Recettes.styles'; // Assurez-vous que ce chemin est correct

import {
    DashboardContainer,
    WelcomeSection,
    ContentGrid,
    MainContent,
    SidebarContent,
    DashboardTitle,
    AddRecipeToggleCard,
} from './Dashboard.styles';

const Dashboard = () => {
    const { user } = useAuth();

    // --- CONSOLE.LOGS DE DÉBOGAGE AJOUTÉS ICI ---
    console.log("------------------------------------------");
    console.log("Dans Dashboard.jsx:");
    console.log("Objet user récupéré de useAuth():", user);
    console.log("user.identifiant:", user?.identifiant); // Utilise le chaînage optionnel (?) pour éviter l'erreur si user est null
    console.log("------------------------------------------");
    // ---------------------------------------------

    const [isRecipeFormModalOpen, setIsRecipeFormModalOpen] = useState(false);
    const [userRecipes, setUserRecipes] = useState([]);
    const [loadingUserRecipes, setLoadingUserRecipes] = useState(true);
    const [errorUserRecipes, setErrorUserRecipes] = useState(null);
    const [recipeToEdit, setRecipeToEdit] = useState(null);

    // État pour la recette sélectionnée pour l'affichage des détails
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleOpenRecipeFormModal = () => setIsRecipeFormModalOpen(true);
    const handleCloseRecipeFormModal = () => {
        setIsRecipeFormModalOpen(false);
        setRecipeToEdit(null);
    };

    const handleRecipeFormSuccess = () => {
        setIsRecipeFormModalOpen(false);
        setRecipeToEdit(null);
        fetchUserRecipes();
    };

    const fetchUserRecipes = useCallback(async () => {
        setLoadingUserRecipes(true);
        setErrorUserRecipes(null);
        try {
            const response = await api.get('/recettes/');
            setUserRecipes(response.data);
            console.log("Recettes utilisateur chargées :", response.data.length);
            // DEBUG : Affiche la première recette pour voir sa structure, y compris son ID
            if (response.data.length > 0) {
                console.log("Première recette chargée (pour vérification ID) :", response.data[0]);
            }
        } catch (err) {
            console.error('Erreur lors de la récupération des recettes de l\'utilisateur:', err);
            setErrorUserRecipes('Impossible de charger vos recettes. Veuillez réessayer.');
            toast.error('Erreur de chargement de vos recettes.');
        } finally {
            setLoadingUserRecipes(false);
        }
    }, []);

    const handleEditRecipe = useCallback((recipe) => {
        setRecipeToEdit(recipe);
        setIsRecipeFormModalOpen(true);
    }, []);

    const handleDeleteRecipe = useCallback(async (recipeId) => {
        console.log("Tentative de suppression de la recette avec l'ID :", recipeId); // DEBUG : Vérifie l'ID avant la requête
        if (!recipeId) {
            console.error("Erreur : L'ID de la recette à supprimer est indéfini.");
            toast.error("Impossible de supprimer la recette : ID manquant.");
            return; // Arrête l'exécution si l'ID est manquant
        }

        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
            try {
                await api.delete(`/recettes/${recipeId}`);
                toast.success('Recette supprimée avec succès !');
                fetchUserRecipes();
            } catch (err) {
                console.error('Erreur lors de la suppression de la recette:', err);
                toast.error('Erreur lors de la suppression de la recette.');
            }
        }
    }, [fetchUserRecipes]);

    // Gestion de l'ouverture et fermeture de la modale de détails
    const handleViewRecipeDetails = useCallback((recipe) => {
        setSelectedRecipe(recipe); // Définit la recette à afficher dans la modale
    }, []);

    const handleCloseDetailsModal = useCallback(() => {
        setSelectedRecipe(null); // Réinitialise pour fermer la modale
    }, []);

    useEffect(() => {
        fetchUserRecipes();
    }, [fetchUserRecipes]);

    return (
        <DashboardContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <WelcomeSection
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h1>Bienvenue, Chef {user ? user.identifiant : 'Gourmet'} ! 🧑‍🍳✨</h1>
                <p>Préparez vos papilles, c'est l'heure de créer de nouvelles saveurs !</p>
            </WelcomeSection>

            {/* PLACEMENT DU COMPOSANT STATSBUBBLE ICI */}
            <StatsBubble />

            <ContentGrid
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <MainContent>
                    <DashboardTitle>Mes Recettes</DashboardTitle>
                    {loadingUserRecipes ? (
                        <p style={{ textAlign: 'center', color: 'var(--color-neutral-600)', padding: '2rem' }}>
                            Chargement de vos recettes...
                        </p>
                    ) : errorUserRecipes ? (
                        <p style={{ textAlign: 'center', color: 'var(--color-error-dark)', padding: '2rem' }}>
                            {errorUserRecipes}
                        </p>
                    ) : (
                        <RecipeCarousel
                            recipes={userRecipes}
                            onEditRecipe={handleEditRecipe}
                            onDeleteRecipe={handleDeleteRecipe}
                            onViewRecipeDetails={handleViewRecipeDetails}
                        />
                    )}
                </MainContent>

                <SidebarContent>
                    <DashboardTitle>Boîte à Outils Culinaires</DashboardTitle>

                    <AddRecipeToggleCard
                        onClick={handleOpenRecipeFormModal}
                        whileTap={{ scale: 0.98, rotate: -1 }}
                    >
                        <h3>Ajouter une Nouvelle Recette</h3>
                        <span className="add-icon">+</span>
                    </AddRecipeToggleCard>

                    <DashboardTitle as="h3">Dernières Créations Mondiales</DashboardTitle>
                    <RecentRecipes />

                </SidebarContent>
            </ContentGrid>

            <RecipeFormModal
                isOpen={isRecipeFormModalOpen}
                onClose={handleCloseRecipeFormModal}
                onRecipeAdded={handleRecipeFormSuccess}
                onRecipeUpdated={handleRecipeFormSuccess}
                recipeToEdit={recipeToEdit}
            />

            {/* MODALE DE DÉTAIL DE RECETTE - Copiée de Recettes.jsx */}
            <AnimatePresence>
                {selectedRecipe && (
                    <ModalOverlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleCloseDetailsModal} // Fermer en cliquant sur l'overlay
                    >
                        <ModalContent
                            initial={{ y: "-100vh", opacity: 0 }}
                            animate={{ y: "0", opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }}
                            exit={{ y: "100vh", opacity: 0, transition: { duration: 0.2 } }}
                            onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique dans la modale
                        >
                            <CloseButton onClick={handleCloseDetailsModal}>×</CloseButton>
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
        </DashboardContainer>
    );
};

export default Dashboard;