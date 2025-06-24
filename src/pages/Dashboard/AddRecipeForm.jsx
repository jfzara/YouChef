// src/pages/Dashboard/AddRecipeForm.jsx
import React, { useState } from 'react';
// Assurez-vous que StatusMessage est un composant motion pour les animations
import { Card, FormGroup, Button, StatusMessage } from './Dashboard.styles';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';

const AddRecipeForm = ({ onRecipeAdded, onClose }) => { // Ajout de onClose pour la fermeture de la modale
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    categorie: '',
    sousCategorie: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  // Supprimons l'état 'message' car nous allons nous fier entièrement à react-toastify pour les notifications.
  // const [message, setMessage] = useState(null); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setMessage(null); // Plus nécessaire

    try {
      await api.post('/recettes', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Recette ajoutée avec succès ! 🎉"); // Ajout d'un emoji pour plus de visibilité
      // Le message de statut interne n'est plus nécessaire car Toastify le gère
      // setMessage({ type: 'success', text: 'Recette ajoutée avec succès !' }); 
      setFormData({ // Reset form
        nom: '',
        description: '',
        categorie: '',
        sousCategorie: '',
        imageUrl: '',
      });
      if (onRecipeAdded) {
        onRecipeAdded(); // Callback to refresh data in parent (UserRecipeList)
      }
      // Ferme la modale après un ajout réussi
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recette:', error);
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de l\'ajout de la recette.';
      toast.error(`Échec de l'ajout : ${errorMessage} 😕`); // Message d'erreur plus clair avec emoji
      // setMessage({ type: 'error', text: errorMessage }); // Plus nécessaire
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card> {/* Pas besoin de motion props ici si Card est stylisé par Dashboard.styles */}
      <h3
        style={{ color: 'var(--color-primary-600)', marginBottom: 'var(--space-4)' }}
      >
        Ajouter une Nouvelle Recette
      </h3>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="nom">Nom de la recette</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </FormGroup>
        <FormGroup>
          <label htmlFor="categorie">Catégorie</label>
          <input
            type="text"
            id="categorie"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="sousCategorie">Sous-catégorie</label>
          <input
            type="text"
            id="sousCategorie"
            name="sousCategorie"
            value={formData.sousCategorie}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="imageUrl">URL de l'image (facultatif)</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Ex: https://example.com/ma-recette.jpg"
          />
        </FormGroup>
        <Button type="submit" disabled={loading}>
          {loading ? 'Ajout en cours...' : 'Ajouter Recette'}
        </Button>
        {/* Suppression du StatusMessage interne, on se fie à react-toastify */}
        {/* {message && (
          <StatusMessage
            className={message.type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message.text}
          </StatusMessage>
        )} */}
      </form>
    </Card>
  );
};

export default AddRecipeForm;