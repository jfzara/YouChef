import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


const Dashboard = () => {
  const [recettesSauvegardees, setRecettesSauvegardees] = useState([
    'Spaghetti bolognaise',
    'Cookies au chocolat',
  ]);

  const supprimerRecette = (index) => {
    const nouvellesRecettes = recettesSauvegardees.filter((_, i) => i !== index);
    setRecettesSauvegardees(nouvellesRecettes);
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '3rem auto',
        padding: '2rem',
        backgroundColor: '#fffdf7',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: '#e67e22', fontSize: '2.5rem', marginBottom: '0.5rem' }}>
        Mon espace personnel
      </h1>
      <p style={{ color: '#555', fontSize: '1.2rem', marginBottom: '2rem' }}>
        Gérez vos recettes sauvegardées et explorez de nouvelles idées culinaires !
      </p>

      <h2 style={{ color: '#e67e22', marginBottom: '1rem' }}>Mes recettes sauvegardées</h2>
      {recettesSauvegardees.length === 0 ? (
        <p style={{ color: '#555' }}>Vous n'avez aucune recette sauvegardée.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
          {recettesSauvegardees.map((recette, index) => (
            <li
              key={index}
              style={{
                backgroundColor: '#fef2e6',
                marginBottom: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '5px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#333',
                fontWeight: '600',
              }}
            >
              {recette}
              <button
                onClick={() => supprimerRecette(index)}
                style={{
                  backgroundColor: '#e67e22',
                  border: 'none',
                  borderRadius: '5px',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0.3rem 0.8rem',
                  fontSize: '0.9rem',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#cf711f')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#e67e22')}
                aria-label={`Supprimer ${recette}`}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
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