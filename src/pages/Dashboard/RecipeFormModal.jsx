// C:\Users\Jeff\Desktop\PROJETS VS CODE\JAVASCRIPT\REACT\recettesreact\src\pages\Dashboard\RecipeFormModal.jsx

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import api from '../../api/axiosInstance';
import { useAuth } from '../../contexts/AuthContext';

// Importe l'icône de fermeture
import CloseIcon from '../../assets/icons/close.svg';

// --- Définition des catégories principales (DOIT correspondre à l'enum Mongoose). ---
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
    input[type="file"], /* Ajouté */
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

    /* Style spécifique pour input type file */
    input[type="file"] {
        background-color: var(--color-neutral-50);
        cursor: pointer;
        &::file-selector-button {
            background-color: var(--color-primary-500);
            color: white;
            border: none;
            padding: var(--space-2) var(--space-4);
            border-radius: var(--radius-md);
            cursor: pointer;
            margin-right: var(--space-3);
            transition: background-color 0.2s ease;

            &:hover {
                background-color: var(--color-primary-600);
            }
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

const ImagePreview = styled.div`
    margin-top: var(--space-3);
    display: flex;
    align-items: center;
    gap: var(--space-3);
    border: 1px solid var(--color-neutral-200);
    border-radius: var(--radius-md);
    padding: var(--space-3);
    background-color: var(--color-neutral-50);

    img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-neutral-300);
    }

    button {
        background: var(--color-error);
        color: white;
        border: none;
        padding: var(--space-2) var(--space-3);
        border-radius: var(--radius-md);
        cursor: pointer;
        font-size: var(--text-sm);
        transition: background-color 0.2s ease;

        &:hover {
            background: var(--color-error-dark);
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
        categorie: '',
        sousCategorie: '',
        // imageUrl: '', // Supprimez cet état, il ne sera plus géré directement par l'input text
    });
    const [selectedFile, setSelectedFile] = useState(null); // Nouvel état pour le fichier
    const [previewImage, setPreviewImage] = useState(null); // État pour l'URL de prévisualisation
    const [loading, setLoading] = useState(false);

    // Effet pour initialiser le formulaire et l'image lors de l'édition
    useEffect(() => {
        if (recipeToEdit) {
            setFormData({
                nom: recipeToEdit.nom || '',
                description: recipeToEdit.description || '',
                categorie: recipeToEdit.categorie || '',
                sousCategorie: recipeToEdit.sousCategorie || '',
                // imageUrl: '', // Ne pas initialiser selectedFile ici, ni imageUrl directement.
            });
            // Si une image existe pour la recette à éditer, l'afficher en prévisualisation
            setPreviewImage(recipeToEdit.imageUrl || null);
            setSelectedFile(null); // Réinitialiser le fichier sélectionné
        } else {
            // Réinitialiser le formulaire pour un ajout
            setFormData({
                nom: '',
                description: '',
                categorie: '',
                sousCategorie: '',
            });
            setSelectedFile(null);
            setPreviewImage(null);
        }
    }, [recipeToEdit, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Nouvelle fonction pour gérer la sélection de fichier
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Créer une URL de prévisualisation pour l'image
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            // Si pas de fichier sélectionné et pas de recette à éditer avec image, effacer la prévisualisation
            if (!recipeToEdit || !recipeToEdit.imageUrl) {
                setPreviewImage(null);
            }
        }
    };

    // Fonction pour supprimer l'image sélectionnée ou l'image existante lors de l'édition
    const handleRemoveImage = () => {
        setSelectedFile(null);
        setPreviewImage(null);
        // Important: Si nous sommes en mode édition et qu'il y avait une image,
        // le backend devra savoir qu'elle doit être supprimée.
        // On va le gérer en envoyant une information spécifique dans le FormData.
        // Pour l'instant, le backend gère que si le champ 'image' est absent, il ne la touche pas,
        // mais si 'imageUrl' est vide, il supprime l'ancienne.
        // On ajoutera une condition dans handleSubmit pour vider imageUrl dans le formData si l'utilisateur supprime l'image.
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // FormData est nécessaire pour envoyer des fichiers et d'autres données
        const dataToSend = new FormData();
        dataToSend.append('nom', formData.nom);
        dataToSend.append('description', formData.description);
        dataToSend.append('categorie', formData.categorie);
        dataToSend.append('sousCategorie', formData.sousCategorie);

        if (selectedFile) {
            // Si un nouveau fichier est sélectionné, l'ajouter
            dataToSend.append('image', selectedFile);
        } else if (recipeToEdit && !previewImage) {
            // Si nous sommes en mode édition, il y avait une image, et l'utilisateur l'a supprimée
            // On envoie un champ vide pour imageUrl pour indiquer au backend de la supprimer
            dataToSend.append('imageUrl', ''); // Cela indiquera au backend de supprimer l'image existante
        }
        // Si selectedFile est null et previewImage n'est pas null,
        // cela signifie que l'utilisateur n'a pas uploadé de nouvelle image
        // et n'a pas supprimé l'ancienne (en mode édition).
        // Dans ce cas, nous n'envoyons pas le champ 'image' du tout,
        // et le backend laissera l'image existante inchangée.


        try {
            let response;
            if (recipeToEdit) {
                // Mode édition
                response = await api.put(`/recettes/${recipeToEdit._id}`, dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data', // Indique au backend qu'il s'agit de FormData
                    },
                });
                toast.success("Recette mise à jour avec succès ! ✨");
                if (onRecipeUpdated) onRecipeUpdated(response.data);
            } else {
                // Mode ajout
                response = await api.post('/recettes', dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data', // Indique au backend qu'il s'agit de FormData
                    },
                });
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
                                    rows="6"
                                    placeholder="Ex: Pour la pâte: 200g de farine... Pour les pommes: 5 pommes Golden..."
                                ></textarea>
                            </FormGroup>
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

                            {/* --- NOUVEAU : CHAMP D'UPLOAD D'IMAGE --- */}
                            <FormGroup>
                                <label htmlFor="image">Image de la recette (facultatif)</label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image" // IMPORTANT : doit être 'image'
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                {previewImage && (
                                    <ImagePreview>
                                        <img src={previewImage} alt="Prévisualisation" />
                                        <button type="button" onClick={handleRemoveImage}>
                                            Supprimer l'image
                                        </button>
                                    </ImagePreview>
                                )}
                            </FormGroup>
                            {/* --- FIN NOUVEAU CHAMP D'UPLOAD D'IMAGE --- */}

                            <SubmitButton type="submit" disabled={loading}>
                                {loading ? 'Envoi en cours...' : (recipeToEdit ? 'Mettre à jour la recette 🚀' : 'Ajouter la recette ➕')}
                            </SubmitButton>
                        </form>
                    </ModalContent>
                </ModalOverlay>
            )}
        </AnimatePresence>
    );
};

export default RecipeFormModal;