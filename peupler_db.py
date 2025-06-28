import requests
import json
import os

# --- Configuration (VOS VRAIES VALEURS) ---
# URL de votre API de base
BASE_API_URL = "http://localhost:5000/api"

# Identifiants de l'utilisateur admin pour la connexion
LOGIN_IDENTIFIANT = "zarajearice@gmail.com" # Votre route login utilise l'email
LOGIN_PASSWORD = "Password123"             # <--- Votre mot de passe en clair

# Chemin absolu vers votre dossier d'images locales
IMAGES_LOCAL_PATH = r"C:\Users\Jeff\Desktop\PROJETS VS CODE\JAVASCRIPT\REACT\recettesreact\src\assets\images"

# --- Données des recettes ---
recettes_a_creer = [
  {
    "nom": "Curry de Poulet aux Légumes",
    "description": "Un curry indien riche et savoureux avec du poulet tendre, des légumes frais et une sauce crémeuse à la noix de coco.",
    "categorie": "Plats Principaux",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_1.jpg"
  },
  {
    "nom": "Salade Composée d'Été",
    "description": "Une salade rafraîchissante avec de la roquette, des tomates cerises, du concombre, du feta et une vinaigrette légère au citron.",
    "categorie": "Entrées & Apéritifs",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_2.jpg"
  },
  {
    "nom": "Tarte au Citron Meringuée",
    "description": "Une tarte classique avec une garniture acidulée au citron et une meringue moelleuse et dorée.",
    "categorie": "Desserts",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_3.jpg"
  },
  {
    "nom": "Smoothie Vert Détox",
    "description": "Un smoothie sain et énergisant à base d'épinards, de banane, de pomme verte et de lait d'amande.",
    "categorie": "Boissons",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_4.jpg"
  },
  {
    "nom": "Gratin Dauphinois Classique",
    "description": "Des fines tranches de pommes de terre cuites dans de la crème et de l'ail, gratinées au four.",
    "categorie": "Accompagnements",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_5.jpg"
  },
  {
    "nom": "Pancakes aux Myrtilles",
    "description": "Des pancakes moelleux aux myrtilles fraîches, parfaits pour un petit-déjeuner gourmand.",
    "categorie": "Petit-déjeuner & Brunch",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_6.jpg"
  },
  {
    "nom": "Pain aux Noix et Raisins",
    "description": "Un pain rustique et savoureux, idéal pour le petit-déjeuner ou avec du fromage.",
    "categorie": "Boulangerie & Pâtisserie",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_7.jpg"
  },
  {
    "nom": "Chips de Kale Épicées",
    "description": "Des feuilles de kale croustillantes assaisonnées d'épices, un encas sain et addictif.",
    "categorie": "Snacks & Encas",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_8.jpg"
  },
  {
    "nom": "Vinaigrette Maison Balsamique",
    "description": "Une vinaigrette simple et délicieuse pour toutes vos salades.",
    "categorie": "Autres",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_9.jpg"
  },
  {
    "nom": "Lasagnes à la Bolognaise",
    "description": "Des couches de pâtes, de sauce bolognaise riche et de béchamel crémeuse, gratinées au four.",
    "categorie": "Plats Principaux",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_10.jpg"
  },
  {
    "nom": "Bruschetta Tomate Basilic",
    "description": "Des tranches de pain grillées frottées à l'ail, garnies de tomates fraîches et de basilic.",
    "categorie": "Entrées & Apéritifs",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_11.jpg"
  },
  {
    "nom": "Mousse au Chocolat Noir Intense",
    "description": "Une mousse légère et aérienne, pleine de saveur chocolatée.",
    "categorie": "Desserts",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_12.jpg"
  },
  {
    "nom": "Limonade Fraise-Menthe",
    "description": "Une limonade maison rafraîchissante avec des fraises écrasées et de la menthe fraîche.",
    "categorie": "Boissons",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_13.jpg"
  },
  {
    "nom": "Riz Pilaf aux Herbes",
    "description": "Un riz moelleux et parfumé, idéal pour accompagner viandes et poissons.",
    "categorie": "Accompagnements",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_14.jpg"
  },
  {
    "nom": "Omelette Norvégienne",
    "description": "Une omelette riche et garnie de saumon fumé et ciboulette, parfaite pour un brunch raffiné.",
    "categorie": "Petit-déjeuner & Brunch",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_15.jpg"
  },
  {
    "nom": "Croissants Pur Beurre",
    "description": "Des croissants dorés et feuilletés, faits maison.",
    "categorie": "Boulangerie & Pâtisserie",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_16.jpg"
  },
  {
    "nom": "Barres Énergétiques Maison",
    "description": "Des barres saines à base de flocons d'avoine, de fruits secs et de noix, idéales pour un boost d'énergie.",
    "categorie": "Snacks & Encas",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_17.jpg"
  },
  {
    "nom": "Houmous Fait Maison",
    "description": "Une trempette crémeuse à base de pois chiches, de tahini et de citron, idéale avec des légumes ou du pain pita.",
    "categorie": "Snacks & Encas",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_18.jpg"
  },
  {
    "nom": "Baguette Tradition Française",
    "description": "La célèbre baguette croustillante à l'extérieur et moelleuse à l'intérieur.",
    "categorie": "Boulangerie & Pâtisserie",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_19.jpg"
  },
  {
    "nom": "Boeuf Bourguignon",
    "description": "Un ragoût français classique mijoté lentement avec du bœuf, du vin rouge, des carottes et des champignons.",
    "categorie": "Plats Principaux",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_20.jpg"
  },
  {
    "nom": "Mini Quiches Lorraine",
    "description": "Des petites quiches crémeuses avec des lardons et du fromage, parfaites pour l'apéritif.",
    "categorie": "Entrées & Apéritifs",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_21.jpg"
  },
  {
    "nom": "Crème Brûlée à la Vanille",
    "description": "Une crème riche et onctueuse avec une croûte de sucre caramélisée croustillante.",
    "categorie": "Desserts",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_22.jpg"
  },
  {
    "nom": "Mojito Classique",
    "description": "Le cocktail cubain rafraîchissant avec du rhum, de la menthe, du citron vert et de l'eau gazeuse.",
    "categorie": "Boissons",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_23.jpg"
  },
  {
    "nom": "Purée de Pommes de Terre Crémeuse",
    "description": "Une purée de pommes de terre onctueuse avec du beurre et du lait, un accompagnement réconfortant.",
    "categorie": "Accompagnements",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_24.jpg"
  },
  {
    "nom": "Avocado Toast avec Œuf Poché",
    "description": "Une tartine grillée garnie d'avocat écrasé et d'un œuf poché, un classique du brunch.",
    "categorie": "Petit-déjeuner & Brunch",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_25.jpg"
  },
  {
    "nom": "Muffins aux Pépites de Chocolat",
    "description": "Des muffins moelleux et gourmands, parfaits pour la pause-café ou le goûter.",
    "categorie": "Boulangerie & Pâtisserie",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_26.jpg"
  },
  {
    "nom": "Vinaigrette Maison Balsamique (variante)",
    "description": "Une vinaigrette simple et délicieuse pour toutes vos salades, version légèrement différente.",
    "categorie": "Autres",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_27.jpg"
  },
  {
    "nom": "Pain aux Noix et Raisins (variante)",
    "description": "Un pain rustique et savoureux, idéal pour le petit-déjeuner ou avec du fromage, version alternative.",
    "categorie": "Boulangerie & Pâtisserie",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_28.jpg"
  },
  {
    "nom": "Soupe à l'Oignon Gratinée",
    "description": "Une soupe française classique avec des oignons caramélisés, un bouillon riche et du pain gratiné au fromage.",
    "categorie": "Plats Principaux",
    "sousCategorie": "Soupes",
    "local_image_filename": "mes_recettes_image_29.jpg"
  },
  {
    "nom": "Tiramisu Italien",
    "description": "Un dessert italien emblématique avec des couches de biscuits savoiardi imbibés de café, de crème de mascarpone et de cacao.",
    "categorie": "Desserts",
    "sousCategorie": "",
    "local_image_filename": "mes_recettes_image_30.jpg"
  }
]

def creer_recettes_avec_upload():
    token = None
    user_id = None

    print("Tentative de connexion pour obtenir un token...")
    try:
        login_url = f"{BASE_API_URL}/users/login"
        login_payload = {
            "email": LOGIN_IDENTIFIANT,
            "motDePasse": LOGIN_PASSWORD
        }
        response = requests.post(login_url, json=login_payload)
        response.raise_for_status() # Lève une exception pour les codes d'erreur HTTP (4xx ou 5xx)

        data = response.json()
        token = data.get("token")
        user_info = data.get("user", {})
        user_id = user_info.get("id")

        if not token or not user_id:
            print("Erreur: Token ou ID utilisateur non reçu après connexion.")
            return

        print(f"Connexion réussie. Token obtenu: {token[:10]}...")
        print(f"ID utilisateur connecté: {user_id}")

    except requests.exceptions.RequestException as e:
        print(f"Erreur lors de la connexion : {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"Réponse du serveur : {e.response.text}")
        return

    headers = {
        "Authorization": f"Bearer {token}"
    }

    create_recipe_url = f"{BASE_API_URL}/recettes"

    print(f"\nDébut de la création de {len(recettes_a_creer)} recettes avec upload d'images...")
    for i, recette_data in enumerate(recettes_a_creer):
        print(f"\n--- Traitement de la recette {i+1}/{len(recettes_a_creer)}: {recette_data['nom']} ---")

        image_path = os.path.join(IMAGES_LOCAL_PATH, recette_data["local_image_filename"])

        if not os.path.exists(image_path):
            print(f"ATTENTION: Fichier image introuvable pour '{recette_data['nom']}' : {image_path}. Cette recette sera ignorée.")
            continue

        try:
            with open(image_path, 'rb') as f:
                files = {'image': (recette_data["local_image_filename"], f, 'image/jpeg')}

                data = {
                    "nom": recette_data["nom"],
                    "description": recette_data["description"],
                    "categorie": recette_data["categorie"],
                    "sousCategorie": recette_data["sousCategorie"],
                }

                response = requests.post(create_recipe_url, files=files, data=data, headers=headers)
                response.raise_for_status()

                reponse_json = response.json()
                print(f"Recette '{recette_data['nom']}' créée avec succès ! ID: {reponse_json.get('_id')}")
                print(f"URL de l'image Cloudinary: {reponse_json.get('imageUrl')}")
                print(f"Public ID Cloudinary: {reponse_json.get('cloudinaryPublicId')}")

        except requests.exceptions.RequestException as e:
            print(f"Erreur lors de la création de la recette '{recette_data['nom']}' : {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"Réponse du serveur : {e.response.text}")
            print(f"Données de la recette : {recette_data}")
        except FileNotFoundError:
            print(f"Erreur: Le fichier image '{image_path}' n'a pas été trouvé. Recette non créée.")
        except Exception as e:
            print(f"Une erreur inattendue est survenue pour la recette '{recette_data['nom']}' : {e}")

    print("\nProcessus de création de recettes terminé.")

if __name__ == "__main__":
    if not os.path.isdir(IMAGES_LOCAL_PATH):
        print(f"Erreur: Le dossier d'images local '{IMAGES_LOCAL_PATH}' n'existe pas. Veuillez vérifier le chemin.")
    else:
        creer_recettes_avec_upload()