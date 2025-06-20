import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';
import styles from '../styles/Inscription.module.css';

const Inscription = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState(null);
  const navigate = useNavigate();

  const password = watch('motDePasse');

  const onSubmit = async (data) => {
    setIsLoading(true);
    setNetworkError(null);

    try {
      const registerData = {
        identifiant: data.identifiant,
        email: data.email,
        motDePasse: data.motDePasse
      };
      
      console.log('📤 Envoi des données d\'inscription:', registerData);
      
      const response = await axiosInstance.post('/users/register', registerData);
      
      console.log('✅ Inscription réussie:', response.data);
      toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      
      navigate('/connexion');
      
    } catch (error) {
      console.error('❌ Erreur inscription:', error);
      
      if (error.code === 'ERR_NETWORK') {
        setNetworkError('Impossible de contacter le serveur. Vérifiez que le backend est démarré sur http://localhost:5000');
        toast.error('Erreur de connexion au serveur');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Erreur lors de l\'inscription');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.card}> {/* Ajout d'une carte pour encadrer le formulaire */}
          <h2 className={styles.titre}>Créer un compte</h2>
          <p className={styles.subtitle}>
            Rejoignez notre communauté de passionnés de cuisine
          </p>

          {/* Alerte erreur réseau */}
          {networkError && (
            <div className={styles.networkError}>
              <h3>Erreur de connexion</h3>
              <p>{networkError}</p>
              <div>
                <p>Solutions possibles :</p>
                <ul>
                  <li>Démarrer le serveur backend : <code>npm start</code></li>
                  <li>Vérifier que le serveur fonctionne sur le port 5000</li>
                  <li>Vérifier la configuration de l'URL dans axiosInstance.js</li>
                </ul>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Identifiant */}
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

            {/* Email */}
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

            {/* Mot de passe */}
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

            {/* Confirmation mot de passe */}
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

          {/* Lien vers connexion */}
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
        </div> {/* Fin de .card */}
      </div>
    </div>
  );
};

export default Inscription;