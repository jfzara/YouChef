// src/contexts/HoverContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Crée le contexte
const HoverContext = createContext();

// Hook personnalisé pour utiliser le contexte de survol
export const useHover = () => {
  return useContext(HoverContext);
};

// Fournisseur du contexte
export const HoverProvider = ({ children }) => {
  // État pour savoir si un lien de la navbar est survolé
  const [isNavbarHovered, setIsNavbarHovered] = useState(false);

  return (
    <HoverContext.Provider value={{ isNavbarHovered, setIsNavbarHovered }}>
      {children}
    </HoverContext.Provider>
  );
};