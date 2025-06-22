// src/pages/Dashboard/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence for exit animations
import {
  DashboardContainer,
  DashboardGrid,
  SectionTitle,
  AddRecipeToggleCard,
  AddRecipeModalOverlay,
  AddRecipeModalContent,
  CloseButton,
  StatsGrid,
  StatCard,
  RecentRecipesSection,
  RecipeList,
  RecipeListItem,
  Card, // <-- CORRECTION ICI : 'Card' est maintenant importé
} from './Dashboard.styles'; // Import new styled components
import AddRecipeForm from './AddRecipeForm'; // Import the AddRecipeForm component
import api from '../../api/axiosInstance'; // Assuming you have an Axios instance for API calls
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext'; // To get the token

const Dashboard = () => {
  const { token } = useAuth(); // Get token for API requests
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [stats, setStats] = useState({ totalRecipes: 0, totalCategories: 0, totalSousCategories: 0 });
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [errorStats, setErrorStats] = useState(null);
  const [errorRecent, setErrorRecent] = useState(null);

  // Function to fetch dashboard statistics
  const fetchDashboardStats = async () => {
    setLoadingStats(true);
    setErrorStats(null);
    try {
      const response = await api.get('/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setErrorStats("Échec du chargement des statistiques.");
      toast.error("Échec du chargement des statistiques du tableau de bord.");
    } finally {
      setLoadingStats(false);
    }
  };

  // Function to fetch recent recipes
  const fetchRecentRecipes = async () => {
    setLoadingRecent(true);
    setErrorRecent(null);
    try {
      // Note: Backend /dashboard/recent-recipes endpoint doesn't seem to require auth or filter by user,
      // but it's good practice to send the token if your API generally expects it.
      const response = await api.get('/dashboard/recent-recipes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecentRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recent recipes:", error);
      setErrorRecent("Échec du chargement des recettes récentes.");
      toast.error("Échec du chargement des recettes récentes.");
    } finally {
      setLoadingRecent(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    if (token) {
      fetchDashboardStats();
      fetchRecentRecipes();
    }
  }, [token]); // Re-fetch if token changes (e.g., after login)

  // Function to refresh all data after a new recipe is added
  const handleRecipeAdded = () => {
    fetchDashboardStats();
    fetchRecentRecipes();
    setShowAddRecipeModal(false); // Close the modal after adding
  };

  return (
    <DashboardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1>Vue d'ensemble du Tableau de Bord</h1>

      {/* Dashboard Statistics */}
      <section>
        <SectionTitle>Statistiques Clés</SectionTitle>
        {loadingStats ? (
          <p>Chargement des statistiques...</p>
        ) : errorStats ? (
          <p className="error">{errorStats}</p>
        ) : (
          <StatsGrid>
            <StatCard whileHover={{ scale: 1.02 }}>
              <h3>{stats.totalRecipes}</h3>
              <p>Recettes Totales</p>
            </StatCard>
            <StatCard whileHover={{ scale: 1.02 }}>
              <h3>{stats.totalCategories}</h3>
              <p>Catégories Uniques</p>
            </StatCard>
            <StatCard whileHover={{ scale: 1.02 }}>
              <h3>{stats.totalSousCategories}</h3>
              <p>Sous-catégories Uniques</p>
            </StatCard>
          </StatsGrid>
        )}
      </section>

      <DashboardGrid>
        {/* Add Recipe Toggle Card */}
        <AddRecipeToggleCard
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onClick={() => setShowAddRecipeModal(true)}
          whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-2xl)' }}
          whileTap={{ scale: 0.98 }}
        >
          <SectionTitle style={{ marginBottom: '0' }}>➕ Ajouter une Recette</SectionTitle>
          <p style={{ color: 'var(--color-neutral-600)', marginTop: 'var(--space-2)' }}>Cliquez pour créer une nouvelle recette.</p>
        </AddRecipeToggleCard>

        {/* Existing "My Recipes" Card Placeholder (optional, remove if not needed) */}
        <Card
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-2xl)' }}
        >
          <SectionTitle>Mes Recettes</SectionTitle>
          <p>Gérez vos propres recettes, modifiez-les ou supprimez-les.</p>
          <Button>Voir mes recettes (Bientôt!)</Button>
        </Card>
      </DashboardGrid>

      {/* Recent Recipes Section */}
      <RecentRecipesSection>
        <SectionTitle>Recettes Récentes</SectionTitle>
        {loadingRecent ? (
          <p>Chargement des recettes récentes...</p>
        ) : errorRecent ? (
          <p className="error">{errorRecent}</p>
        ) : recentRecipes.length === 0 ? (
          <p>Aucune recette récente à afficher. Ajoutez-en une !</p>
        ) : (
          <RecipeList>
            <AnimatePresence>
              {recentRecipes.map((recipe, index) => (
                <RecipeListItem
                  key={recipe._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <h4>{recipe.nom}</h4>
                  <p>{recipe.description.substring(0, 80)}{recipe.description.length > 80 ? '...' : ''}</p>
                  <span>{new Date(recipe.createdAt).toLocaleDateString()}</span>
                </RecipeListItem>
              ))}
            </AnimatePresence>
          </RecipeList>
        )}
      </RecentRecipesSection>

      {/* Add Recipe Modal */}
      <AnimatePresence>
        {showAddRecipeModal && (
          <AddRecipeModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AddRecipeModalContent
              initial={{ scale: 0.8, y: -50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -50, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", damping: 15, stiffness: 300 }}
            >
              <CloseButton
                onClick={() => setShowAddRecipeModal(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </CloseButton>
              <AddRecipeForm onRecipeAdded={handleRecipeAdded} />
            </AddRecipeModalContent>
          </AddRecipeModalOverlay>
        )}
      </AnimatePresence>
    </DashboardContainer>
  );
};

export default Dashboard;