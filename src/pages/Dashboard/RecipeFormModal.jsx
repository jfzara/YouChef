

// src/pages/Dashboard/RecipeFormModal.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';
import { useAuth } from '../../contexts/AuthContext';

// --- Styles pour le Modal ---

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6); /* Fond sombre semi-transparent */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal); /* S'assure que le modal est au-dessus de tout */
  backdrop-filter: blur(5px); /* Effet de flou sur l'arrière-plan du modal */
`;

const ModalContent = styled(motion.div)`
  background: var(--color-neutral-0);
  border-radius: var(--radius-2xl); /* Bords arrondis pour un look doux */
  padding: var(--space-8);
  box-shadow: var(--shadow-2xl);
  max-width: 600px; /* Largeur maximale du modal */
  width: 90%; /* Prend 90% de la largeur disponible */
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);

  @media (max-width: 768px) {
    padding: var(--space-6);
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  background: none;
  border: none;
  font-size: var(--text-2xl);
  color: var(--color-neutral-600);
  cursor: pointer;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-error-light);
    color: var(--color-error-dark);
    transform: rotate(90deg);
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  color: var(--color-primary-700);
  font-size: var(--text-3xl);
  margin-bottom: var(--space-4);
`;

const FormGroup = styled.div`
  margin-bottom: var(--space-4);

  label {
    display: block;
    margin-bottom: var(--space-2);
    font-weight: var(--font-semibold);
    color: var(--color-neutral-700);
  }

  input[type="text"],
  textarea {
    width: 100%;
    padding: var(--space-3);
    border: 1px solid var(--color-neutral-300);
    border-radius: var(--radius-md);
    font-family: var(--font-family-sans);
    font-size: var(--text-base);
    transition: all var(--transition-fast);
    outline: none; /* Supprime l'outline par défaut du navigateur */

    &:focus {
      border-color: var(--color-primary-500);
      box-shadow: 0 0 0 3px var(--color-primary-100); /* Effet d'auréole */
      transform: translateY(-2px); /* Léger déplacement vers le haut au focus */
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: var(--space-4);
  background: var(--gradient-primary);
  color: var(--color-neutral-0);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);

  &:hover {
    background: var(--gradient-secondary);
    box-shadow: var(--shadow-lg);
    transform: translateY(-2px); /* Léger "saut" au survol */
  }

  &:active {
    transform: translateY(0); /* Retour à la position normale au clic */
    box-shadow: var(--shadow-sm);
  }

  &:disabled {
    background: var(--color-neutral-300);
    cursor: not-allowed;
    box-shadow: none;
  }
`;

// --- Composant Principal du Modal ---

const RecipeFormModal = ({ isOpen, onClose, onRecipeAdded, onRecipeUpdated, recipeToEdit }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    categorie: '',
    sousCategorie: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);

  // Remplir le formulaire si une recette est passée pour édition
  useEffect(() => {
    if (recipeToEdit) {
      setFormData({
        nom: recipeToEdit.nom || '',
        description: recipeToEdit.description || '',
        categorie: recipeToEdit.categorie || '',
        sousCategorie: recipeToEdit.sousCategorie || '',
        imageUrl: recipeToEdit.imageUrl || '',
      });
    } else {
      // Réinitialiser le formulaire si pas de recette à éditer (pour ajout)
      setFormData({
        nom: '',
        description: '',
        categorie: '',
        sousCategorie: '',
        imageUrl: '',
      });
    }
  }, [recipeToEdit, isOpen]); // Déclenche quand recipeToEdit change ou le modal s'ouvre/ferme

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (recipeToEdit) {
        // Mode édition
        response = await api.put(`/recettes/${recipeToEdit._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Recette mise à jour avec succès ! ✨");
        if (onRecipeUpdated) onRecipeUpdated(response.data);
      } else {
        // Mode ajout
        response = await api.post('/recettes', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Recette ajoutée avec succès ! 🎉");
        if (onRecipeAdded) onRecipeAdded(response.data);
      }
      onClose(); // Ferme le modal après succès
    } catch (error) {
      console.error('Erreur lors de la soumission de la recette:', error);
      toast.error(`Erreur : ${error.response?.data?.message || 'Quelque chose a mal tourné.'}`);
    } finally {
      setLoading(false);
    }
  };

  // Variants pour l'animation Framer Motion
  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh", scale: 0.5, rotate: -10 },
    visible: {
      opacity: 1,
      y: "0",
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        when: "beforeChildren", // Anime l'overlay avant le contenu
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: "100vh",
      scale: 0.5,
      rotate: 10,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Ferme le modal en cliquant sur l'overlay
        >
          <ModalContent
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Empêche le clic sur le contenu de fermer le modal
          >
            <CloseButton onClick={onClose} whileTap={{ scale: 0.9 }}>
              &times; {/* Symbole "x" pour fermer */}
            </CloseButton>
            <FormTitle>{recipeToEdit ? 'Modifier la Recette' : 'Ajouter une Nouvelle Recette'}</FormTitle>
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
                <label htmlFor="description">Description (ingrédients, étapes)</label>
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
                />
              </FormGroup>
              <SubmitButton type="submit" disabled={loading} whileTap={{ scale: 0.95 }}>
                {loading ? 'Envoi...' : recipeToEdit ? 'Mettre à jour la recette' : 'Ajouter la recette'}
              </SubmitButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default RecipeFormModal;