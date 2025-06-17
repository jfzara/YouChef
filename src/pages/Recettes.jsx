import React, { useEffect, useState } from "react";
import { motion as _motion } from 'framer-motion';
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

  useEffect(() => {
    const fetchRecettes = async () => {
      try {
        const res = await axios.get("/recettes");
        setRecettes(res.data); // Doit renvoyer une structure { [catégorie]: { [sousCat]: [{...}] } }
      } catch {
        toast.error("Erreur de chargement des recettes");
      }
    };

    fetchRecettes();
  }, []);

  return (
    <>
      <Navbar />
      <_motion.div
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
                        <_motion.article
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
                        </_motion.article>
                      ))}
                    </div>
                  </article>
                );
              })}
            </section>
          );
        })}
      </_motion.div>
    </>
  );
};

export default Recettes;