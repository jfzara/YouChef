// src/pages/Dashboard/RecipeCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import api from '../../api/axiosInstance'; // <-- Corrected path here
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Button, FormGroup } from './Dashboard.styles'; // Réutilisation des styles génériques

// Styles spécifiques à RecipeCard
const StyledRecipeCard = styled(motion.div)`
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  border: 1px solid var(--color-neutral-200);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary-200);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-4);
    box-shadow: var(--shadow-sm);
  }

  h3 {
    font-family: var(--font-family-heading);
    font-size: var(--text-2xl);
    color: var(--color-primary-700);
    margin-bottom: var(--space-2);
  }

  p {
    font-size: var(--text-base);
    color: var(--color-neutral-700);
    line-height: 1.5;
    margin-bottom: var(--space-2);
    max-height: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .meta-info {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    font-size: var(--text-sm);
    color: var(--color-neutral-600);
    margin-top: auto;

    span {
      background: var(--color-neutral-100);
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-full);
      border: 1px solid var(--color-neutral-200);
    }
  }

  .actions {
    display: flex;
    gap: var(--space-3);
    margin-top: var(--space-4);

    button {
      flex: 1;
      font-size: var(--text-sm);
      padding: var(--space-2) var(--space-4);
      box-shadow: var(--shadow-xs);

      &:last-child {
        background: var(--color-error);
        &:hover {
          background: var(--color-error-dark);
        }
      }
    }
  }
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-top: var(--space-4);
`;

const RecipeCard = ({ recette, onDelete, onUpdate }) => {
  const { token } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    nom: recette.nom,
    description: recette.description,
    categorie: recette.categorie,
    sousCategorie: recette.sousCategorie,
    imageUrl: recette.imageUrl || '',
  });
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la recette "${recette.nom}" ?`)) {
      setLoading(true);
      try {
        await api.delete(`/recettes/${recette._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        onDelete(recette._id);
      } catch (error) {
        console.error('Erreur lors de la suppression de la recette:', error);
        toast.error(error.response?.data?.message || 'Erreur lors de la suppression.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.put(`/recettes/${recette._id}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      onUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la recette:', error);
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledRecipeCard
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {recette.imageUrl && <img src={recette.imageUrl} alt={recette.nom} />}

      {!isEditing ? (
        <>
          <h3>{recette.nom}</h3>
          <p>{recette.description}</p>
          <div className="meta-info">
            {recette.categorie && <span>Catégorie: {recette.categorie}</span>}
            {recette.sousCategorie && <span>Sous-catégorie: {recette.sousCategorie}</span>}
            <span>Ajoutée le: {new Date(recette.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="actions">
            <Button onClick={() => setIsEditing(true)} disabled={loading}>
              Éditer
            </Button>
            <Button onClick={handleDelete} disabled={loading} style={{ background: 'var(--color-error)' }}>
              Supprimer
            </Button>
          </div>
        </>
      ) : (
        <EditForm onSubmit={handleUpdate}>
          <FormGroup>
            <label htmlFor={`edit-nom-${recette._id}`}>Nom</label>
            <input
              type="text"
              id={`edit-nom-${recette._id}`}
              name="nom"
              value={editFormData.nom}
              onChange={handleEditChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor={`edit-description-${recette._id}`}>Description</label>
            <textarea
              id={`edit-description-${recette._id}`}
              name="description"
              value={editFormData.description}
              onChange={handleEditChange}
            ></textarea>
          </FormGroup>
          <FormGroup>
            <label htmlFor={`edit-categorie-${recette._id}`}>Catégorie</label>
            <input
              type="text"
              id={`edit-categorie-${recette._id}`}
              name="categorie"
              value={editFormData.categorie}
              onChange={handleEditChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor={`edit-sousCategorie-${recette._id}`}>Sous-catégorie</label>
            <input
              type="text"
              id={`edit-sousCategorie-${recette._id}`}
              name="sousCategorie"
              value={editFormData.sousCategorie}
              onChange={handleEditChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor={`edit-imageUrl-${recette._id}`}>URL de l'image</label>
            <input
              type="text"
              id={`edit-imageUrl-${recette._id}`}
              name="imageUrl"
              value={editFormData.imageUrl}
              onChange={handleEditChange}
              placeholder="URL de l'image"
            />
          </FormGroup>
          <div className="actions">
            <Button type="submit" disabled={loading}>
              {loading ? 'Mise à jour...' : 'Sauvegarder'}
            </Button>
            <Button type="button" onClick={() => setIsEditing(false)} disabled={loading} style={{ background: 'var(--color-neutral-500)' }}>
              Annuler
            </Button>
          </div>
        </EditForm>
      )}
    </StyledRecipeCard>
  );
};

export default RecipeCard;