import { v2 as cloudinary } from 'cloudinary'; // Importez le module Cloudinary
import dotenv from 'dotenv'; // <<< Assurez-vous d'importer dotenv

dotenv.config(); // <<< AJOUTEZ CETTE LIGNE pour charger les variables d'environnement

// Configurez Cloudinary avec vos variables d'environnement
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true // Recommandé : Utilise HTTPS pour les URLs des images
});

export default cloudinary; // Exportez l'instance configurée de Cloudinary