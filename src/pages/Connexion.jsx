import React, { useState, useEffect } from 'react'; // Ajout de useEffect pour le débogage
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify'; 
import styles from '../styles/Connexion.module.css';

const Connexion = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  // --- Débogage : Vérifier l'état de `networkError` ---
  useEffect(() => {
      console.log("DEBUG Connexion: networkError state changed to:", networkError);
  }, [networkError]);

  // --- Débogage : Vérifier les erreurs de formulaire de React Hook Form ---
  useEffect(() => {
      if (Object.keys(errors).length > 0) {
          console.log("DEBUG Connexion: Form validation errors:", errors);
          // Vous pourriez même toaster les erreurs de validation si vous voulez:
          // Object.values(errors).forEach(error => {
          //     toast.error(`Validation: ${error.message}`);
          // });
      }
  }, [errors]);

  const onSubmit = async (data) => {
    console.log("DEBUG Connexion: onSubmit called with data:", data);
    setIsLoading(true);
    setNetworkError(null); // Réinitialise l'erreur réseau à chaque soumission

    try {
      console.log('📤 Tentative de connexion pour:', data.email);
      
      const response = await axiosInstance.post('/users/login', data);
      
      console.log('✅ Connexion réussie:', response.data);
      
      login(response.data.token, response.data.user);
      
      // Message de succès convivial
      toast.success(`Bonjour ${response.data.user.identifiant}, ravi de vous revoir !`);
      console.log("DEBUG Connexion: Succès - toast.success appelé.");
      navigate('/dashboard'); // Redirige l'utilisateur après une connexion réussie
      
    } catch (error) {
      console.error('❌ Erreur connexion (détails complets):', error);
      
      if (error.code === 'ERR_NETWORK') {
        console.log("DEBUG Connexion: Erreur réseau détectée.");
        setNetworkError('Impossible de contacter le serveur. Vérifiez que le backend est démarré sur http://localhost:5000');
        toast.error('Un problème de connexion est survenu. Il est impossible de joindre notre serveur. Veuillez vérifier votre connexion internet ou réessayer plus tard.');
        console.log("DEBUG Connexion: Erreur réseau - toast.error appelé.");

      } else if (error.response) {
        console.log("DEBUG Connexion: Erreur de réponse serveur détectée.");
        const { status, data } = error.response;
        console.log("DEBUG Connexion: Erreur de réponse - Status:", status, "Data:", data);

        let userFriendlyMessage = 'Une erreur inattendue est survenue de notre côté. Veuillez réessayer dans un instant.'; 

        if (status === 400 || status === 401) {
          console.log("DEBUG Connexion: Status 400 ou 401.");
          if (data.message) {
            console.log("DEBUG Connexion: data.message existe:", data.message);
            
            if (data.message.includes('Email ou mot de passe incorrect')) { 
                userFriendlyMessage = 'L\'adresse e-mail ou le mot de passe est incorrect. Veuillez vérifier vos informations et réessayer.';
                console.log("DEBUG Connexion: Message 'Email ou mot de passe incorrect' détecté.");
            } 
            else if (data.message.includes('utilisateur non trouvé')) {
                userFriendlyMessage = 'Aucun compte n\'est associé à cette adresse e-mail. Peut-être avez-vous fait une faute de frappe, ou n\'êtes-vous pas encore inscrit ?';
                console.log("DEBUG Connexion: Message 'utilisateur non trouvé' détecté.");
            } else if (data.message.includes('email invalide') || data.message.includes('format d\'email')) {
                userFriendlyMessage = 'Le format de l\'adresse e-mail ne semble pas correct. Veuillez la vérifier.';
                console.log("DEBUG Connexion: Message 'email invalide' ou 'format d'email' détecté.");
            } else {
                userFriendlyMessage = `Une difficulté est survenue : ${data.message}. Veuillez vérifier vos informations.`;
                console.log("DEBUG Connexion: Message générique 400/401 avec message backend.");
            }
          } else {
            userFriendlyMessage = 'Votre adresse e-mail ou votre mot de passe n\'est pas valide. Veuillez réessayer.';
            console.log("DEBUG Connexion: Message générique 400/401 sans message backend.");
          }
        } else if (status === 403) {
            userFriendlyMessage = 'Vous n\'avez pas les permissions nécessaires pour accéder à cette section. Si c\'est une erreur, contactez le support.';
            console.log("DEBUG Connexion: Status 403 (Forbidden).");
        }
        else if (status >= 500) {
          userFriendlyMessage = 'Un problème technique est survenu de notre côté. Nos équipes travaillent à le résoudre. Merci de réessayer plus tard.';
          console.log("DEBUG Connexion: Status 5xx (Server Error).");
        } 
        
        toast.error(`Désolé, ${userFriendlyMessage}`); 
        console.log("DEBUG Connexion: Erreur serveur - toast.error appelé avec message:", userFriendlyMessage);

      } else {
        console.log("DEBUG Connexion: Autre type d'erreur inattendue.");
        toast.error('Une difficulté inattendue est survenue. Veuillez réessayer ultérieurement.');
        console.log("DEBUG Connexion: Autre erreur - toast.error appelé.");
      }
    } finally {
      setIsLoading(false); 
      console.log("DEBUG Connexion: setIsLoading(false) appelé.");
    }
  };

  return (
    <div>
      {/* <Navbar /> // Déjà inclus dans App.jsx */}
      
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.titre}>Connexion</h2>
          <p className={styles.subtitle}>
            Accédez à votre espace personnel
          </p>

          {/* Affichage du message d'erreur réseau orienté utilisateur */}
          {networkError && (
            <div className={styles.networkError}>
              <h3>Un souci de connexion...</h3>
              <p>Il semblerait que nous ayons du mal à joindre notre serveur en ce moment.</p>
              <p>Voici quelques pistes simples qui pourraient aider :</p>
              <ul>
                <li>Vérifiez si vous êtes bien **connecté à internet**.</li>
                <li>Essayez de **rafraîchir la page** ou de **réessayer dans quelques instants**.</li>
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Champ Email */}
            <div className={styles.formGroup}>
              <label className={styles.label}>
                Adresse e-mail
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: 'Votre adresse e-mail est requise', 
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Le format de l\'adresse e-mail n\'est pas valide' 
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
                  required: 'Votre mot de passe est requis' 
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

            {/* Bouton de soumission */}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.bouton}
            >
              {isLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  <span>Connexion en cours...</span> 
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          {/* Lien vers inscription */}
          <div className={styles.linkContainer}>
            <p>
              Vous n'avez pas encore de compte ?{' '}
              <Link 
                to="/inscription" 
                className={styles.link}
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connexion;