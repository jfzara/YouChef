import React from "react";
import styles from "../styles/Accueil.module.css";
import { Link } from "react-router-dom";

const Accueil = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.titre}>
        Bienvenue sur notre application de recettes !
      </h1>
      <p className={styles.sousTitre}>
        Trouvez, partagez et sauvegardez vos recettes préférées 🍲
      </p>

      <div className={styles.ctaSection}>
        <Link to="/inscription">
          <button className={styles.bouton}>Commencer</button>
        </Link>
        <Link to="/inscription">
          <button className={styles.boutonSecondaire}>
            Parcourir les recettes
          </button>
        </Link>
      </div>

      <section className={styles.extrait}>
        <h2>Recettes populaires</h2>
        <ul>
          <li>🍝 Spaghetti bolognaise</li>
          <li>🥗 Salade césar maison</li>
          <li>🍪 Cookies au chocolat moelleux</li>
        </ul>
      </section>
    </div>
  );
};

export default Accueil;
