import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

// Import des composants de style
import {
    AdminDashboardContainer,
    DeleteButton,
    PromoteButton,
    DemoteButton,
    EditButton,
    ListItemContent,
    ListButtonsContainer
} from './AdminDashboard.styles';

// Import de RecipeFormModal
import RecipeFormModal from '../../pages/Dashboard/RecipeFormModal'; // Assurez-vous que ce chemin est correct

const AdminDashboard = () => {
    const { token, user: currentUser } = useAuth();

    const [users, setUsers] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // États pour la modale d'ajout/édition de recette
    const [isRecipeFormModalOpen, setIsRecipeFormModalOpen] = useState(false);
    const [recipeToEdit, setRecipeToEdit] = useState(null); // Pour passer la recette à la modale en mode édition

    const API_URL = 'http://localhost:5000/api';

    const fetchAdminData = async () => {
        try {
            const usersRes = await axios.get(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(usersRes.data);

            const allRecipesRes = await axios.get(`${API_URL}/recettes/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setRecipes(allRecipesRes.data);

            setLoading(false);
        } catch (err) {
            console.error('Erreur lors du chargement des données admin:', err);
            setError('Impossible de charger les données administrateur. ' + (err.response?.data?.message || err.message));
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAdminData();
        } else {
            setLoading(false);
            setError("Aucun token d'authentification trouvé. Veuillez vous connecter.");
        }
    }, [token]);

    const handleDeleteUser = async (userId) => {
        // Correction : Utilisation de currentUser._id pour la comparaison
        if (currentUser && currentUser._id === userId) {
            toast.error('Vous ne pouvez pas supprimer votre propre compte administrateur.');
            return;
        }

        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.')) {
            try {
                await axios.delete(`${API_URL}/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Correction : Filtrage par user._id
                setUsers(users.filter(user => user._id !== userId));
                toast.success('Utilisateur supprimé avec succès !');
            } catch (err) {
                console.error('Erreur lors de la suppression de l\'utilisateur:', err);
                toast.error('Erreur lors de la suppression de l\'utilisateur: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    const handleChangeUserRole = async (userId, newRole) => {
        // --- NOUVEAU LOG ICI ---
        console.log("handleChangeUserRole appelée avec userId:", userId, "et newRole:", newRole);

        // Correction : Utilisation de currentUser._id pour la comparaison
        if (currentUser && currentUser._id === userId) {
            toast.error('Vous ne pouvez pas changer votre propre rôle via cette interface.');
            return;
        }

        if (!window.confirm(`Êtes-vous sûr de vouloir changer le rôle de cet utilisateur en "${newRole}" ?`)) {
            return;
        }

        try {
            // --- NOUVEAU LOG ICI ---
            console.log("URL de la requête PUT:", `${API_URL}/users/${userId}`);
            await axios.put(`${API_URL}/users/${userId}`, { role: newRole }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.map(user =>
                // Correction : Mise à jour par user._id
                user._id === userId ? { ...user, role: newRole } : user
            ));
            toast.success(`Rôle de l'utilisateur mis à jour en "${newRole}" !`);
        } catch (err) {
            console.error('Erreur lors de la mise à jour du rôle:', err);
            toast.error('Erreur lors de la mise à jour du rôle: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleDeleteRecipe = async (recipeId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ? Cette action est irréversible.')) {
            try {
                await axios.delete(`${API_URL}/recettes/${recipeId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
                toast.success('Recette supprimée avec succès !');
            } catch (err) {
                console.error('Erreur lors de la suppression de la recette:', err);
                toast.error('Erreur lors de la suppression de la recette: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    // Nouvelle fonction pour gérer l'édition de recette via la modale
    const handleEditRecipe = useCallback((recipe) => {
        setRecipeToEdit(recipe); // Définit la recette à éditer
        setIsRecipeFormModalOpen(true); // Ouvre la modale
    }, []);

    // Fonction de rappel pour la fermeture de la modale ou après succès
    const handleRecipeFormSuccessOrClose = () => {
        setIsRecipeFormModalOpen(false);
        setRecipeToEdit(null); // Réinitialise la recette à éditer
        fetchAdminData(); // Rafraîchit les données du dashboard après l'ajout/édition
    };

    if (loading) {
        return <p>Chargement du tableau de bord admin...</p>;
    }
    if (error) {
        return <p className="error-message">{error}</p>;
    }

    // --- LOG POUR LES UTILISATEURS DANS L'ÉTAT (avant le rendu) ---
    console.log("Utilisateurs dans l'état (avant le rendu):", users);

    return (
        <AdminDashboardContainer>
            <h1>Tableau de Bord Administrateur</h1>

            <section>
                <h2>Gestion des Utilisateurs</h2>
                {users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            // Correction : Utilisation de user._id pour la clé de liste
                            <li key={user._id}>
                                <ListItemContent>
                                    {user.identifiant} ({user.email}) - Rôle: **{user.role}**
                                </ListItemContent>
                                <ListButtonsContainer>
                                    {/* Correction : Utilisation de currentUser._id et user._id pour la comparaison et les appels */}
                                    {currentUser && currentUser._id !== user._id && (
                                        <>
                                            <DeleteButton onClick={() => handleDeleteUser(user._id)}>Supprimer</DeleteButton>
                                            {user.role === 'user' ? (
                                                <PromoteButton onClick={() => {
                                                    // --- NOUVEAU LOG ICI ---
                                                    console.log("Clic sur Promouvoir pour user._id:", user._id);
                                                    handleChangeUserRole(user._id, 'admin');
                                                }}>
                                                    Vers Admin {/* Correction : Ajout de l'espace insécable */}
                                                </PromoteButton>
                                            ) : (
                                                <DemoteButton onClick={() => {
                                                    // --- NOUVEAU LOG ICI. ---
                                                    console.log("Clic sur Rétrograder pour user._id:", user._id);
                                                    handleChangeUserRole(user._id, 'user');
                                                }}>
                                                    Vers User &nbsp;&nbsp;{/* Correction : Ajout de l'espace insécable */}
                                                </DemoteButton>
                                            )}
                                        </>
                                    )}
                                </ListButtonsContainer>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucun utilisateur trouvé.</p>
                )}
            </section>

            <section>
                <h2>Gestion de toutes les Recettes</h2>
                {recipes.length > 0 ? (
                    <ul>
                        {recipes.map(recipe => (
                            <li key={recipe._id}>
                                <ListItemContent>
                                    {/* CORRECTION ICI : Accédez à recipe.owner.identifiant */}
                                    {recipe.nom} (Catégorie: {recipe.categorie}, Par: {recipe.owner ? recipe.owner.identifiant : 'Inconnu'})
                                </ListItemContent>
                                <ListButtonsContainer>
                                    {/* Utilise handleEditRecipe avec la recette courante */}
                                    <EditButton as="button" onClick={() => handleEditRecipe(recipe)}>Modifier</EditButton>
                                    <DeleteButton onClick={() => handleDeleteRecipe(recipe._id)}>Supprimer</DeleteButton>
                                </ListButtonsContainer>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucune recette trouvée.</p>
                )}
            </section>

            {/* MODALE D'AJOUT/ÉDITION DE RECETTE */}
            <RecipeFormModal
                isOpen={isRecipeFormModalOpen}
                onClose={handleRecipeFormSuccessOrClose}
                onRecipeAdded={handleRecipeFormSuccessOrClose} // Sera appelé après l'ajout ou la modification
                onRecipeUpdated={handleRecipeFormSuccessOrClose} // Sera appelé après la modification
                recipeToEdit={recipeToEdit} // Passe la recette à éditer (sera null en mode ajout)
            />
        </AdminDashboardContainer>
    );
};

export default AdminDashboard;