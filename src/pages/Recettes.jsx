import React from "react";
import { motion } from "framer-motion";
import styles from "../styles/Recettes.module.css";

const recettes = {
  Soupes: {
    "Soupes chaudes": [
      { nom: "Soupe à la courge", description: "Douce et réconfortante." },
      { nom: "Velouté de champignons", description: "Crémeux et parfumé." },
    ],
    "Soupes froides": [
      { nom: "Gaspacho", description: "Frais et plein de saveurs." },
      { nom: "Soupe concombre menthe", description: "Léger et rafraîchissant." },
    ],
  },
  Salades: {
    "Salades composées": [
      { nom: "Salade César", description: "Fraîche, croquante et délicieuse." },
      { nom: "Salade grecque", description: "Tomates, feta, olives et concombre." },
    ],
    "Salades vertes": [
      { nom: "Mesclun aux noix", description: "Simple et croquant." },
      { nom: "Roquette et parmesan", description: "Poivrée et savoureuse." },
    ],
  },
  Plats: {
    Pâtes: [
      { nom: "Spaghetti bolognaise", description: "Un classique italien savoureux." },
      { nom: "Pâtes au pesto", description: "Parfumé et rapide." },
    ],
    Viandes: [
      { nom: "Poulet rôti", description: "Tendre et croustillant." },
      { nom: "Boeuf bourguignon", description: "Riche et mijoté." },
    ],
  },
  Desserts: {
    Gâteaux: [
      { nom: "Cookies au chocolat", description: "Moelleux et fondants à souhait." },
      { nom: "Tarte aux pommes", description: "Classique et croustillante." },
    ],
    Glaces: [
      { nom: "Sorbet citron", description: "Acidulé et léger." },
      { nom: "Glace vanille maison", description: "Crémeuse et douce." },
    ],
  },
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Couleurs principales par catégorie
const categoryColors = {
  Soupes: "#d35400",    // orange brûlé, chaleureux
  Salades: "#27ae60",   // vert frais
  Plats: "#2980b9",     // bleu intense
  Desserts: "#8e44ad",  // violet gourmand
};

// Variantes de couleurs par catégorie (claires et foncées) pour sous-catégories
const sousCategorieVariants = {
  Soupes: ["#e67e22", "#d35400", "#ba4a00"],
  Salades: ["#2ecc71", "#27ae60", "#229954"],
  Plats: ["#3498db", "#2980b9", "#2471a3"],
  Desserts: ["#9b59b6", "#8e44ad", "#7d3c98"],
};

const Recettes = () => {
  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className={styles.titre}>Toutes les recettes</h1>

      {Object.entries(recettes).map(([categorie, sousCategories]) => {
        const catColor = categoryColors[categorie] || "#333";

        return (
          <section key={categorie} style={{ marginTop: "2rem" }}>
            <h2
              style={{
                color: catColor,
                borderBottom: `3px solid ${catColor}`,
                paddingBottom: "0.25rem",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {categorie}
            </h2>

            {Object.entries(sousCategories).map(([sousCategorie, listeRecettes], i) => {
              const variantColors = sousCategorieVariants[categorie] || ["#999"];
              // Choisir la couleur de sous-catégorie selon l’index modulo variantes disponibles
              const sousCatColor = variantColors[i % variantColors.length];

              return (
                <article
                  key={sousCategorie}
                  style={{
                    marginLeft: "1rem",
                    marginTop: "1.5rem",
                    borderLeft: `5px solid ${sousCatColor}`,
                    paddingLeft: "1rem",
                    borderRadius: "4px",
                    backgroundColor: "#fff8f0",
                  }}
                >
                  <h3
                    style={{
                      color: sousCatColor,
                      marginBottom: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    {sousCategorie}
                  </h3>
                  <div className={styles.liste}>
                    {listeRecettes.map((recette, index) => (
                      <motion.article
                        key={index}
                        className={styles.carte}
                        variants={cardVariants}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: `0 10px 20px ${sousCatColor}66`, // couleur avec transparence
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <h4 style={{ color: catColor }}>{recette.nom}</h4>
                        <p>{recette.description}</p>
                      </motion.article>
                    ))}
                  </div>
                </article>
              );
            })}
          </section>
        );
      })}
    </motion.div>
  );
};

export default Recettes;