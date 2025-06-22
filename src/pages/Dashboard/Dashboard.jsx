// src/pages/Dashboard/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Card,
  Button, // <== AJOUTER CET IMPORT
} from './Dashboard.styles';
import AddRecipeForm from './AddRecipeForm';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { token } = useAuth();
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [stats, setStats] = useState({ totalRecipes: 0, totalCategories: 0, totalSousCategories: 0 });
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const [errorStats, setErrorStats] = useState(null);
  const [errorRecent, setErrorRecent] = useState(null);

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

  const fetchRecentRecipes = async () => {
    setLoadingRecent(true);
    setErrorRecent(null);
    try {
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

  useEffect(() => {
    if (token) {
      fetchDashboardStats();
      fetchRecentRecipes();
    }
  }, [token]);

  const handleRecipeAdded = () => {
    fetchDashboardStats();
    fetchRecentRecipes();
    setShowAddRecipeModal(false);
  };

  return (
    <DashboardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1>Vue d'ensemble du Tableau de Bord</h1>

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