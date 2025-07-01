import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axiosInstance from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton'; // <-- Importez Skeleton
import 'react-loading-skeleton/dist/skeleton.css'; // <-- Importez le CSS des skeletons

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
import RecipeFormModal from '../../pages/Dashboard/RecipeFormModal';

const AdminDashboard = () => {
    const { token, user: currentUser } = useAuth();

    const [users, setUsers] = useState([]);
    const [recipes, setRecipes] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // États pour la modale d'ajout/édition de recette
    const [isRecipeFormModalOpen, setIsRecipeFormModalOpen] = useState(false);
    const [recipeToEdit, setRecipeToEdit] = useState(null);

    const fetchAdminData = async () => {
        try {
            const usersRes = await axiosInstance.get('/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(usersRes.data);

            const allRecipesRes = await axiosInstance.get('/recettes/all', {
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
        if (currentUser && currentUser._id === userId) {
            toast.error('Vous ne pouvez pas supprimer votre propre compte administrateur.');
            return;
        }

        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.')) {
            try {
                await axiosInstance.delete(`/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(users.filter(user => user._id !== userId));
                toast.success('Utilisateur supprimé avec succès !');
            } catch (err) {
                console.error('Erreur lors de la suppression de l\'utilisateur:', err);
                toast.error('Erreur lors de la suppression de l\'utilisateur: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    const handleChangeUserRole = async (userId, newRole) => {
        console.log("handleChangeUserRole appelée avec userId:", userId, "et newRole:", newRole);

        if (currentUser && currentUser._id === userId) {
            toast.error('Vous ne pouvez pas changer votre propre rôle via cette interface.');
            return;
        }

        if (!window.confirm(`Êtes-vous sûr de vouloir changer le rôle de cet utilisateur en "${newRole}" ?`)) {
            return;
        }

        try {
            console.log("URL de la requête PUT:", `/users/${userId}`);
            await axiosInstance.put(`/users/${userId}`, { role: newRole }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(users.map(user =>
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
                await axiosInstance.delete(`/recettes/${recipeId}`, {
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

    const handleEditRecipe = useCallback((recipe) => {
        setRecipeToEdit(recipe);
        setIsRecipeFormModalOpen(true);
    }, []);

    const handleRecipeFormSuccessOrClose = () => {
        setIsRecipeFormModalOpen(false);
        setRecipeToEdit(null);
        fetchAdminData();
    };

    if (loading) {
        return (
            <AdminDashboardContainer>
                <h1><Skeleton width={300} height={35} /></h1> {/* Skeleton pour le titre */}

                <section>
                    <h2><Skeleton width={250} height={30} /></h2>
                    <ul>
                        {Array.from({ length: 3 }).map((_, i) => ( // 3 skeletons pour les utilisateurs
                            <li key={`user-skeleton-${i}`} style={{ marginBottom: '15px' }}>
                                <ListItemContent>
                                    <Skeleton height={25} width="80%" />
                                </ListItemContent>
                                <ListButtonsContainer>
                                    <Skeleton width={80} height={30} style={{ marginRight: '10px' }} />
                                    <Skeleton width={100} height={30} />
                                </ListButtonsContainer>
                            </li>
                        ))}
                    </ul>
                </section>

                <section style={{ marginTop: '30px' }}>
                    <h2><Skeleton width={280} height={30} /></h2>
                    <ul>
                        {Array.from({ length: 5 }).map((_, i) => ( // 5 skeletons pour les recettes
                            <li key={`recipe-skeleton-${i}`} style={{ marginBottom: '15px' }}>
                                <ListItemContent>
                                    <Skeleton height={25} width="90%" />
                                </ListItemContent>
                                <ListButtonsContainer>
                                    <Skeleton width={80} height={30} style={{ marginRight: '10px' }} />
                                    <Skeleton width={80} height={30} />
                                </ListButtonsContainer>
                            </li>
                        ))}
                    </ul>
                </section>
            </AdminDashboardContainer>
        );
    }
    if (error) {
        return <p className="error-message">{error}</p>;
    }

    console.log("Utilisateurs dans l'état (avant le rendu):", users);

    return (
        <AdminDashboardContainer>
            <h1>Tableau de Bord Administrateur</h1>

            <section>
                <h2>Gestion des Utilisateurs</h2>
                {users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                                <ListItemContent>
                                    {user.identifiant} ({user.email}) - Rôle: **{user.role}**
                                </ListItemContent>
                                <ListButtonsContainer>
                                    {currentUser && currentUser._id !== user._id && (
                                        <>
                                            <DeleteButton onClick={() => handleDeleteUser(user._id)}>Supprimer</DeleteButton>
                                            {user.role === 'user' ? (
                                                <PromoteButton onClick={() => {
                                                    console.log("Clic sur Promouvoir pour user._id:", user._id);
                                                    handleChangeUserRole(user._id, 'admin');
                                                }}>
                                                    Vers Admin
                                                </PromoteButton>
                                            ) : (
                                                <DemoteButton onClick={() => {
                                                    console.log("Clic sur Rétrograder pour user._id:", user._id);
                                                    handleChangeUserRole(user._id, 'user');
                                                }}>
                                                    Vers User &nbsp;&nbsp;
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
                                    {recipe.nom} (Catégorie: {recipe.categorie}, Par: {recipe.owner ? recipe.owner.identifiant : 'Inconnu'})
                                </ListItemContent>
                                <ListButtonsContainer>
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

            <RecipeFormModal
                isOpen={isRecipeFormModalOpen}
                onClose={handleRecipeFormSuccessOrClose}
                onRecipeAdded={handleRecipeFormSuccessOrClose}
                onRecipeUpdated={handleRecipeFormSuccessOrClose}
                recipeToEdit={recipeToEdit}
            />
        </AdminDashboardContainer>
    );
};

export default AdminDashboard;