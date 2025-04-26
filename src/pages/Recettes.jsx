import React from 'react';
import styles from '../styles/Recettes.module.css';

const Recettes = () => {
  const recettes = [
    { nom: 'Spaghetti bolognaise', description: 'Un classique italien savoureux.' },
    { nom: 'Salade César', description: 'Fraîche, croquante et délicieuse.' },
    { nom: 'Cookies au chocolat', description: 'Moelleux et fondants à souhait.' },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.titre}>Toutes les recettes</h1>
      <div className={styles.liste}>
        {recettes.map((recette, index) => (
          <div key={index} className={styles.carte}>
            <h2>{recette.nom}</h2>
            <p>{recette.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recettes;