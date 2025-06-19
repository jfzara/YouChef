import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import styled from 'styled-components'; // Importez styled-components
import { motion, AnimatePresence } from 'framer-motion'; // Importez motion et AnimatePresence

// Importez la nouvelle image de fond pour le Dashboard
import HerbsGarlicBackground from '../assets/images/HerbsGarlic.jpg';

// --- Styled Components pour le Dashboard ---
const DashboardContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-8) var(--space-4); /* Utilise vos variables d'espacement */
  padding-bottom: calc(var(--space-8) + 70px); /* Espace pour la navbar du bas */

  background-image: url(${HerbsGarlicBackground});
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;

  color: var(--neutral-800); /* Couleur de texte par défaut */
  text-align: center;
  position: relative; /* Nécessaire pour le z-index du contenu */

  /* Media query pour les petits écrans */
  @media (max-width: 768px) {
    padding: var(--space-6) var(--space-2);
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 900px;
  width: 100%;
  padding: var(--space-8);
  /* Assurez-vous que --neutral-0-rgb est défini comme "255, 255, 255" et non "#FFFFFF" */
  background-color: rgba(var(--neutral-0-rgb, 255, 255, 255), 0.85); /* Fond blanc TRÈS légèrement transparent, avec fallback */
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  margin-top: var(--space-8);
  margin-bottom: var(--space-8);
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: var(--space-6);
    margin-top: var(--space-6);
    margin-bottom: var(--space-6);
  }
`;

const DashboardTitle = styled(motion.h1)`
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  color: var(--soft-green-800, #2E8B57); /* Couleur de titre cohérente, avec fallback */
  margin-bottom: var(--space-3);

  @media (max-width: 768px) {
    font-size: var(--text-3xl);
  }
`;

const DashboardSubtitle = styled(motion.p)`
  font-family: var(--font-body);
  font-size: var(--text-lg);
  color: var(--neutral-700, #4A4A4A); /* Couleur de texte, avec fallback */
  margin-bottom: var(--space-6);

  @media (max-width: 768px) {
    font-size: var(--text-base);
  }
`;

const ToggleAddButton = styled(motion.button)`
  padding: var(--space-3) var(--space-6);
  background-color: ${props => props.$isAdding ? 'var(--neutral-500, #888)' : 'var(--soft-blue-500, #4682B4)'};
  color: var(--neutral-0, #FFFFFF);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  font-size: var(--text-lg);
  font-weight: 600;
  transition: background-color var(--transition-fast, 0.2s);
  box-shadow: var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1));

  &:hover {
    background-color: ${props => props.$isAdding ? 'var(--neutral-600, #666)' : 'var(--soft-blue-600, #3A6690)'};
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg, 0 8px 10px rgba(0,0,0,0.15));
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
  }
`;

const FormContainer = styled(motion.div)`
  margin-bottom: var(--space-6);
  padding: var(--space-6);
  /* Assurez-vous que --soft-green-50-rgb est défini comme "240, 255, 240" */
  background-color: rgba(var(--soft-green-50-rgb, 240, 255, 240), 0.95); /* Fond très légèrement transparent, avec fallback */
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
  border: 1px solid var(--soft-green-200, #B0E0B0);
`;

const FormInput = styled.input`
  width: 100%;
  padding: var(--space-3, 12px);
  border: 2px solid var(--soft-green-400, #90EE90);
  border-radius: var(--radius-sm, 4px);
  font-size: var(--text-base, 1rem);
  box-sizing: border-box;
  background-color: var(--neutral-0, #FFFFFF);
  color: var(--neutral-800, #333333);

  &:focus {
    border-color: var(--soft-green-600, #66CDAA);
    outline: none;
    box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: var(--space-3, 12px);
  border: 2px solid var(--soft-green-400, #90EE90);
  border-radius: var(--radius-sm, 4px);
  font-size: var(--text-base, 1rem);
  box-sizing: border-box;
  background-color: var(--neutral-0, #FFFFFF);
  color: var(--neutral-800, #333333);

  &:focus {
    border-color: var(--soft-green-600, #66CDAA);
    outline: none;
    box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: var(--space-3, 12px);
  border: 2px solid var(--soft-green-400, #90EE90);
  border-radius: var(--radius-sm, 4px);
  font-size: var(--text-base, 1rem);
  box-sizing: border-box;
  resize: vertical;
  background-color: var(--neutral-0, #FFFFFF);
  color: var(--neutral-800, #333333);

  &:focus {
    border-color: var(--soft-green-600, #66CDAA);
    outline: none;
    box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
  }
`;

const SubmitButton = styled(motion.button)`
  padding: var(--space-3, 12px) var(--space-6, 24px);
  background-color: var(--soft-blue-500, #4682B4);
  color: var(--neutral-0, #FFFFFF);
  border: none;
  border-radius: var(--radius-md, 8px);
  cursor: pointer;
  font-size: var(--text-lg, 1.125rem);
  font-weight: 600;
  transition: background-color var(--transition-fast, 0.2s), transform var(--transition-fast, 0.2s), box-shadow var(--transition-fast, 0.2s);
  box-shadow: var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1));

  &:hover {
    background-color: var(--soft-blue-600, #3A6690);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg, 0 8px 10px rgba(0,0,0,0.15));
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
  }
`;

const RecipeList = styled(motion.div)`
  display: grid;
  gap: var(--space-4, 16px);
`;

const RecipeCard = styled(motion.div)`
  /* Assurez-vous que --soft-green-100-rgb est défini comme "220, 255, 220" */
  background-color: rgba(var(--soft-green-100-rgb, 220, 255, 220), 0.95); /* Fond de carte légèrement transparent, avec fallback */
  padding: var(--space-6, 24px);
  border-radius: var(--radius-lg, 12px);
  border: 1px solid var(--soft-green-300, #ADD8E6);
  box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1));
  }
`;

const RecipeTitle = styled.h3`
  color: var(--soft-green-700, #2E8B57);
  margin: 0 0 var(--space-2, 8px) 0;
  font-size: var(--text-xl, 1.25rem);
`;

const RecipeDescription = styled.p`
  color: var(--neutral-700, #4A4A4A);
  margin: 0;
  font-size: var(--text-base, 1rem);
  line-height: 1.5;
`;

const Tag = styled.span`
  background-color: ${props => props.$isCategory ? 'var(--soft-green-500, #66CDAA)' : 'var(--soft-blue-500, #4682B4)'};
  color: var(--neutral-0, #FFFFFF);
  padding: var(--space-1, 4px) var(--space-3, 12px);
  border-radius: var(--radius-full, 9999px);
  font-size: var(--text-sm, 0.875rem);
  font-weight: 600;
  white-space: nowrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--space-2, 8px);
  margin-top: var(--space-4, 16px);
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  padding: var(--space-2, 8px) var(--space-4, 16px);
  border: none;
  border-radius: var(--radius-md, 8px);
  color: var(--neutral-0, #FFFFFF);
  cursor: pointer;
  font-size: var(--text-sm, 0.875rem);
  font-weight: 600;
  transition: background-color var(--transition-fast, 0.2s), transform 0.1s;
  box-shadow: var(--shadow-xs, 0 1px 2px rgba(0,0,0,0.05));

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
  }
`;

const EditButton = styled(ActionButton)`
  background-color: var(--soft-blue-500, #4682B4);

  &:hover {
    background-color: var(--soft-blue-600, #3A6690);
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: var(--red-500, #D32F2F);

  &:hover {
    background-color: var(--red-600, #C62828);
  }
`;

const SaveButton = styled(ActionButton)`
  background-color: var(--green-500, #4CAF50);

  &:hover {
    background-color: var(--green-600, #43A047);
  }
`;

const CancelButton = styled(ActionButton)`
  background-color: var(--neutral-400, #BDBDBD);

  &:hover {
    background-color: var(--neutral-500, #9E9E9E);
  }
`;

const LinkButton = styled(Link)`
  padding: var(--space-3, 12px) var(--space-6, 24px);
  background-color: var(--soft-blue-500, #4682B4);
  color: var(--neutral-0, #FFFFFF);
  border-radius: var(--radius-md, 8px);
  text-decoration: none;
  font-weight: 600;
  transition: background-color var(--transition-fast, 0.2s), transform var(--transition-fast, 0.2s), box-shadow var(--transition-fast, 0.2s);
  box-shadow: var(--shadow-md, 0 4px 6px rgba(0,0,0,0.1));
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--soft-blue-600, #3A6690);
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg, 0 8px 10px rgba(0,0,0,0.15));
  }

  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
  }
`;

const SecondaryLinkButton = styled(LinkButton)`
  background-color: var(--neutral-0, #FFFFFF);
  color: var(--soft-blue-500, #4682B4);
  border: 2px solid var(--soft-blue-500, #4682B4);

  &:hover {
    background-color: var(--soft-blue-500, #4682B4);
    color: var(--neutral-0, #FFFFFF);
    border-color: var(--soft-blue-600, #3A6690);
  }
`;

// --- Composant Dashboard ---
const Dashboard = () => {
  const { token } = useAuth();
  const [recettesSauvegardees, setRecettesSauvegardees] = useState([]);
  const [nouvelleRecette, setNouvelleRecette] = useState({
    nom: '', description: '', categorie: '', sousCategorie: ''
  });
  const [recetteEnModification, setRecetteEnModification] = useState(null);
  const [recetteModifiee, setRecetteModifiee] = useState({
    nom: '', description: '', categorie: '', sousCategorie: ''
  });
  const [chargement, setChargement] = useState(true);
  const [modeAjout, setModeAjout] = useState(false);

  const categories = ['Entrées', 'Plats principaux', 'Desserts', 'Boissons', 'Apéritifs', 'Salades', 'Soupes', 'Pâtisseries'];
  const sousCategories = ['Végétarien', 'Végétalien', 'Sans gluten', 'Rapide', 'Facile', 'Difficile', 'Traditionnel', 'Moderne'];

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, x: -20 },
    visible: { opacity: 1, scale: 1, x: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10
      }
    }
  };

  useEffect(() => {
    // Console logs pour un meilleur suivi du cycle de vie
    console.log("Dashboard - useEffect déclenché. Appel de chargerRecettes().");
    chargerRecettes();
  }, [token]); // Ajout de 'token' comme dépendance pour recharger si le token change

  const chargerRecettes = async () => {
    console.log("chargerRecettes - Début du chargement des recettes...");
    if (!token) {
        console.warn("chargerRecettes - Pas de jeton d'authentification disponible. Affichage du message de non-connexion.");
        // Si pas de token, on met fin au chargement et on informe l'utilisateur
        setChargement(false);
        toast.info("Veuillez vous connecter pour voir vos recettes."); // Change à 'info' car ce n'est pas une erreur serveur
        return;
    }

    try {
      const response = await axios.get('/recettes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("chargerRecettes - Réponse de l'API (succès):", response.data);
      setRecettesSauvegardees(response.data);
      toast.success('Recettes chargées avec succès !');
    } catch (err) {
      toast.error('Erreur lors du chargement des recettes : ' + (err.response?.data?.message || err.message));
      console.error("chargerRecettes - Erreur lors du chargement des recettes:", err.response ? err.response.data : err.message);
    } finally {
      console.log("chargerRecettes - Fin du chargement. setChargement(false).");
      setChargement(false); // Assurez-vous toujours que le chargement se termine
    }
  };

  const ajouterRecette = async (e) => {
    e.preventDefault();
    if (!nouvelleRecette.nom.trim()) {
      toast.warning('Le nom de la recette est obligatoire');
      return;
    }
    if (!token) {
        toast.error("Veuillez vous connecter pour ajouter des recettes.");
        return;
    }

    try {
      const response = await axios.post(
        '/recettes',
        nouvelleRecette,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRecettesSauvegardees([response.data, ...recettesSauvegardees]);
      setNouvelleRecette({ nom: '', description: '', categorie: '', sousCategorie: '' });
      setModeAjout(false);
      toast.success('Recette ajoutée avec succès !');
    } catch (err) {
      toast.error('Erreur lors de l\'ajout de la recette : ' + (err.response?.data?.message || err.message));
      console.error("ajouterRecette - Erreur lors de l'ajout de la recette:", err.response ? err.response.data : err.message);
    }
  };

  const supprimerRecette = async (id, nom) => {
    if (!token) {
        toast.error("Veuillez vous connecter pour supprimer des recettes.");
        return;
    }
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la recette "${nom}" ?`)) {
      try {
        await axios.delete(`/recettes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecettesSauvegardees(recettesSauvegardees.filter(recette => recette._id !== id));
        toast.success(`Recette "${nom}" supprimée`);
      } catch (err) {
        toast.error('Erreur lors de la suppression : ' + (err.response?.data?.message || err.message));
        console.error("supprimerRecette - Erreur lors de la suppression:", err.response ? err.response.data : err.message);
      }
    }
  };

  const commencerModification = (recette) => {
    setRecetteEnModification(recette._id);
    setRecetteModifiee({
      nom: recette.nom,
      description: recette.description || '',
      categorie: recette.categorie || '',
      sousCategorie: recette.sousCategorie || ''
    });
  };

  const annulerModification = () => {
    setRecetteEnModification(null);
    setRecetteModifiee({ nom: '', description: '', categorie: '', sousCategorie: '' });
  };

  const sauvegarderModification = async (id) => {
    if (!recetteModifiee.nom.trim()) {
      toast.warning('Le nom ne peut pas être vide');
      return;
    }
    if (!token) {
        toast.error("Veuillez vous connecter pour modifier des recettes.");
        return;
    }

    try {
      const response = await axios.put(
        `/recettes/${id}`,
        recetteModifiee,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRecettesSauvegardees(recettesSauvegardees.map(recette =>
        recette._id === id ? response.data : recette
      ));

      setRecetteEnModification(null);
      setRecetteModifiee({ nom: '', description: '', categorie: '', sousCategorie: '' });
      toast.success('Recette modifiée avec succès !');
    } catch (err) {
      toast.error('Erreur lors de la modification : ' + (err.response?.data?.message || err.message));
      console.error("sauvegarderModification - Erreur lors de la modification:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <DashboardContainer
      // Retiré initial="hidden" ici pour que le conteneur principal soit toujours visible
      // Les animations des enfants se feront via itemVariants/formVariants/cardVariants
      animate="visible"
      variants={containerVariants} // Maintenu pour la propagation des variants aux enfants
    >
      {chargement ? (
        // Affiche un état de chargement distinct quand les données sont en cours de récupération
        <ContentWrapper
          // Simplification de l'animation pour l'état de chargement
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          style={{ padding: 'var(--space-8)', textAlign: 'center' }}
        >
          <p style={{ color: 'var(--soft-green-700)', fontSize: 'var(--text-xl)' }}>Chargement de vos recettes...</p>
        </ContentWrapper>
      ) : (
        // Le contenu principal s'affiche une fois le chargement terminé
        <ContentWrapper variants={itemVariants}> {/* itemVariants s'appliquera pour animer le ContentWrapper lui-même */}
          <DashboardTitle variants={itemVariants}>
            Mon Espace Culinaire
          </DashboardTitle>
          <DashboardSubtitle variants={itemVariants}>
            Gérez vos créations, explorez l'inspiration et partagez votre passion !
          </DashboardSubtitle>

          <motion.div variants={itemVariants} style={{ marginBottom: 'var(--space-6)' }}>
            <ToggleAddButton
              $isAdding={modeAjout}
              onClick={() => setModeAjout(!modeAjout)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {modeAjout ? 'Annuler l\'ajout' : 'Ajouter une nouvelle recette'}
            </ToggleAddButton>
          </motion.div>

          {/* AnimatePresence pour les composants qui montent/démontent */}
          <AnimatePresence>
            {modeAjout && (
              <FormContainer variants={formVariants} initial="hidden" animate="visible" exit="hidden">
                <h3 style={{ color: 'var(--soft-green-700)', marginBottom: 'var(--space-4)', textAlign: 'center' }}>
                  Créer une nouvelle recette
                </h3>
                <form onSubmit={ajouterRecette}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '600', color: 'var(--neutral-700)' }}>
                        Nom de la recette *
                      </label>
                      <FormInput
                        type="text"
                        value={nouvelleRecette.nom}
                        onChange={(e) => setNouvelleRecette({...nouvelleRecette, nom: e.target.value})}
                        placeholder="Ex: Tarte Tatin revisitée"
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '600', color: 'var(--neutral-700)' }}>
                        Catégorie
                      </label>
                      <FormSelect
                        value={nouvelleRecette.categorie}
                        onChange={(e) => setNouvelleRecette({...nouvelleRecette, categorie: e.target.value})}
                      >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </FormSelect>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '600', color: 'var(--neutral-700)' }}>
                        Sous-catégorie
                      </label>
                      <FormSelect
                        value={nouvelleRecette.sousCategorie}
                        onChange={(e) => setNouvelleRecette({...nouvelleRecette, sousCategorie: e.target.value})}
                      >
                        <option value="">Sélectionner une sous-catégorie</option>
                        {sousCategories.map(sousCat => (
                          <option key={sousCat} value={sousCat}>{sousCat}</option>
                        ))}
                      </FormSelect>
                    </div>
                    <div></div> {/* Garde l'alignement de la grille */}
                  </div>

                  <div style={{ marginBottom: 'var(--space-4)' }}>
                    <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontWeight: '600', color: 'var(--neutral-700)' }}>
                      Description
                    </label>
                    <FormTextarea
                      value={nouvelleRecette.description}
                      onChange={(e) => setNouvelleRecette({...nouvelleRecette, description: e.target.value})}
                      placeholder="Décrivez votre recette en quelques mots..."
                      rows="3"
                    />
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <SubmitButton
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Ajouter la recette
                    </SubmitButton>
                  </div>
                </form>
              </FormContainer>
            )}
          </AnimatePresence>

          <DashboardTitle variants={itemVariants} style={{ marginTop: 'var(--space-8)' }}>
            Mes Recettes Sauvegardées
          </DashboardTitle>
          {recettesSauvegardees.length === 0 && !chargement ? ( // Ajout de !chargement pour s'assurer que le message s'affiche après le chargement
            <motion.p variants={itemVariants} style={{ color: 'var(--neutral-600)', textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              Vous n'avez pas encore de recettes. Ajoutez-en une pour commencer !
            </motion.p>
          ) : (
            <RecipeList variants={containerVariants}>
              {recettesSauvegardees.map((recette) => (
                <RecipeCard key={recette._id} variants={cardVariants} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
                  {recetteEnModification === recette._id ? (
                    <div>
                      {/* Formulaire de modification */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                        <div>
                          <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '600', color: 'var(--neutral-700)' }}>Nom *</label>
                          <FormInput
                            type="text"
                            value={recetteModifiee.nom}
                            onChange={(e) => setRecetteModifiee({...recetteModifiee, nom: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '600', color: 'var(--neutral-700)' }}>Catégorie</label>
                          <FormSelect
                            value={recetteModifiee.categorie}
                            onChange={(e) => setRecetteModifiee({...recetteModifiee, categorie: e.target.value})}
                          >
                            <option value="">Sélectionner une catégorie</option>
                            {categories.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </FormSelect>
                        </div>
                      </div>

                      <div style={{ marginBottom: 'var(--space-3)' }}>
                        <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '600', color: 'var(--neutral-700)' }}>Sous-catégorie</label>
                        <FormSelect
                          value={recetteModifiee.sousCategorie}
                          onChange={(e) => setRecetteModifiee({...recetteModifiee, sousCategorie: e.target.value})}
                        >
                          <option value="">Sélectionner une sous-catégorie</option>
                          {sousCategories.map(sousCat => (
                            <option key={sousCat} value={sousCat}>{sousCat}</option>
                          ))}
                        </FormSelect>
                      </div>

                      <div style={{ marginBottom: 'var(--space-3)' }}>
                        <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '600', color: 'var(--neutral-700)' }}>Description</label>
                        <FormTextarea
                          value={recetteModifiee.description}
                          onChange={(e) => setRecetteModifiee({...recetteModifiee, description: e.target.value})}
                          rows="2"
                        />
                      </div>

                      <ButtonGroup>
                        <SaveButton
                          onClick={() => sauvegarderModification(recette._id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Sauvegarder
                        </SaveButton>
                        <CancelButton
                          onClick={annulerModification}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Annuler
                        </CancelButton>
                      </ButtonGroup>
                    </div>
                  ) : (
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                        <div style={{ flex: 1 }}>
                          <RecipeTitle>{recette.nom}</RecipeTitle>
                          <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                            {recette.categorie && <Tag $isCategory>{recette.categorie}</Tag>}
                            {recette.sousCategorie && <Tag>{recette.sousCategorie}</Tag>}
                          </div>
                          {recette.description && <RecipeDescription>{recette.description}</RecipeDescription>}
                        </div>
                        <ButtonGroup>
                          <EditButton
                            onClick={() => commencerModification(recette)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Modifier
                          </EditButton>
                          <DeleteButton
                            onClick={() => supprimerRecette(recette._id, recette.nom)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Supprimer
                          </DeleteButton>
                        </ButtonGroup>
                      </div>
                    </div>
                  )}
                </RecipeCard>
              ))}
            </RecipeList>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', marginTop: 'var(--space-8)' }}>
            <LinkButton
              to="/recettes"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir toutes les recettes
            </LinkButton>

            <SecondaryLinkButton
              to="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Retour à l'accueil
            </SecondaryLinkButton>
          </div>
        </ContentWrapper>
      )}
      <Navbar /> {/* Garde la navbar en bas */}
    </DashboardContainer>
  );
};

export default Dashboard;
