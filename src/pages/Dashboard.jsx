// src/pages/Dashboard/Dashboard.jsx

import React, { useEffect } from 'react'; // Assurez-vous que useEffect est importé
 
import {
  DashboardContainer,
  DashboardGrid,
  SectionTitle,
  Card,
  FormGroup,
  Button,
  StatusMessage,
} from './Dashboard.styles';

const Dashboard = () => {
  // --- NOUVEAU CODE ICI ---
  useEffect(() => {
    const handleMouseMove = (event) => {
      const sensitivity = 0.01; // Ajustez cette valeur pour contrôler l'intensité du mouvement (plus petit = plus subtil)
      const zoomIntensity = 0.005; // Ajustez pour le mini-zoom (plus petit = plus subtil)

      // Calculer la position normalisée de la souris (-0.5 à 0.5) par rapport au centre de la fenêtre
      const mouseX = event.clientX - (window.innerWidth / 2);
      const mouseY = event.clientY - (window.innerHeight / 2);

      // Calculer le décalage pour l'effet de mouvement
      const moveX = -mouseX * sensitivity;
      const moveY = -mouseY * sensitivity;

      // Calculer le zoom basé sur la distance du centre (plus on est près du centre, moins de zoom)
      // distance est entre 0 (centre) et ~largeur/2 (bord)
      const distanceFromCenter = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const maxDistance = Math.sqrt((window.innerWidth / 2)**2 + (window.innerHeight / 2)**2);
      const normalizedDistance = distanceFromCenter / maxDistance; // entre 0 et 1
      
      // Le scale sera plus proche de 1.0 (pas de zoom) au centre, et augmentera vers les bords
      // On inverse pour que le zoom soit plus important sur les bords et moins au centre
      const scale = 1 + zoomIntensity * normalizedDistance;


      // Appliquer les transformations CSS au body
      // Utilisation d'un décalage (translate) et d'un léger zoom (scale)
      document.body.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
    };

    // Ajouter l'écouteur d'événement lorsque le composant est monté
    window.addEventListener('mousemove', handleMouseMove);

    // Fonction de nettoyage : retirer l'écouteur et réinitialiser la transformation lorsque le composant est démonté
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.style.transform = ''; // Important pour réinitialiser le style
    };
  }, []); // Le tableau de dépendances vide signifie que cet effet s'exécute une seule fois au montage et au démontage

  // ... (Reste de votre composant Dashboard) ...

  return (
    <DashboardContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h1>Tableau de bord</h1>

      <DashboardGrid>
        <Card
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-2xl)' }}
        >
          <SectionTitle>Mes Recettes</SectionTitle>
          {/* Contenu des recettes */}
          <p>Gérez et découvrez vos recettes.</p>
          <Button>Voir mes recettes</Button>
        </Card>

        <Card
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-2xl)' }}
        >
          <SectionTitle>Ajouter une Recette</SectionTitle>
          {/* Formulaire d'ajout de recette */}
          <FormGroup>
            <label htmlFor="recipeName">Nom de la recette</label>
            <input type="text" id="recipeName" placeholder="Ex: Pâtes Carbonara" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="ingredients">Ingrédients</label>
            <textarea id="ingredients" placeholder="Ex: 200g pâtes, 150g lardons..."></textarea>
          </FormGroup>
          <Button>Ajouter</Button>
          <StatusMessage className="success">Recette ajoutée !</StatusMessage>
        </Card>
      </DashboardGrid>
    </DashboardContainer>
  );
};

export default Dashboard;