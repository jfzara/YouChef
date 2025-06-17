import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from '../api/axiosInstance';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { token } = useAuth();
  const [recettesSauvegardees, setRecettesSauvegardees] = useState([]);
  const [nouvelleRecette, setNouvelleRecette] = useState({
    nom: '',
    description: '',
    categorie: '',
    sousCategorie: ''
  });
  const [recetteEnModification, setRecetteEnModification] = useState(null);
  const [recetteModifiee, setRecetteModifiee] = useState({
    nom: '',
    description: '',
    categorie: '',
    sousCategorie: ''
  });
  const [chargement, setChargement] = useState(true);
  const [modeAjout, setModeAjout] = useState(false);

  // Options pour les catégories
  const categories = [
    'Entrées', 'Plats principaux', 'Desserts', 'Boissons', 
    'Apéritifs', 'Salades', 'Soupes', 'Pâtisseries'
  ];

  const sousCategories = [
    'Végétarien', 'Végétalien', 'Sans gluten', 'Rapide', 
    'Facile', 'Difficile', 'Traditionnel', 'Moderne'
  ];

  // Charger les recettes au montage du composant
  useEffect(() => {
    chargerRecettes();
  }, []);

  const chargerRecettes = async () => {
    try {
      const response = await axios.get('/recettes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecettesSauvegardees(response.data);
    } catch (err) {
      toast.error('Erreur lors du chargement des recettes');
      console.error(err);
    } finally {
      setChargement(false);
    }
  };

  const ajouterRecette = async (e) => {
    e.preventDefault();
    if (!nouvelleRecette.nom.trim()) {
      toast.warning('Le nom de la recette est obligatoire');
      return;
    }

    try {
      const response = await axios.post(
        '/recettes',
        nouvelleRecette,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setRecettesSauvegardees([...recettesSauvegardees, response.data]);
      setNouvelleRecette({ nom: '', description: '', categorie: '', sousCategorie: '' });
      setModeAjout(false);
      toast.success('Recette ajoutée avec succès !');
    } catch (err) {
      toast.error('Erreur lors de l\'ajout de la recette');
      console.error(err);
    }
  };

  const supprimerRecette = async (id, nom) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la recette "${nom}" ?`)) {
      try {
        await axios.delete(`/recettes/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setRecettesSauvegardees(recettesSauvegardees.filter(recette => recette._id !== id));
        toast.success(`Recette "${nom}" supprimée`);
      } catch (err) {
        toast.error('Erreur lors de la suppression');
        console.error(err);
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
      toast.error('Erreur lors de la modification');
      console.error(err);
    }
  };

  if (chargement) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Chargement de vos recettes...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '3rem auto',
        padding: '2rem',
        backgroundColor: '#fffdf7',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h1 style={{ color: '#e67e22', fontSize: '2.5rem', marginBottom: '0.5rem', textAlign: 'center' }}>
        Mon espace personnel
      </h1>
      <p style={{ color: '#555', fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center' }}>
        Gérez vos recettes sauvegardées et explorez de nouvelles idées culinaires !
      </p>

      {/* Bouton pour afficher/masquer le formulaire d'ajout */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button
          onClick={() => setModeAjout(!modeAjout)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: modeAjout ? '#95a5a6' : '#e67e22',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'background-color 0.3s',
          }}
        >
          {modeAjout ? 'Annuler' : 'Ajouter une nouvelle recette'}
        </button>
      </div>

      {/* Formulaire d'ajout de recette */}
      {modeAjout && (
        <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#fef2e6', borderRadius: '8px' }}>
          <h3 style={{ color: '#e67e22', marginBottom: '1rem', textAlign: 'center' }}>Nouvelle recette</h3>
          <form onSubmit={ajouterRecette}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Nom de la recette *
                </label>
                <input
                  type="text"
                  value={nouvelleRecette.nom}
                  onChange={(e) => setNouvelleRecette({...nouvelleRecette, nom: e.target.value})}
                  placeholder="Ex: Spaghetti Bolognaise"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e67e22',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Catégorie
                </label>
                <select
                  value={nouvelleRecette.categorie}
                  onChange={(e) => setNouvelleRecette({...nouvelleRecette, categorie: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e67e22',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Sous-catégorie
                </label>
                <select
                  value={nouvelleRecette.sousCategorie}
                  onChange={(e) => setNouvelleRecette({...nouvelleRecette, sousCategorie: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e67e22',
                    borderRadius: '5px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="">Sélectionner une sous-catégorie</option>
                  {sousCategories.map(sousCat => (
                    <option key={sousCat} value={sousCat}>{sousCat}</option>
                  ))}
                </select>
              </div>
              <div></div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                Description
              </label>
              <textarea
                value={nouvelleRecette.description}
                onChange={(e) => setNouvelleRecette({...nouvelleRecette, description: e.target.value})}
                placeholder="Description de la recette..."
                rows="3"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e67e22',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  padding: '0.75rem 2rem',
                  backgroundColor: '#e67e22',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#cf711f')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#e67e22')}
              >
                Ajouter la recette
              </button>
            </div>
          </form>
        </div>
      )}

      <h2 style={{ color: '#e67e22', marginBottom: '1rem', textAlign: 'center' }}>Mes recettes sauvegardées</h2>
      {recettesSauvegardees.length === 0 ? (
        <p style={{ color: '#555', textAlign: 'center' }}>Vous n'avez aucune recette sauvegardée.</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {recettesSauvegardees.map((recette) => (
            <div
              key={recette._id}
              style={{
                backgroundColor: '#fef2e6',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e67e22',
              }}
            >
              {recetteEnModification === recette._id ? (
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                        Nom *
                      </label>
                      <input
                        type="text"
                        value={recetteModifiee.nom}
                        onChange={(e) => setRecetteModifiee({...recetteModifiee, nom: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '1px solid #e67e22',
                          borderRadius: '3px',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                        Catégorie
                      </label>
                      <select
                        value={recetteModifiee.categorie}
                        onChange={(e) => setRecetteModifiee({...recetteModifiee, categorie: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.5rem',
                          border: '1px solid #e67e22',
                          borderRadius: '3px',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                      Sous-catégorie
                    </label>
                    <select
                      value={recetteModifiee.sousCategorie}
                      onChange={(e) => setRecetteModifiee({...recetteModifiee, sousCategorie: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #e67e22',
                        borderRadius: '3px',
                        boxSizing: 'border-box',
                        maxWidth: '300px'
                      }}
                    >
                      <option value="">Sélectionner une sous-catégorie</option>
                      {sousCategories.map(sousCat => (
                        <option key={sousCat} value={sousCat}>{sousCat}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                      Description
                    </label>
                    <textarea
                      value={recetteModifiee.description}
                      onChange={(e) => setRecetteModifiee({...recetteModifiee, description: e.target.value})}
                      rows="2"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        border: '1px solid #e67e22',
                        borderRadius: '3px',
                        boxSizing: 'border-box',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => sauvegarderModification(recette._id)}
                      style={{
                        backgroundColor: '#27ae60',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={annulerModification}
                      style={{
                        backgroundColor: '#95a5a6',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        cursor: 'pointer',
                        padding: '0.5rem 1rem',
                        fontSize: '0.9rem',
                        fontWeight: '600'
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: '#e67e22', margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>
                        {recette.nom}
                      </h3>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                        {recette.categorie && (
                          <span style={{ 
                            backgroundColor: '#e67e22', 
                            color: 'white', 
                            padding: '0.2rem 0.5rem', 
                            borderRadius: '12px', 
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {recette.categorie}
                          </span>
                        )}
                        {recette.sousCategorie && (
                          <span style={{ 
                            backgroundColor: '#3498db', 
                            color: 'white', 
                            padding: '0.2rem 0.5rem', 
                            borderRadius: '12px', 
                            fontSize: '0.8rem',
                            fontWeight: '600'
                          }}>
                            {recette.sousCategorie}
                          </span>
                        )}
                      </div>
                      {recette.description && (
                        <p style={{ color: '#666', margin: '0', fontSize: '0.95rem', lineHeight: '1.4' }}>
                          {recette.description}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
                      <button
                        onClick={() => commencerModification(recette)}
                        style={{
                          backgroundColor: '#3498db',
                          border: 'none',
                          borderRadius: '5px',
                          color: 'white',
                          cursor: 'pointer',
                          padding: '0.4rem 0.8rem',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          transition: 'background-color 0.3s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#2980b9')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#3498db')}
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => supprimerRecette(recette._id, recette.nom)}
                        style={{
                          backgroundColor: '#e74c3c',
                          border: 'none',
                          borderRadius: '5px',
                          color: 'white',
                          cursor: 'pointer',
                          padding: '0.4rem 0.8rem',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          transition: 'background-color 0.3s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#c0392b')}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#e74c3c')}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '2rem',
        }}
      >
        <Link
          to="/recettes"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#e67e22',
            color: 'white',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#cf711f')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#e67e22')}
        >
          Voir toutes les recettes
        </Link>

        <Link
          to="/"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'white',
            color: '#e67e22',
            border: '2px solid #e67e22',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'all 0.3s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#e67e22';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#e67e22';
          }}
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;