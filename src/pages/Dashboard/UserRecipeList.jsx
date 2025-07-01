

// src/pages/Dashboard/UserRecipeList.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { toast } from "react-toastify";
import RecipeFormModal from "./RecipeFormModal";
import RecipeCard from "./RecipeCard";
import api from '../../api/axiosInstance';
import { useAuth } from '../../contexts/AuthContext';
import { useRecipes } from '../../contexts/RecipeContext'; // <-- NOUVEL IMPORT ICI !

// --- Styles internes à UserRecipeList.jsx ---
const RecipeListContainer = styled(motion.div)`
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--space-8);
    padding: var(--space-4);
    justify-items: center;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const NoRecipesMessage = styled(motion.div)`
    padding: var(--space-4);
    background: var(--color-neutral-0);
    border-radius: var(--radius-lg);
    text-align: center;
    font-size: var(--text-base);
    box-shadow: var(--shadow-md);
    width: 70%;
    max-width: 500px;
    margin: var(--space-6) auto;
    position: relative;
    overflow: hidden;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-2);
    
    transform: rotate(${(Math.random() - 0.5) * 2}deg);
    transition: all var(--transition-base);

    &:hover {
        transform: rotate(0deg) scale(1.01);
        box-shadow: var(--shadow-lg);
    }

    p {
        margin: 0;
        font-weight: var(--font-medium);
        color: var(--color-primary-600);
        line-height: 1.4;
    }

    .message-icon {
        font-size: var(--text-3xl);
        color: var(--color-primary-500);
        margin-bottom: var(--space-1);
    }

    &.error-message {
        p {
            color: var(--color-error-800);
        }
        .message-icon {
            color: var(--color-error-500);
        }
    }
`;

const UserRecipeList = () => {
    const { user } = useAuth();
    const { notifyRecipesChange } = useRecipes(); // <-- OBTENEZ LA FONCTION DU CONTEXTE ICI !

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRecipe, setCurrentRecipe] = useState(null);

    const fetchRecipes = useCallback(async () => {
        if (!user || !user.id) {
            setError("ID utilisateur manquant. Veuillez vous assurer d'être connecté.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const response = await api.get(`/recettes`);
            setRecipes(response.data);
            console.log("Recettes de l'utilisateur chargées :", response.data);
        } catch (err) {
            console.error("Erreur lors du chargement des recettes de l'utilisateur :", err);
            setError("Impossible de charger vos recettes. Veuillez vérifier votre connexion internet ou réessayer plus tard.");
            toast.error("Échec du chargement des recettes.");
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    const handleEdit = (recipe) => {
        setCurrentRecipe(recipe);
        setIsModalOpen(true);
    };

    const handleDelete = async (recipeId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
            try {
                await api.delete(`/recettes/${recipeId}`); // Assurez-vous que cette route est correcte côté backend
                toast.success("Recette supprimée avec succès !");
                fetchRecipes(); // Rafraîchit la liste des recettes de l'utilisateur
                notifyRecipesChange(); // <-- APPEL CRUCIAL POUR NOTIFIER LE ROLODEX !
            } catch (err) {
                console.error("Erreur lors de la suppression de la recette :", err);
                toast.error("Échec de la suppression de la recette.");
            }
        }
    };

    const handleRecipeFormSuccess = () => {
        setIsModalOpen(false);
        setCurrentRecipe(null);
        fetchRecipes(); // Rafraîchit la liste des recettes de l'utilisateur
        notifyRecipesChange(); // <-- APPEL CRUCIAL POUR NOTIFIER LE ROLODEX !
    };

    if (loading) {
        return (
            <NoRecipesMessage
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
                <span className="message-icon">⏳</span>
                <p>Chargement de vos recettes...</p>
            </NoRecipesMessage>
        );
    }

    if (error) {
        return (
            <NoRecipesMessage
                className="error-message"
                initial={{ opacity: 0, scale: 0.8, rotate: (Math.random() - 0.5) * 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
            >
                <span className="message-icon">⚠️</span>
                <p>{error}</p>
            </NoRecipesMessage>
        );
    }

    if (recipes.length === 0) {
        return (
            <NoRecipesMessage
                initial={{ opacity: 0, scale: 0.8, rotate: (Math.random() - 0.5) * 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
            >
                <span className="message-icon">🥄</span>
                <p>Vous n'avez pas encore de recettes. Créez-en une nouvelle pour commencer !</p>
            </NoRecipesMessage>
        );
    }

    return (
        <RecipeListContainer layout>
            <AnimatePresence>
                {recipes.map((recipe, index) => (
                    <RecipeCard
                        key={recipe._id}
                        recipe={recipe}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        initial={{ opacity: 0, y: 20, rotate: `${(Math.random() - 0.5) * 10}deg` }}
                        animate={{ opacity: 1, y: 0, rotate: `${(Math.random() - 0.5) * 2}deg` }}
                        exit={{ opacity: 0, y: -20, rotate: `${(Math.random() - 0.5) * -10}deg` }}
                        transition={{ type: "spring", stiffness: 100, damping: 10, delay: index * 0.05 }}
                        layout
                    />
                ))}
            </AnimatePresence>

            <RecipeFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setCurrentRecipe(null);
                }}
                recipeToEdit={currentRecipe}
                onRecipeUpdated={handleRecipeFormSuccess}
            />
        </RecipeListContainer>
    );
};

export default UserRecipeList;