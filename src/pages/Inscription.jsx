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
      // Données à envoyer (sans confirmPassword)
      const registerData = {
        identifiant: data.identifiant,
        email: data.email,
        motDePasse: data.motDePasse
      };
      
      console.log('📤 Envoi des données d\'inscription:', registerData);
      
      // Requête d'inscription
      const response = await axiosInstance.post('/users/register', registerData);
      
      console.log('✅ Inscription réussie:', response.data);
      toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      
      // Redirection vers la page de connexion
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
        <h2 className={styles.titre}>Créer un compte</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
          Rejoignez notre communauté de passionnés de cuisine
        </p>

        {/* Alerte erreur réseau */}
        {networkError && (
          <div style={{ 
            marginBottom: '1.5rem', 
            padding: '1rem', 
            backgroundColor: '#fee', 
            border: '1px solid #fcc',
            borderRadius: '5px',
            color: '#c33'
          }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
              Erreur de connexion
            </h3>
            <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>{networkError}</p>
            <div style={{ fontSize: '0.8rem' }}>
              <p>Solutions possibles :</p>
              <ul style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
                <li>Démarrer le serveur backend : <code style={{ backgroundColor: '#fdd', padding: '0.2rem', borderRadius: '3px' }}>npm start</code></li>
                <li>Vérifier que le serveur fonctionne sur le port 5000</li>
                <li>Vérifier la configuration de l'URL dans axiosInstance.js</li>
              </ul>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          {/* Identifiant */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
              Identifiant
            </label>
            <input
              type="text"
              {...register('identifiant', { 
                required: 'L\'identifiant est requis',
                minLength: { value: 3, message: 'Minimum 3 caractères' }
              })}
              style={{
                border: errors.identifiant ? '2px solid #e74c3c' : '1px solid #ccc',
                borderRadius: '5px'
              }}
              placeholder="Votre identifiant"
            />
            {errors.identifiant && (
              <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                {errors.identifiant.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
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
              style={{
                border: errors.email ? '2px solid #e74c3c' : '1px solid #ccc',
                borderRadius: '5px'
              }}
              placeholder="votre@email.com"
            />
            {errors.email && (
              <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Mot de passe */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
              Mot de passe
            </label>
            <input
              type="password"
              {...register('motDePasse', { 
                required: 'Le mot de passe est requis',
                minLength: { value: 6, message: 'Minimum 6 caractères' }
              })}
              style={{
                border: errors.motDePasse ? '2px solid #e74c3c' : '1px solid #ccc',
                borderRadius: '5px'
              }}
              placeholder="Votre mot de passe"
            />
            {errors.motDePasse && (
              <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                {errors.motDePasse.message}
              </p>
            )}
          </div>

          {/* Confirmation mot de passe */}
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#333' }}>
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              {...register('confirmPassword', { 
                required: 'Veuillez confirmer votre mot de passe',
                validate: value => value === password || 'Les mots de passe ne correspondent pas'
              })}
              style={{
                border: errors.confirmPassword ? '2px solid #e74c3c' : '1px solid #ccc',
                borderRadius: '5px'
              }}
              placeholder="Confirmer votre mot de passe"
            />
            {errors.confirmPassword && (
              <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={isLoading}
            className={styles.bouton}
            style={{
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Inscription en cours...' : 'Créer mon compte'}
          </button>
        </form>

        {/* Lien vers connexion */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Vous avez déjà un compte ?{' '}
            <Link 
              to="/connexion" 
              style={{ 
                color: '#e67e22', 
                textDecoration: 'none', 
                fontWeight: '500',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#cf711f'}
              onMouseLeave={(e) => e.target.style.color = '#e67e22'}
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inscription;