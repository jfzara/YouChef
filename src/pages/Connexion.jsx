import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar/Navbar';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';
import styles from '../styles/Connexion.module.css';

const Connexion = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [networkError, setNetworkError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setNetworkError(null);

    try {
      console.log('📤 Tentative de connexion pour:', data.email);
      
      const response = await axiosInstance.post('/users/login', data);
      
      console.log('✅ Connexion réussie:', response.data);
      
      login(response.data.token, response.data.user);
      
      toast.success(`Bienvenue ${response.data.user.identifiant} !`);
      navigate('/dashboard');
      
    } catch (error) {
      console.error('❌ Erreur connexion:', error);
      
      if (error.code === 'ERR_NETWORK') {
        setNetworkError('Impossible de contacter le serveur. Vérifiez que le backend est démarré sur http://localhost:5000');
        toast.error('Erreur de connexion au serveur');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Erreur lors de la connexion');
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
          <h2 className={styles.titre}>Connexion</h2>
          <p className={styles.subtitle}>
            Accédez à votre espace personnel
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
                  required: 'Le mot de passe est requis'
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
        </div> {/* Fin de .card */}
      </div>
    </div>
  );
};

export default Connexion;