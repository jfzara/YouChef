import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
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
      
      // Connexion de l'utilisateur avec le token et les données
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
        <h2 className={styles.titre}>Connexion</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
          Accédez à votre espace personnel
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
            <p style={{ fontSize: '0.85rem' }}>{networkError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
                required: 'Le mot de passe est requis'
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
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>

        {/* Lien vers inscription */}
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            Vous n'avez pas encore de compte ?{' '}
            <Link 
              to="/inscription" 
              style={{ 
                color: '#e67e22', 
                textDecoration: 'none', 
                fontWeight: '500',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#cf711f'}
              onMouseLeave={(e) => e.target.style.color = '#e67e22'}
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Connexion;