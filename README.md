
# YOUCHEF - VOTRE ASSISTANT CULINAIRE NUMÉRIQUE

Bienvenue sur YouChef ! Ce projet est un serveur backend robuste, conçu pour gérer des recettes de cuisine. Que vous soyez un chef passionné ou un gourmand en quête d'inspiration, YouChef vise à offrir une plateforme flexible et intuitive pour organiser, partager et découvrir des créations culinaires.

Ce dépôt contient le code source du backend. Il gère la logique métier, la persistance des données et expose une API RESTful pour interagir avec les recettes, les utilisateurs et les images.

✨ FONCTIONNALITÉS CLÉS
Gestion Complète des Recettes : Créez, lisez, mettez à jour et supprimez vos recettes.

Authentification Sécurisée : Gérez les utilisateurs avec des processus d'inscription et de connexion.

Upload d'Images : Intégration Cloudinary pour un stockage et une diffusion efficaces des images de recettes.

API RESTful Intuitive : Une interface claire pour les applications clientes (front-end, mobile).

Catégorisation Flexible : Organisez les recettes par catégories et sous-catégories.

🚀 DÉMARRAGE RAPIDE
Suivez ces étapes pour faire tourner le backend de YouChef sur votre machine locale.

PRÉREQUIS
Assurez-vous d'avoir installé :

Node.js (version LTS recommandée)

MongoDB (serveur local ou accès à MongoDB Atlas)

Un compte Cloudinary (nécessaire pour l'upload d'images)

INSTALLATION
Clonez le dépôt :

Bash

git clone [https://github.com/votre_utilisateur/youchef-backend.git]
cd youchef-backend
Installez les dépendances :

Bash

npm install
Configurez les variables d'environnement :
Créez un fichier .env à la racine du projet et ajoutez vos identifiants :

PORT=5000
MONGODB_URI="mongodb://localhost:27017/youchef"
JWT_SECRET="Votre_Secret_JWT_Tres_Long_Et_Complexe"
CLOUDINARY_CLOUD_NAME="votre_cloud_name_cloudinary"
CLOUDINARY_API_KEY="votre_api_key_cloudinary"
CLOUDINARY_API_SECRET="votre_api_secret_cloudinary"
PORT : Port d'écoute du serveur.

MONGODB_URI : URI de connexion à votre base de données.

JWT_SECRET : Clé secrète pour les jetons JWT (utilisez une chaîne complexe).

CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET : Vos identifiants Cloudinary.

LANCEMENT DU SERVEUR
Démarrez le serveur backend :

Bash

npm start
Le serveur devrait être opérationnel sur [http://localhost:5000] (ou le port que vous avez configuré).

🧪 PEUPLER LA BASE DE DONNÉES
Un script Python est inclus pour pré-remplir votre base de données avec des recettes fictives et des images.

Installez Python (si ce n'est pas déjà fait).

Installez les dépendances Python :

Bash

pip install requests faker
Mettez à jour le script peupler_db.py :

BASE_API_URL : Doit correspondre à l'URL de votre backend (ex: [http://localhost:5000/api]).

LOGIN_IDENTIFIANT et LOGIN_PASSWORD : Identifiants d'un utilisateur admin existant.

IMAGES_LOCAL_PATH : Chemin absolu vers votre dossier d'images de test.

Exécutez le script :

Bash

python peupler_db.py
Le script créera des recettes avec du Lorem Ipsum et uploadera les images sur Cloudinary.

🤝 CONTRIBUTION
Nous accueillons les contributions ! Pour améliorer YouChef :

Faites un "fork" du projet.

Créez une branche pour votre fonctionnalité : git checkout -b feature/nom-de-votre-fonctionnalite.

Commitez vos changements : git commit -m 'Ajout d\'une nouvelle fonctionnalité'.

Poussez vers la branche : git push origin feature/nom-de-votre-fonctionnalite.

Ouvrez une Pull Request.
