
# YOUCHEF: APPLICATION DE GESTION DE RECETTES

PRÉSENTATION DU PROJET
Bienvenue sur l'Application de Gestion de Recettes, une plateforme moderne et intuitive conçue pour les passionnés de cuisine. Cette application permet aux utilisateurs de créer, visualiser, modifier et supprimer (CRUD) leurs recettes préférées. Vous pouvez également marquer des recettes comme favorites et gérer votre propre collection culinaire. L'application inclut une gestion d'utilisateurs avec des rôles, permettant une expérience personnalisée et sécurisée.

ARCHITECTURE ET TECHNOLOGIES (FULL-STACK)
Ce projet est une démonstration complète de mes compétences en développement Full-Stack, utilisant une pile technologique robuste et des pratiques modernes.

🌐 FRONTEND (REACT.JS)

Développé avec React.js, le frontend offre une interface utilisateur dynamique et réactive.

React 18+: Utilisation des dernières fonctionnalités de React pour une interface performante et modulaire.

React Router DOM: Gestion fluide de la navigation côté client, offrant une expérience utilisateur sans rechargement de page.

Axios: Client HTTP robuste pour une communication efficace et sécurisée avec le backend.

Context API: Gestion de l'état global (authentification, données des recettes) pour une architecture propre et scalable, évitant le prop drilling.

Styled Components / CSS Modules: Approche moderne pour la stylisation des composants, garantissant un code CSS maintenable et sans conflit.

Vite: Outil de build et serveur de développement ultra-rapide pour une expérience de développement optimisée.

⚙️ BACKEND (NODE.JS & EXPRESS.JS)

L'API RESTful est construite avec Node.js et le framework Express.js, garantissant des performances élevées et une grande flexibilité.

Node.js: Environnement d'exécution JavaScript côté serveur.

Express.js: Framework minimaliste et flexible pour la création d'APIs robustes.

Mongoose: ODM (Object Data Modeling) puissant pour MongoDB, facilitant les interactions avec la base de données et la validation des données.

JSON Web Tokens (JWT): Implémentation complète de l'authentification basée sur les tokens, assurant la sécurité des routes et la gestion des sessions utilisateur.

Bcrypt.js: Hachage sécurisé des mots de passe pour protéger les informations sensibles des utilisateurs.

Multer: Middleware Node.js pour la gestion des téléchargements de fichiers (images) avant leur traitement.

Cloudinary: Intégration d'un service de gestion d'images cloud pour le stockage, l'optimisation et la livraison rapide des photos de recettes, améliorant l'expérience utilisateur.

🗄️ BASE DE DONNÉES

MongoDB Atlas: Base de données NoSQL flexible et scalable, hébergée dans le cloud, idéale pour stocker des données non structurées comme les recettes et les profils utilisateurs.

FONCTIONNALITÉS CLÉS
AUTHENTIFICATION SÉCURISÉE: Inscription, connexion et déconnexion des utilisateurs avec protection des mots de passe.

GESTION COMPLÈTE DES RECETTES (CRUD):

Créer: Ajouter de nouvelles recettes avec leurs ingrédients, instructions et une image.

Lire: Visualiser toutes les recettes ou des recettes spécifiques.

Mettre à jour: Modifier vos propres recettes.

Supprimer: Supprimer les recettes que vous avez créées.

UPLOAD D'IMAGES INTÉGRÉ: Téléchargez facilement des images pour vos recettes, gérées et optimisées par Cloudinary.

TABLEAU DE BORD UTILISATEUR: Vue personnalisée pour chaque utilisateur affichant leurs recettes et des statistiques pertinentes.

TABLEAU DE BORD ADMINISTRATEUR: Interface dédiée pour les administrateurs pour gérer l'application et les utilisateurs (accès restreint).

NAVIGATION INTUITIVE: Design clair et parcours utilisateur simplifié.

ACCESSIBILITÉ
L'application a été conçue en gardant à l'esprit l'accessibilité, en utilisant des balises sémantiques HTML et des bonnes pratiques de développement web pour assurer une expérience utilisateur agréable pour tous.

POUR COMMENCER (DÉVELOPPEMENT LOCAL)
Suivez ces étapes pour lancer l'application sur votre machine locale :

Cloner le dépôt :

Bash

git clone [https://github.com/jfzara/YouChef.git]
cd recettesreact
Configuration du Backend :

Bash

cd backend
npm install
Créez un fichier .env à la racine du dossier backend et ajoutez vos variables d'environnement (MongoDB URI, JWT Secret, Cloudinary API keys, etc.).

Extrait de code

MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
Lancez le serveur backend :

Bash

cd  backend
npm start

Configuration du Frontend :

Bash

cd ../frontend # Retournez à la racine du projet, puis entrez dans le dossier frontend (ou src si votre package.json est à la racine de src)
npm install
Créez un fichier .env à la racine de votre dossier frontend (ou src si votre package.json est à la racine de src) si nécessaire pour les variables spécifiques au frontend (ex: URL de l'API backend).

Extrait de code

VITE_API_BASE_URL=[http://localhost:5000/api]
Lancez l'application React :

Bash

npm run dev
L'application sera accessible dans votre navigateur à [http://localhost:5173].

DÉPLOIEMENT
Cette application est prête à être déployée sur des services tels que Vercel (pour le frontend),  ou Render (pour le backend), avec des configurations environnementales appropriées.

CONTACT
N'hésitez pas à me contacter pour toute question ou opportunité.

Jeean Fabrice ZARA

[zarajeanfabrice@gmail.com]

[https://www.linkedin.com/in/jfzara-developpeur-react-node-montreal/]
