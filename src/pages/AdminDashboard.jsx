import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios'; // N'oubliez pas que axiosInstance est recommandé pour l'authentification
import toast from 'react-hot-toast'; // Assurez-vous d'avoir react-hot-toast installé

const AdminDashboard = () => {
  // Récupère le token et les informations de l'utilisateur courant (l'admin connecté) depuis le contexte d'authentification.
  // On renomme 'user' en 'currentUser' pour éviter la confusion avec les 'user' de la liste.
  const { token, user: currentUser } = useAuth();
  
  // États pour stocker la liste des utilisateurs et des recettes
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  
  // États pour gérer le chargement et les erreurs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL de base de votre API backend
  // Assurez-vous que cette URL est correcte pour votre environnement
  const API_URL = 'http://localhost:5000/api'; 

  // Fonction pour récupérer toutes les données nécessaires au tableau de bord admin
  const fetchAdminData = async () => {
    try {
      // Récupérer tous les utilisateurs
      // Requête protégée par le token car seule un admin peut accéder à cette route backend
      const usersRes = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(usersRes.data); // Met à jour l'état avec la liste des utilisateurs

      // Récupérer toutes les recettes
      // La route '/recettes/all' est supposée publique ou gérée par votre backend pour être accessible.
      // Si elle nécessite un token pour les admins, ajoutez le header Authorization.
      const allRecipesRes = await axios.get(`${API_URL}/recettes/all`);
      setRecipes(allRecipesRes.data); // Met à jour l'état avec la liste de toutes les recettes

      setLoading(false); // Arrête le chargement une fois les données récupérées
    } catch (err) {
      console.error('Erreur lors du chargement des données admin:', err);
      // Affiche un message d'erreur clair à l'utilisateur
      setError('Impossible de charger les données administrateur. ' + (err.response?.data?.message || err.message));
      setLoading(false); // Arrête le chargement même en cas d'erreur
    }
  };

  // Exécute fetchAdminData une fois au montage du composant et chaque fois que le token change
  useEffect(() => {
    fetchAdminData();
  }, [token]); // Le token est une dépendance essentielle car les requêtes en dépendent

  /**
   * Gère la suppression d'un utilisateur.
   * @param {string} userId L'ID de l'utilisateur à supprimer.
   */
  const handleDeleteUser = async (userId) => {
    // Vérifie si l'admin tente de supprimer son propre compte
    if (currentUser && currentUser.id === userId) {
      toast.error('Vous ne pouvez pas supprimer votre propre compte administrateur.');
      return; // Empêche l'action
    }
    
    // Demande confirmation avant de supprimer
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.')) {
      try {
        // Envoie une requête DELETE au backend
        await axios.delete(`${API_URL}/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` } // Nécessite le token de l'admin
        });
        // Met à jour la liste des utilisateurs en filtrant l'utilisateur supprimé
        setUsers(users.filter(user => user.id !== userId));
        toast.success('Utilisateur supprimé avec succès !');
      } catch (err) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', err);
        toast.error('Erreur lors de la suppression de l\'utilisateur: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  /**
   * Gère le changement de rôle d'un utilisateur (promouvoir/rétrograder).
   * @param {string} userId L'ID de l'utilisateur dont le rôle doit être modifié.
   * @param {string} newRole Le nouveau rôle à attribuer ('user' ou 'admin').
   */
  const handleChangeUserRole = async (userId, newRole) => {
      // Empêche un admin de modifier son propre rôle via cette interface
      if (currentUser && currentUser.id === userId) {
        toast.error('Vous ne pouvez pas changer votre propre rôle via cette interface.');
        return;
      }
      
      // Demande confirmation avant de changer le rôle
      if (!window.confirm(`Êtes-vous sûr de vouloir changer le rôle de cet utilisateur en "${newRole}" ?`)) {
        return; // Annule l'action si l'utilisateur refuse
      }

      try {
          // Envoie une requête PUT au backend pour mettre à jour le rôle
          await axios.put(`${API_URL}/users/${userId}`, { role: newRole }, {
              headers: { Authorization: `Bearer ${token}` } // Nécessite le token de l'admin
          });
          // Met à jour l'état local des utilisateurs pour refléter le changement
          setUsers(users.map(user =>
              user.id === userId ? { ...user, role: newRole } : user // Met à jour l'utilisateur spécifique
          ));
          toast.success(`Rôle de l'utilisateur mis à jour en "${newRole}" !`);
      } catch (err) {
          console.error('Erreur lors de la mise à jour du rôle:', err);
          toast.error('Erreur lors de la mise à jour du rôle: ' + (err.response?.data?.message || err.message));
      }
  };

  /**
   * Gère la suppression d'une recette.
   * @param {string} recipeId L'ID de la recette à supprimer.
   */
  const handleDeleteRecipe = async (recipeId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recette ? Cette action est irréversible.')) {
      try {
        // Envoie une requête DELETE au backend pour supprimer la recette
        await axios.delete(`${API_URL}/recettes/${recipeId}`, {
          headers: { Authorization: `Bearer ${token}` } // L'admin a besoin du token pour supprimer n'importe quelle recette
        });
        // Met à jour la liste des recettes en filtrant la recette supprimée
        setRecipes(recipes.filter(recipe => recipe._id !== recipeId));
        toast.success('Recette supprimée avec succès !');
      } catch (err) {
        console.error('Erreur lors de la suppression de la recette:', err);
        toast.error('Erreur lors de la suppression de la recette: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  // Affichage conditionnel pendant le chargement ou en cas d'erreur
  if (loading) {
    return <p>Chargement du tableau de bord admin...</p>;
  }
  if (error) {
    return <p className="error-message">{error}</p>; // Affichez l'erreur de manière stylisée
  }

  return (
    <div className="admin-dashboard">
      <h1>Tableau de Bord Administrateur</h1>

      <section>
        <h2>Gestion des Utilisateurs</h2>
        {users.length > 0 ? (
          <ul>
            {users.map(user => (
              <li key={user.id}>
                {user.identifiant} ({user.email}) - Rôle: **{user.role}**
                
                {/* Affiche les boutons de gestion seulement si ce n'est pas l'utilisateur admin actuellement connecté */}
                {currentUser && currentUser.id !== user.id && (
                    <>
                        <button onClick={() => handleDeleteUser(user.id)} className="button-delete">Supprimer</button>
                        {/* Affiche le bouton "Promouvoir Admin" si l'utilisateur est un 'user' */}
                        {user.role === 'user' ? (
                          <button onClick={() => handleChangeUserRole(user.id, 'admin')} className="button-promote">
                            Promouvoir Admin
                          </button>
                        ) : (
                          // Sinon, affiche le bouton "Rétrograder en User" si l'utilisateur est un 'admin' (autre que soi-même)
                          <button onClick={() => handleChangeUserRole(user.id, 'user')} className="button-demote">
                            Rétrograder en User
                          </button>
                        )}
                    </>
                )}
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
                {recipe.nom} (Catégorie: {recipe.categorie}, Par: {recipe.owner ? recipe.owner : 'Inconnu'})
                <button onClick={() => handleDeleteRecipe(recipe._id)} className="button-delete">Supprimer</button>
                {/* Optionnel: Vous pourriez ajouter un bouton pour modifier ici, qui redirigerait vers un formulaire de modification de recette */}
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune recette trouvée.</p>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;