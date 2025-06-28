import multer from 'multer';

// Nous allons utiliser 'memoryStorage' car nous n'avons pas besoin de stocker le fichier sur le disque du serveur
// avant de l'envoyer à Cloudinary. Le fichier est gardé en mémoire tampon.
const storage = multer.memoryStorage();

// Initialisez Multer avec la stratégie de stockage.
// Vous pouvez également ajouter des limites de taille de fichier ici si nécessaire.
const upload = multer({ storage: storage });

export default upload; // Exportez l'instance configurée de Multer