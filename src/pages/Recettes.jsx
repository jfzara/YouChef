import React, { useEffect, useState } from "react";
import { _motion } from 'framer-motion'; // Changé ici
import { Link } from 'react-router-dom';
import styles from "../styles/Recettes.module.css";
import Navbar from "../components/Navbar";
import axios from "../api/axiosInstance";
import { toast } from "react-toastify";

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

const categoryColors = {
  Soupes: "#d35400",
  Salades: "#27ae60",
  Plats: "#2980b9",
  Desserts: "#8e44ad",
};

const sousCategorieVariants = {
  Soupes: ["#e67e22", "#d35400", "#ba4a00"],
  Salades: ["#2ecc71", "#27ae60", "#229954"],
  Plats: ["#3498db", "#2980b9", "#2471a3"],
  Desserts: ["#9b59b6", "#8e44ad", "#7d3c98"],
};

const Recettes = () => {
  const [recettes, setRecettes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        console.log("🔄 Chargement des recettes...");
        const res = await axios.get("/recettes");
        console.log("✅ Données reçues:", res.data);
        setRecettes(res.data);
      } catch (err) {
        console.error("❌ Erreur lors du chargement:", err);
        setError(err.message);
        toast.error("Erreur de chargement des recettes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecettes();
  }, []);

  // Debug: affichage de l'état
  console.log("État actuel:", { loading, error, recettes, nbCategories: Object.keys(recettes).length });

  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Chargement des recettes...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          <p>Erreur: {error}</p>
        </div>
      </>
    );
  }

  if (Object.keys(recettes).length === 0) {
    return (
      <>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Aucune recette trouvée</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className={styles.titre}>Toutes les recettes</h1>
        
        {/* Debug info */}
        <div style={{ background: '#f0f0f0', padding: '1rem', margin: '1rem 0', borderRadius: '5px' }}>
          <p><strong>Debug:</strong> {Object.keys(recettes).length} catégories trouvées</p>
          <p><strong>Catégories:</strong> {Object.keys(recettes).join(', ')}</p>
        </div>

        {Object.entries(recettes).map(([categorie, sousCategories]) => {
          const catColor = categoryColors[categorie] || "#333";
          
          console.log(`📂 Catégorie: ${categorie}`, sousCategories);

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
                const sousCatColor = variantColors[i % variantColors.length];
                
                console.log(`📁 Sous-catégorie: ${sousCategorie}`, listeRecettes);

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
                      {sousCategorie} ({listeRecettes.length} recettes)
                    </h3>
                    <div className={styles.liste}>
                      {listeRecettes.map((recette, index) => (
                        <motion.article
                          key={index}
                          className={styles.carte}
                          variants={cardVariants}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: `0 10px 20px ${sousCatColor}66`,
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
    </>
  );
};

export default Recettes;