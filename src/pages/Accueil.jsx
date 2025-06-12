import React from "react";
import accueilStyles from "../styles/Accueil.module.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Accueil = () => {
  return (
    <>
      <Navbar />
      <div className={accueilStyles.container}>
        <h1 className={accueilStyles.titre}>
          Bienvenue sur notre application de recettes !
        </h1>
        <p className={accueilStyles.sousTitre}>
          Trouvez, partagez et sauvegardez vos recettes préférées 🍲
        </p>

        <div className={accueilStyles.ctaSection}>
          <Link to="/inscription">
            <button className={accueilStyles.bouton}>Commencer</button>
          </Link>
          <Link to="/recettes">
            <button className={accueilStyles.boutonSecondaire}>
              Parcourir les recettes
            </button>
          </Link>
        </div>

        <section className={accueilStyles.extrait}>
          <h2>Recettes populaires</h2>
          <ul>
            <li>🍝 Spaghetti bolognaise</li>
            <li>🥗 Salade césar maison</li>
            <li>🍪 Cookies au chocolat moelleux</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default Accueil;