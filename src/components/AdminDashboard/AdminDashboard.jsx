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

import Footer from '../../components/Footer/Footer'; // <-- Importez le composant Footer

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
            <> {/* Fragment pour envelopper tout */}
                <AdminDashboardContainer>
                    <h1><Skeleton width={300} height={35} /></h1> {/* Skeleton pour le titre */}

                    <section>
                        <h2><Skeleton width={250} height={30} /></h2>
                        <ul>
                            {Array.from({ length: 3 }).map((_, i) => ( // 3 skeletons pour les utilisateurs
                                <li key={`user-skeleton-${i}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <Skeleton circle width={40} height={40} style={{ marginRight: '10px' }} />
                                    <div style={{ flexGrow: 1 }}>
                                        <Skeleton width="60%" height={20} />
                                        <Skeleton width="40%" height={15} />
                                    </div>
                                    <Skeleton width={80} height={30} style={{ borderRadius: '9999px', marginLeft: '10px' }} />
                                    <Skeleton width={80} height={30} style={{ borderRadius: '9999px', marginLeft: '5px' }} />
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section style={{ marginTop: '40px' }}>
                        <h2><Skeleton width={250} height={30} /></h2>
                        <ul>
                            {Array.from({ length: 3 }).map((_, i) => ( // 3 skeletons pour les recettes
                                <li key={`recipe-skeleton-${i}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                    <Skeleton width={60} height={60} style={{ marginRight: '15px' }} />
                                    <div style={{ flexGrow: 1 }}>
                                        <Skeleton width="70%" height={20} />
                                        <Skeleton width="50%" height={15} />
                                    </div>
                                    <Skeleton width={70} height={30} style={{ borderRadius: '9999px', marginLeft: '10px' }} />
                                    <Skeleton width={70} height={30} style={{ borderRadius: '9999px', marginLeft: '5px' }} />
                                </li>
                            ))}
                        </ul>
                    </section>
                </AdminDashboardContainer>
                <Footer /> {/* <-- Ajoutez le Footer ici */}
            </>
        );
    }

    if (error) {
        return (
            <> {/* Fragment pour envelopper tout */}
                <AdminDashboardContainer>
                    <p style={{ color: 'var(--color-error-dark)', textAlign: 'center', padding: '2rem' }}>
                        {error}
                    </p>
                </AdminDashboardContainer>
                <Footer /> {/* <-- Ajoutez le Footer ici */}
            </>
        );
    }
    
    return (
        <> {/* Fragment pour envelopper tout */}
            <AdminDashboardContainer>
                <h1>Tableau de bord Administrateur</h1>

                <section>
                    <h2>Gestion des Utilisateurs</h2>
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                                <ListItemContent>
                                    <strong>{user.identifiant}</strong> ({user.email}) - Rôle: {user.role}
                                </ListItemContent>
                                <ListButtonsContainer>
                                    {user.role === 'utilisateur' && (
                                        <PromoteButton onClick={() => handleChangeUserRole(user._id, 'admin')}>
                                            Promouvoir Admin
                                        </PromoteButton>
                                    )}
                                    {user.role === 'admin' && currentUser && currentUser._id !== user._id && (
                                        <DemoteButton onClick={() => handleChangeUserRole(user._id, 'utilisateur')}>
                                            Rétrograder Utilisateur
                                        </DemoteButton>
                                    )}
                                    <DeleteButton onClick={() => handleDeleteUser(user._id)}>Supprimer</DeleteButton>
                                </ListButtonsContainer>
                            </li>
                        ))}
                    </ul>
                </section>

                <section style={{ marginTop: '40px' }}>
                    <h2>Gestion de Toutes les Recettes</h2>
                    <ul>
                        {recipes.map(recipe => (
                            <li key={recipe._id}>
                                <ListItemContent>
                                    <img src={recipe.imageUrl || 'default_recipe_image.jpg'} alt={recipe.nom} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '15px', borderRadius: 'var(--border-radius-sm)' }} />
                                    <strong>{recipe.nom}</strong> par {recipe.auteur?.identifiant || 'Inconnu'}
                                </ListItemContent>
                                <ListButtonsContainer>
                                    <EditButton onClick={() => handleEditRecipe(recipe)}>Modifier</EditButton>
                                    <DeleteButton onClick={() => handleDeleteRecipe(recipe._id)}>Supprimer</DeleteButton>
                                </ListButtonsContainer>
                            </li>
                        ))}
                    </ul>
                </section>

                <RecipeFormModal
                    isOpen={isRecipeFormModalOpen}
                    onClose={handleRecipeFormSuccessOrClose}
                    onRecipeAdded={handleRecipeFormSuccessOrClose}
                    onRecipeUpdated={handleRecipeFormSuccessOrClose}
                    recipeToEdit={recipeToEdit}
                />
            </AdminDashboardContainer>
            <Footer /> {/* <-- Ajoutez le Footer ici */}
        </>
    );
};

export default AdminDashboard;