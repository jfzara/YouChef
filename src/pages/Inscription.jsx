// src/pages/Inscription.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar/Navbar'; // Gardez si vous l'utilisez, sinon vous pouvez le supprimer
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify'; // <-- Importez 'toast' de 'react-toastify'
import styles from '../styles/Inscription.module.css';

const Inscription = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState(null);
  const navigate = useNavigate();

  const password = watch('motDePasse');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setNetworkError(null); // Réinitialise l'erreur réseau à chaque soumission

    try {
      const registerData = {
        identifiant: data.identifiant,
        email: data.email,
        motDePasse: data.motDePasse
      };
      
      console.log('📤 Envoi des données d\'inscription:', registerData);
      
      const response = await axiosInstance.post('/users/register', registerData);
      
      console.log('✅ Inscription réussie:', response.data);
      // Message de succès chaleureux
      toast.success('🎉 Bienvenue ! Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter et explorer !');
      
      navigate('/connexion'); // Redirige l'utilisateur après une inscription réussie
      
    } catch (error) {
      console.error('❌ Erreur inscription:', error);
      
      if (error.code === 'ERR_NETWORK') {
        // Erreur réseau : impossible de contacter le serveur
        setNetworkError('Impossible de contacter le serveur. Vérifiez que le backend est démarré sur http://localhost:5000');
        // Message de toast plus convivial pour le réseau
        toast.error('Houston, on a un problème ! 🛰️ Impossible de se connecter à notre serveur. Vérifiez votre connexion internet ou revenez nous voir plus tard !');
      } else if (error.response) {
        // Erreur de réponse du serveur (status code 4xx ou 5xx)
        const { status, data } = error.response;
        let userFriendlyMessage = 'Oups ! Une petite erreur est survenue de notre côté. Veuillez réessayer dans un instant.'; // Message par défaut

        if (status === 400) {
          // Erreur Bad Request : données invalides (validation côté backend)
          if (data.message) {
            // Si le backend fournit un message spécifique (ex: "Cet identifiant est déjà utilisé", "Email invalide")
            if (data.message.includes('identifiant déjà utilisé')) {
                userFriendlyMessage = 'Cet identifiant est déjà pris !  Essayez-en un autre pour nous rejoindre.';
            } else if (data.message.includes('email déjà utilisé')) {
                userFriendlyMessage = 'Cet e-mail est déjà associé à un compte. Vous avez peut-être déjà un profil chez nous ? 🤔';
            } else if (data.message.includes('format d\'email invalide')) {
                userFriendlyMessage = 'Hmm, le format de votre e-mail ne semble pas correct. Pouvez-vous vérifier ? 📧';
            } else if (data.message.includes('mot de passe trop court') || data.message.includes('trop court')) {
                userFriendlyMessage = 'Votre mot de passe est un peu court. Il nous faut au moins 6 caractères pour bien protéger votre compte ! ';
            } else {
                // Message générique pour d'autres erreurs 400 avec message backend
                userFriendlyMessage = `Désolé ! ${data.message} Veuillez vérifier vos informations.`;
            }
          } else {
            // Message générique pour 400 sans message backend spécifique
            userFriendlyMessage = 'Il semble y avoir une erreur dans les informations que vous avez fournies. Pourriez-vous vérifier les champs et réessayer ?';
          }
        } else if (status === 409) { 
          // Conflit : souvent utilisé pour des ressources déjà existantes (ex: email/identifiant déjà pris)
          userFriendlyMessage = 'Cet identifiant ou cet e-mail est déjà pris. Pas de panique, choisissez-en un autre et vous serez des nôtres !';
        } else if (status >= 500) {
          // Erreur serveur 5xx : problème côté serveur (interne, base de données, etc.)
          userFriendlyMessage = 'Aïe ! Il y a eu un souci de notre côté. 🛠️ Notre équipe travaille déjà à le résoudre. Merci de réessayer plus tard !';
        } 
        
        toast.error(` ${userFriendlyMessage}`); // Affiche le message convivial dans le toast

      } else {
        // Autres types d'erreurs inattendues (par exemple, un problème de code côté client avant la requête Axios)
        toast.error('Quelque chose s\'est mal passé...  Notre équipe est déjà sur le coup pour résoudre ça ! Veuillez réessayer plus tard.');
      }
    } finally {
      setIsLoading(false); // Arrête le chargement quelle que soit l'issue
    }
  };

  return (
    <div>
      {/* <Navbar /> // Déjà inclus dans App.jsx */}
      
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.titre}>Créer un compte</h2>
          <p className={styles.subtitle}>
            Rejoignez notre communauté de passionnés de cuisine
          </p>

          {/* Affichage du message d'erreur réseau orienté utilisateur */}
          {networkError && (
            <div className={styles.networkError}>
              <h3>Oups ! Problème de connexion... </h3>
              <p>Il semblerait que nous ayons du mal à joindre notre serveur en ce moment.</p>
              <p>Ne vous inquiétez pas, ce n'est probablement pas de votre faute !</p>
              <p>Voici quelques pistes simples qui pourraient aider :</p>
              <ul>
                <li>Vérifiez si vous êtes bien **connecté à internet**.</li>
                <li>Essayez de **rafraîchir la page** ou de **réessayer dans quelques instants**.</li>
              </ul>
              {/* Optionnel : Garder les détails techniques cachés pour les développeurs */}
              {/*
              <details>
                <summary>Détails pour les développeurs</summary>
                <p>Impossible de contacter le serveur backend sur http://localhost:5000</p>
                <p>Solutions possibles :</p>
                <ul>
                  <li>Démarrer le serveur backend : <code>npm start</code></li>
                  <li>Vérifier que le serveur fonctionne sur le port 5000</li>
                  <li>Vérifier la configuration de l'URL dans axiosInstance.js</li>
                </ul>
              </details>
              */}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Champ Identifiant */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Identifiant
              </label>
              <input
                type="text"
                {...register('identifiant', { 
                  required: 'L\'identifiant est requis',
                  minLength: { value: 3, message: 'Minimum 3 caractères' }
                })}
                className={`${styles.input} ${errors.identifiant ? styles.error : ''}`}
                placeholder="Votre identifiant"
              />
              {errors.identifiant && (
                <p className={styles.errorMessage}>
                  {errors.identifiant.message}
                </p>
              )}
            </div>

            {/* Champ Email */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Adresse e-mail
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: 'L\'email est requis',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Format d\'email invalide'
                  }
                })}
                className={`${styles.input} ${errors.email ? styles.error : ''}`}
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className={styles.errorMessage}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Champ Mot de passe */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Mot de passe
              </label>
              <input
                type="password"
                {...register('motDePasse', { 
                  required: 'Le mot de passe est requis',
                  minLength: { value: 6, message: 'Minimum 6 caractères' }
                })}
                className={`${styles.input} ${errors.motDePasse ? styles.error : ''}`}
                placeholder="Votre mot de passe"
              />
              {errors.motDePasse && (
                <p className={styles.errorMessage}>
                  {errors.motDePasse.message}
                </p>
              )}
            </div>

            {/* Champ Confirmation mot de passe */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                {...register('confirmPassword', { 
                  required: 'Veuillez confirmer votre mot de passe',
                  validate: value => value === password || 'Les mots de passe ne correspondent pas'
                })}
                className={`${styles.input} ${errors.confirmPassword ? styles.error : ''}`}
                placeholder="Confirmer votre mot de passe"
              />
              {errors.confirmPassword && (
                <p className={styles.errorMessage}>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.bouton}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  <span>Inscription en cours...</span> 
                </>
              ) : (
                'Créer mon compte'
              )}
            </button>
          </form>

          {/* Lien vers la page de connexion */}
          <div className={styles.linkContainer}>
            <p>
              Vous avez déjà un compte ?{' '}
              <Link 
                to="/connexion" 
                className={styles.link}
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inscription;