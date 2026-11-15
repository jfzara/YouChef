# YouChef

A full-stack recipe manager: users sign up, publish recipes with photos, and manage them from a personal dashboard; admins manage users and all recipes.

Live: https://youchefjfzara.vercel.app <!-- TODO: confirm this is the current front-end URL (found in the backend CORS list) -->

![screenshot](docs/screenshot.png) <!-- TODO: add screenshot -->

## Features

- Sign up and log in (username, email, password). Passwords are hashed with bcrypt; sessions use a JWT valid for 1 hour.
- Public recipe page with category filter and loading skeletons.
- Personal dashboard: create, edit and delete your own recipes, with optional image upload; stats (number of recipes, distinct categories and sub-categories); recently added recipes.
- Images stored on Cloudinary; replacing or deleting a recipe also deletes its old image.
- Admin dashboard: list users, change a user's role (user / admin), delete users, delete any recipe. An admin cannot change their own role or delete their own account.
- Protected routes on the client (`PrivateRoute`, `AdminRoute`) and on the server (auth and admin middleware).

## Tech stack

- Frontend: React 19, Vite, React Router 7, Axios, React Hook Form, Framer Motion, React Toastify
- Styling: styled-components, CSS Modules
- Backend: Node.js, Express 5, Mongoose 8
- Database: MongoDB (Atlas)
- Auth: jsonwebtoken, bcrypt, jwt-decode (client)
- Media: Multer (memory storage), Cloudinary
- Hosting: Vercel (frontend), Render (backend)

## Architecture

```
/ (root)            React + Vite front end (src/)
  src/api/axiosInstance.js   Axios client: base URL, token injection, error handling
  src/contexts/              AuthContext (user, token, expiry check), RecipeContext
  src/pages/                 Home, Login, Register, Recipes, Dashboard
  src/components/            Navbar, Footer, AdminDashboard, route guards
backend/            Express API
  server.js                  CORS, routes, MongoDB connection
  models/                    User, Recette
  routes/                    /api/users, /api/recettes, /api/dashboard
  middleware/                authMiddleware (JWT), adminMiddleware (role), uploadMiddleware (Multer)
  config/cloudinaryConfig.js
```

Request flow:

1. On login, the API signs a JWT containing the user id, email and role. The client stores it in `localStorage`.
2. An Axios request interceptor adds `Authorization: Bearer <token>` to every call. A response interceptor logs the user out on a 401 and shows friendly messages for network errors and timeouts.
3. `authMiddleware` verifies the token and sets `req.user`; `adminMiddleware` checks `req.user.role === 'admin'`.
4. For uploads, Multer keeps the file in memory, the backend sends it to Cloudinary as a base64 data URI (folder `recettes_app`, max 600x600, automatic quality and format), and the recipe stores both `imageUrl` and `cloudinaryPublicId`.

Main endpoints:

| Method | Route | Access |
|---|---|---|
| POST | `/api/users/register`, `/api/users/login` | Public |
| GET, PUT, DELETE | `/api/users`, `/api/users/:id` | Admin |
| GET | `/api/recettes/all` | Public |
| GET, POST | `/api/recettes` | Logged-in user (own recipes) |
| PUT, DELETE | `/api/recettes/:id` | Owner or admin |
| GET | `/api/dashboard/stats` | Logged-in user |
| GET | `/api/dashboard/recent-recipes` | Public |

Data model: `User` (identifiant, email, password hash, role) and `Recette` (name, description, category from a fixed list of 9, sub-category, image URL, Cloudinary public id, owner reference, timestamps).

## Key decisions

- **Stateless JWT auth with the role inside the token.** The server checks permissions without a database lookup on each request, and the client can show or hide admin views from the decoded token. The trade-off is that a role change only takes effect at the next login (tokens last 1 hour).
- **Ownership enforced in the query.** For non-admins, edits and deletes use `findOne({ _id, owner: req.user.id })`, so a user cannot modify another user's recipe even with a valid token.
- **Cloudinary with stored public ids.** Images are not kept on the server (Render's disk is not persistent), and keeping `cloudinaryPublicId` allows cleaning up old images on update and delete.
- **Handling Render cold starts on the client.** The backend sleeps on the free tier, so the client uses a 30-second timeout, retries the public recipe list up to 3 times, and shows a "server is waking up" message instead of a raw network error.

## Getting started

Requirements: Node.js 18+, a MongoDB database (local or Atlas), a Cloudinary account.

```bash
git clone https://github.com/jfzara/YouChef.git
cd YouChef

# Backend (http://localhost:5000)
cd backend
npm install
# create backend/.env with the variables below
npm start

# Frontend (in a second terminal, from the repository root, http://localhost:5173)
npm install
npm run dev
```

Backend environment variables (`backend/.env`):

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

The front end needs no `.env`: in development it calls `http://localhost:5000/api`, in production the Render URL set in `src/api/axiosInstance.js`.

To create an admin, register normally, then set `role` to `"admin"` on that user in MongoDB.

## Known limitations / next steps

- Recipes have a name, description, category and image only; there are no ingredients or steps fields yet, and the recipe detail page (`/recettes/:id`) is a static placeholder.
- The API base URL is hardcoded in the client instead of coming from an environment variable.
- No input validation layer (beyond Mongoose schemas), no upload size limit and no rate limiting on login.
- Verbose debug logging is still present in the backend.
- No automated tests yet.

## Author

Jeff Zara — [GitHub](https://github.com/jfzara)

---

## Français

# YouChef

Un gestionnaire de recettes full-stack : les utilisateurs s'inscrivent, publient des recettes avec photo et les gèrent depuis un tableau de bord personnel ; les administrateurs gèrent les utilisateurs et toutes les recettes.

En ligne : https://youchefjfzara.vercel.app <!-- TODO: confirm this is the current front-end URL (found in the backend CORS list) -->

![screenshot](docs/screenshot.png) <!-- TODO: add screenshot -->

### Fonctionnalités

- Inscription et connexion (identifiant, email, mot de passe). Mots de passe hachés avec bcrypt ; sessions par JWT valide 1 heure.
- Page publique des recettes avec filtre par catégorie et squelettes de chargement.
- Tableau de bord personnel : créer, modifier et supprimer ses recettes, avec image optionnelle ; statistiques (nombre de recettes, catégories et sous-catégories distinctes) ; recettes récemment ajoutées.
- Images stockées sur Cloudinary ; remplacer ou supprimer une recette supprime aussi l'ancienne image.
- Tableau de bord administrateur : liste des utilisateurs, changement de rôle (user / admin), suppression d'utilisateurs, suppression de n'importe quelle recette. Un admin ne peut ni changer son propre rôle ni supprimer son propre compte.
- Routes protégées côté client (`PrivateRoute`, `AdminRoute`) et côté serveur (middlewares d'authentification et d'administration).

### Stack technique

- Frontend : React 19, Vite, React Router 7, Axios, React Hook Form, Framer Motion, React Toastify
- Styles : styled-components, CSS Modules
- Backend : Node.js, Express 5, Mongoose 8
- Base de données : MongoDB (Atlas)
- Authentification : jsonwebtoken, bcrypt, jwt-decode (client)
- Médias : Multer (stockage en mémoire), Cloudinary
- Hébergement : Vercel (frontend), Render (backend)

### Architecture

```
/ (racine)          Front React + Vite (src/)
  src/api/axiosInstance.js   Client Axios : URL de base, ajout du token, gestion des erreurs
  src/contexts/              AuthContext (utilisateur, token, vérification d'expiration), RecipeContext
  src/pages/                 Accueil, Connexion, Inscription, Recettes, Dashboard
  src/components/            Navbar, Footer, AdminDashboard, gardes de routes
backend/            API Express
  server.js                  CORS, routes, connexion MongoDB
  models/                    User, Recette
  routes/                    /api/users, /api/recettes, /api/dashboard
  middleware/                authMiddleware (JWT), adminMiddleware (rôle), uploadMiddleware (Multer)
  config/cloudinaryConfig.js
```

Déroulement d'une requête :

1. À la connexion, l'API signe un JWT contenant l'id, l'email et le rôle de l'utilisateur. Le client le stocke dans `localStorage`.
2. Un intercepteur de requêtes Axios ajoute `Authorization: Bearer <token>` à chaque appel. Un intercepteur de réponses déconnecte l'utilisateur sur un 401 et affiche des messages lisibles en cas d'erreur réseau ou de délai dépassé.
3. `authMiddleware` vérifie le token et renseigne `req.user` ; `adminMiddleware` vérifie `req.user.role === 'admin'`.
4. Pour les images, Multer garde le fichier en mémoire, le backend l'envoie à Cloudinary sous forme de data URI base64 (dossier `recettes_app`, 600x600 max, qualité et format automatiques), et la recette conserve `imageUrl` et `cloudinaryPublicId`.

Principaux endpoints :

| Méthode | Route | Accès |
|---|---|---|
| POST | `/api/users/register`, `/api/users/login` | Public |
| GET, PUT, DELETE | `/api/users`, `/api/users/:id` | Admin |
| GET | `/api/recettes/all` | Public |
| GET, POST | `/api/recettes` | Utilisateur connecté (ses recettes) |
| PUT, DELETE | `/api/recettes/:id` | Propriétaire ou admin |
| GET | `/api/dashboard/stats` | Utilisateur connecté |
| GET | `/api/dashboard/recent-recipes` | Public |

Modèle de données : `User` (identifiant, email, hash du mot de passe, rôle) et `Recette` (nom, description, catégorie parmi une liste fixe de 9, sous-catégorie, URL d'image, public id Cloudinary, référence au propriétaire, horodatage).

### Décisions techniques

- **Authentification JWT sans état, avec le rôle dans le token.** Le serveur vérifie les permissions sans requête en base à chaque appel, et le client peut afficher ou masquer les vues admin à partir du token décodé. En contrepartie, un changement de rôle ne prend effet qu'à la connexion suivante (tokens d'une heure).
- **Propriété vérifiée dans la requête.** Pour un non-admin, modification et suppression passent par `findOne({ _id, owner: req.user.id })` : un utilisateur ne peut pas modifier la recette d'un autre, même avec un token valide.
- **Cloudinary avec public id conservé.** Les images ne sont pas stockées sur le serveur (le disque de Render n'est pas persistant), et conserver `cloudinaryPublicId` permet de nettoyer les anciennes images lors d'une modification ou d'une suppression.
- **Gestion des démarrages à froid de Render côté client.** Le backend se met en veille sur l'offre gratuite : le client utilise un délai de 30 secondes, relance jusqu'à 3 fois le chargement de la liste publique et affiche un message « le serveur se réveille » plutôt qu'une erreur réseau brute.

### Démarrage

Prérequis : Node.js 18+, une base MongoDB (locale ou Atlas), un compte Cloudinary.

```bash
git clone https://github.com/jfzara/YouChef.git
cd YouChef

# Backend (http://localhost:5000)
cd backend
npm install
# créer backend/.env avec les variables ci-dessous
npm start

# Frontend (dans un second terminal, depuis la racine du dépôt, http://localhost:5173)
npm install
npm run dev
```

Variables d'environnement du backend (`backend/.env`) :

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```

Le front n'a pas besoin de `.env` : en développement il appelle `http://localhost:5000/api`, en production l'URL Render définie dans `src/api/axiosInstance.js`.

Pour créer un administrateur, s'inscrire normalement, puis passer le champ `role` de cet utilisateur à `"admin"` dans MongoDB.

### Limites connues / prochaines étapes

- Une recette comporte seulement un nom, une description, une catégorie et une image ; pas encore de champs ingrédients ou étapes, et la page de détail (`/recettes/:id`) est un gabarit statique.
- L'URL de l'API est codée en dur dans le client au lieu de venir d'une variable d'environnement.
- Pas de couche de validation des entrées (au-delà des schémas Mongoose), pas de limite de taille d'upload ni de limitation de débit sur la connexion.
- Des logs de débogage verbeux sont encore présents dans le backend.
- Pas encore de tests automatisés.

### Auteur

Jeff Zara — [GitHub](https://github.com/jfzara)
