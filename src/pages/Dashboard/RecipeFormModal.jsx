
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';
import { useAuth } from '../../contexts/AuthContext';

// Importe l'icône de fermeture
import CloseIcon from '../../assets/icons/close.svg'; 

// --- Définition des catégories principales (DOIT correspondre à l'enum Mongoose) ---
const CATEGORIES_PRINCIPALES = [
  'Plats Principaux',
  'Entrées & Apéritifs',
  'Desserts',
  'Boissons',
  'Accompagnements',
  'Petit-déjeuner & Brunch',
  'Boulangerie & Pâtisserie',
  'Snacks & Encas',
  'Autres'
];

// --- Styles pour le Modal ---

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--z-modal);
  backdrop-filter: blur(5px);
  padding: var(--space-4); /* Ajout de padding pour les petits viewports */
`;

const ModalContent = styled(motion.div)`
  background: var(--color-neutral-0);
  border-radius: var(--radius-2xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-2xl);
  max-width: 600px;
  width: 90%; /* Garde une largeur relative */
  max-height: 90vh; /* Limite la hauteur sur les petits écrans */
  overflow-y: auto; /* Permet le défilement si le contenu dépasse */
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  border: 4px solid var(--color-info-500);

  @media (max-width: 768px) {
    padding: var(--space-6);
    width: 95%; /* Un peu plus large sur les très petits écrans */
    gap: var(--space-4);
  }

  @media (max-width: 480px) {
    padding: var(--space-4);
    gap: var(--space-3);
  }
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: var(--space-3); 
  right: var(--space-3); 
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
    transform: rotate(90deg) scale(1.1); /* Rotation et léger grossissement */
  }

  img { /* Nouveau style pour l'image */
    width: 28px; /* Taille d'icône plus grande */
    height: 28px;
    filter: invert(30%) sepia(0%) saturate(1%) hue-rotate(0deg) brightness(0%) contrast(100%);
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  color: var(--color-primary-700);
  font-size: var(--text-3xl);
  margin-bottom: var(--space-4);
  text-shadow: var(--shadow-text-sm);

  @media (max-width: 768px) {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-3);
  }
`;

const FormGroup = styled.div`
  margin-bottom: var(--space-4);

  label {
    display: block;
    margin-bottom: var(--space-2);
    font-weight: var(--font-semibold);
    color: var(--color-neutral-700);
    font-size: var(--text-base); /* Ajustement pour la lisibilité */

    @media (max-width: 768px) {
      font-size: var(--text-sm);
    }
  }

  input[type="text"],
  textarea,
  select { /* Ajout de 'select' aux styles */
    width: 100%;
    padding: var(--space-3);
    border: 1px solid var(--color-neutral-300);
    border-radius: var(--radius-md);
    font-family: var(--font-family-sans);
    font-size: var(--text-base);
    transition: all var(--transition-fast);
    outline: none;
    box-sizing: border-box; /* S'assure que padding n'augmente pas la largeur */

    &:focus {
      border-color: var(--color-secondary-500);
      box-shadow: 0 0 0 4px var(--color-secondary-100);
      transform: translateY(-2px);
    }

    @media (max-width: 768px) {
      padding: var(--space-2);
      font-size: var(--text-sm);
    }
  }

  textarea {
    min-height: 120px;
    resize: vertical;
    @media (max-width: 768px) {
      min-height: 80px;
    }
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: var(--space-4);
  background: var(--gradient-primary); /* S'assure que le background est un dégradé */
  color: var(--color-neutral-0);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex; /* Centrer le contenu */
  justify-content: center;
  align-items: center;
  gap: var(--space-2); /* Espace entre texte et emoji */

  &:hover {
    background: var(--gradient-secondary); /* Changer le dégradé au survol */
    box-shadow: var(--shadow-lg);
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }

  &:disabled {
    background: var(--color-neutral-300);
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.7; /* Légère opacité pour désactivé */
  }

  @media (max-width: 768px) {
    padding: var(--space-3);
    font-size: var(--text-base);
  }
`;

// --- Composant Principal du Modal ---

const RecipeFormModal = ({ isOpen, onClose, onRecipeAdded, onRecipeUpdated, recipeToEdit }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    categorie: '', // Laisser vide pour la sélection par défaut du select
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
  }, [recipeToEdit, isOpen]); // Dépend de isOpen aussi pour réinitialiser quand on ouvre pour un ajout

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
        // Modifié le message toast pour la recette ajoutée
        toast.success("Recette ajoutée ! 🎉 Votre chef-d'œuvre est en ligne !");
        if (onRecipeAdded) onRecipeAdded(response.data);
      }
      onClose(); // Ferme la modale après succès
    } catch (error) {
      console.error('Erreur lors de la soumission de la recette:', error);
      toast.error(`Erreur : ${error.response?.data?.message || 'Quelque chose a mal tourné.'}`);
    } finally {
      setLoading(false);
    }
  };

  // Variants pour l'animation Framer Motion - Rendre plus "fun" et "quirky"
  const modalVariants = {
    hidden: { opacity: 0, y: "-100vh", scale: 0.2, rotate: -30 },
    visible: {
      opacity: 1,
      y: "0",
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: "100vh",
      scale: 0.2,
      rotate: 30,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose} whileTap={{ scale: 0.9 }} aria-label="Fermer le modal">
              <img src={CloseIcon} alt="Fermer" />
            </CloseButton>
            <FormTitle>{recipeToEdit ? 'Modifier cette Pépite ✍️' : 'Ajouter une Nouvelle Création 🤩'}</FormTitle>
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
                  placeholder="Ex: Tarte Tatin aux pommes"
                />
              </FormGroup>
              <FormGroup>
                <label htmlFor="description">Description (ingrédients, étapes)</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6" /* Augmentation du nombre de lignes pour plus de visibilité */
                  placeholder="Ex: Pour la pâte: 200g de farine... Pour les pommes: 5 pommes Golden..."
                ></textarea>
              </FormGroup>
              {/* --- NOUVEAU: Champ de catégorie avec liste déroulante --- */}
              <FormGroup>
                <label htmlFor="categorie">Catégorie principale</label>
                <select
                  id="categorie"
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Sélectionnez une catégorie --</option>
                  {CATEGORIES_PRINCIPALES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </FormGroup>

              <FormGroup>
                <label htmlFor="sousCategorie">Sous-catégorie (optionnel)</label>
                <input
                  type="text"
                  id="sousCategorie"
                  name="sousCategorie"
                  value={formData.sousCategorie}
                  onChange={handleChange}
                  placeholder="Ex: Cuisine française, Végétarien"
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
              <SubmitButton
                type="submit"
                disabled={loading}
                // Animation de tap directement sur le bouton, l'hover est dans le styled component
                whileTap={{ scale: 0.95 }}
              >
                {loading ? (
                  <>Envoi en cours... ⏳</>
                ) : recipeToEdit ? (
                  <>Mettre à jour la recette 🚀</>
                ) : (
                  <>Ajouter la recette 🥳</>
                )}
              </SubmitButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default RecipeFormModal;