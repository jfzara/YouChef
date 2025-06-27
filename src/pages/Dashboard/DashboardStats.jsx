// src/pages/Dashboard/DashboardStats.jsx
import React from 'react';
import { motion } from 'framer-motion'; // <-- Réactivez cette ligne !
import { Card } from './Dashboard.styles';

const DashboardStats = () => {
  const stats = [
    { name: "Total Recettes", value: "25", icon: "📚" },
    { name: "Catégories Uniques", value: "8", icon: "📋" },
    { name: "Dernière Ajoutée", value: "Pizza Maison", icon: "🆕" },
  ];

  return (
    <Card
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h3
        style={{ color: 'var(--color-primary-700)', marginBottom: 'var(--space-4)', textAlign: 'center' }} // Utilise une couleur de la palette
      >
        Statistiques Rapides 📈
      </h3>
      {stats.map((stat, index) => (
        <motion.div // Ajoute motion.div ici pour des animations individuelles si désiré
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 + index * 0.1, duration: 0.5, type: "spring", stiffness: 100, damping: 10 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            padding: 'var(--space-2)',
            background: 'var(--color-primary-50)', // Fond légèrement coloré
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-xs)',
            marginBottom: index < stats.length - 1 ? 'var(--space-2)' : '0', // Espace entre les stats
            border: '1px solid var(--color-primary-200)', // Petite bordure
          }}
        >
          <span style={{ fontSize: 'var(--text-xl)' }}>{stat.icon}</span>
          <p style={{ margin: 0, color: 'var(--color-neutral-700)' }}>
            <strong style={{ color: 'var(--color-primary-600)' }}>{stat.name}:</strong> {stat.value}
          </p>
        </motion.div>
      ))}
    </Card>
  );
};

export default DashboardStats;