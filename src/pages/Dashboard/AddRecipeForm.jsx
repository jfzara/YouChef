// src/pages/Dashboard/AddRecipeForm.jsx
import React, { useState } from 'react';
import { Card, FormGroup, Button, StatusMessage } from './Dashboard.styles'; // Ensure these are correctly imported from your styles
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance'; // Assuming you have this axios setup

const AddRecipeForm = ({ onRecipeAdded }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    categorie: '',
    sousCategorie: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await api.post('/recettes', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success("Recette ajoutée avec succès !");
      setMessage({ type: 'success', text: 'Recette ajoutée avec succès !' });
      setFormData({ // Reset form
        nom: '',
        description: '',
        categorie: '',
        sousCategorie: '',
        imageUrl: '',
      });
      if (onRecipeAdded) {
        onRecipeAdded(); // Callback to refresh data in parent
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recette:', error);
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de l\'ajout de la recette.';
      toast.error(errorMessage);
      setMessage({ type: 'error', text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      // No motion props here, these will be managed by the parent Dashboard for the modal effect
    >
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
        {message && (
          <StatusMessage
            className={message.type}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {message.text}
          </StatusMessage>
        )}
      </form>
    </Card>
  );
};

export default AddRecipeForm;