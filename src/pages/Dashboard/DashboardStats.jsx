// src/pages/Dashboard/DashboardStats.jsx
import React from 'react';
// import { motion } from 'framer-motion'; // <-- Supprimez cette ligne
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
      <h3 // Utilise un h3 standard, les animations sont gérées par le parent ou les éléments individuels
        style={{ color: 'var(--color-primary-600)', marginBottom: 'var(--space-4)' }}
      >
        Statistiques Rapides
      </h3>
      {stats.map((stat, index) => (
        <div // Utilise un div standard, les animations sont sur les éléments individuels si nécessaire
          key={index}
          // initial={{ opacity: 0, x: -20 }} // Animation gérée par les éléments Styled Components ou par le parent
          // animate={{ opacity: 1, x: 0 }}
          // transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            padding: 'var(--space-2)',
            background: 'var(--color-neutral-50)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <span style={{ fontSize: 'var(--text-xl)' }}>{stat.icon}</span>
          <p style={{ margin: 0, color: 'var(--color-neutral-700)' }}>
            <strong style={{ color: 'var(--color-neutral-800)' }}>{stat.name}:</strong> {stat.value}
          </p>
        </div>
      ))}
    </Card>
  );
};

export default DashboardStats;