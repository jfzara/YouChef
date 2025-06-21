import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const recettes = {
  1: {
    nom: 'Spaghetti bolognaise',
    description: 'Un classique italien avec une sauce riche en viande.'
  },
  2: {
    nom: 'Salade César',
    description: 'Croquante avec une sauce onctueuse.'
  },
  3: {
    nom: 'Cookies au chocolat',
    description: 'Moelleux, sucrés, parfaits pour le goûter.'
  }
};

const DetailRecette = () => {
  const { id } = useParams();
  const recette = recettes[id];

  if (!recette) {
    return <h1>Recette non trouvée</h1>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{recette.nom}</h1>
      <p>{recette.description}</p>
    </div>
  );
};

export default DetailRecette;