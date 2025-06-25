// src/data/recettesData.js

import Carrot from '../assets/images/Carrot.jpg';
import Dish1 from '../assets/images/Dish1.jpg';
import EvieSchwartz from '../assets/images/evie-s-aBvM_cKYMxc-unsplash.jpg';
import FoodItems from '../assets/images/FoodItems.jpg';
import FruitsVegetables from '../assets/images/FruitsVegetables.jpg';
import HerbsGarlic from '../assets/images/HerbsGarlic.jpg';
import NotebookRecipe from '../assets/images/NotebookRecipe.jpg';
import NotebookSpaghetti from '../assets/images/NotebookSpaghetti.jpg';
import NotebookTomato from '../assets/images/NotebookTomato.jpg';
import Pomegranate from '../assets/images/Pomegranate.jpg';
import SomeDish from '../assets/images/SomeDish.jpg';
import SomeSalad from '../assets/images/SomeSalad.jpg';
import Tomato from '../assets/images/Tomato.jpg';
import TomatoNav from '../assets/images/TomatoNav.jpg';
import Vegetables from '../assets/images/Vegetables.jpg';
import WhiteBackground2 from '../assets/images/WhiteBackground2.jpg';
import WhiteBackground3 from '../assets/images/WhiteBackground3.jpg';
import WhiteBackground6 from '../assets/images/WhiteBackground6.jpg';

export const cardBackgroundImages = [
  Carrot, Dish1, EvieSchwartz, FoodItems, FruitsVegetables, HerbsGarlic,
  NotebookRecipe, NotebookSpaghetti, NotebookTomato, Pomegranate,
  SomeDish, SomeSalad, Tomato, TomatoNav, Vegetables,
  WhiteBackground2, WhiteBackground3, WhiteBackground6,
];

export const categoryColors = {
  'Entrées': 'var(--soft-green-700)',
  'Plats principaux': 'var(--soft-blue-700)',
  'Desserts': 'var(--accent-red)',
  'Boissons': 'var(--purple-500, #8A2BE2)',
  'Apéritifs': 'var(--accent-orange)',
  'Salades': 'var(--green-500, #4CAF50)',
  'Soupes': 'var(--brown-500, #A0522D)',
  'Pâtisseries': 'var(--pink-500, #FF69B4)',
  'Autres': 'var(--neutral-600)',
};

export const sousCategoryColors = {
  'Végétarien': 'var(--soft-green-600)',
  'Végétalien': 'var(--soft-green-500)',
  'Sans gluten': 'var(--soft-blue-400)',
  'Rapide': 'var(--orange-400, #FFA726)',
  'Facile': 'var(--yellow-400, #FFCA28)',
  'Difficile': 'var(--red-600, #D32F2F)',
  'Traditionnel': 'var(--brown-400, #D2B48C)',
  'Moderne': 'var(--purple-400, #9575CD)',
  'Divers': 'var(--neutral-500)',
};

export const hoverAnimations = [
  // Animation 1: "Rebond Joyeux" (Bouncy Joy)
  {
    y: -15, // Plus d'élévation
    scale: 1.05, // Zoom un peu plus grand
    rotate: 3, // Rotation plus prononcée
    boxShadow: `0 20px 30px -10px rgba(0,0,0,0.35)`, // Ombre très marquée
    transition: { type: "spring", stiffness: 200, damping: 8, mass: 1, duration: 0.7 } // Plus de rebond, plus lent
  },
  // Animation 2: "Glissade Amusante" (Funny Glide)
  {
    y: -10,
    x: 8, // Glisse sur le côté
    scale: 1.03,
    rotate: -4, // Rotation plus nette
    boxShadow: `0 18px 25px -8px rgba(0,0,0,0.3)`,
    transition: { type: "spring", stiffness: 180, damping: 10, mass: 0.8, duration: 0.75 } // Doux rebond latéral
  },
  // Animation 3: "Chute et Rebond" (Fall and Bounce)
  {
    y: -20, // Montée plus haute
    scale: 1.06, // Zoom encore plus grand
    rotate: 1,
    boxShadow: `0 22px 35px -12px rgba(0,0,0,0.4)`,
    transition: { type: "spring", stiffness: 150, damping: 7, mass: 1.5, duration: 0.8 } // Très rebondissant, plus lourd
  },
  // Animation 4: "Petite Danse" (Little Dance)
  {
    y: -12,
    rotate: [0, 2, -2, 0], // Séquence de rotation
    scale: 1.04,
    boxShadow: `0 15px 22px -7px rgba(0,0,0,0.32)`,
    transition: { 
      y: { type: "spring", stiffness: 220, damping: 12, duration: 0.6 },
      rotate: { duration: 0.5, ease: "easeInOut" }, // Rotation plus rapide
      scale: { type: "spring", stiffness: 200, damping: 10, duration: 0.6 }
    }
  },
  // Animation 5: "L'Émerveillement" (The Wow) - Plus de zoom, plus de 'pop'
  {
    y: -8,
    scale: 1.08, // Très grand zoom
    rotate: 0,
    boxShadow: `0 25px 40px -15px rgba(0,0,0,0.45)`, // Ombre très prononcée
    transition: { type: "spring", stiffness: 250, damping: 10, mass: 0.7, duration: 0.6 } // Rapide et percutant
  }
];