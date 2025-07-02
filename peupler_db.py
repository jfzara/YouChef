

import requests
import json
import os
from faker import Faker # Gardons Faker, il pourrait être utile à l'avenir
import random

# --- Configuration (VOS VRAIES VALEURS) ---
# URL de votre API de base
BASE_API_URL = "http://localhost:5000/api"

# Identifiants de l'utilisateur admin pour la connexion
LOGIN_IDENTIFIANT = "zarajearice@gmail.com"
LOGIN_PASSWORD = "Password123"

# Chemin absolu vers votre dossier d'images locales
IMAGES_LOCAL_PATH = r"C:\Users\Jeff\Desktop\PROJETS VS CODE\JAVASCRIPT\REACT\recettesreact\src\assets\images"

# Initialisation de Faker (on peut la garder, mais on utilisera notre propre Lorem Ipsum pour le texte principal)
fake = Faker()

# Liste de mots Lorem Ipsum classiques pour générer du texte
LOREM_IPSUM_WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "ut", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "ut", "aliquip", "ex", "ea",
    "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit",
    "in", "voluptate", "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla",
    "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident",
    "sunt", "in", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id",
    "est", "laborum"
]

def generate_lorem_text(min_words, max_words):
    """Génère une chaîne de Lorem Ipsum à partir de la liste de mots, avec répétitions possibles."""
    num_words = random.randint(min_words, max_words)
    # Utilisez random.choice pour permettre les répétitions et éviter l'erreur "Sample larger than population"
    words = [random.choice(LOREM_IPSUM_WORDS) for _ in range(num_words)]
    
    text = ' '.join(words)
    return text.capitalize() + '.' # Met la première lettre en majuscule et ajoute un point.

def generate_lorem_title():
    """Génère un titre de recette en Lorem Ipsum classique."""
    # Un titre plus court, sans point final
    return generate_lorem_text(3, 6).replace('.', '')

def generate_lorem_ingredients():
    """Génère une liste aléatoire d'ingrédients en Lorem Ipsum classique."""
    num_ingredients = random.randint(5, 10)
    ingredients = [generate_lorem_text(4, 8).replace('.', '') for _ in range(num_ingredients)]
    return ingredients

def generate_lorem_etapes():
    """Génère une liste aléatoire d'étapes de préparation en Lorem Ipsum classique."""
    num_etapes = random.randint(4, 8)
    etapes = [generate_lorem_text(10, 30) for _ in range(num_etapes)] # Plus de mots pour les paragraphes
    return etapes

# --- Données des recettes (Les noms seront générés aléatoirement) ---
recettes_a_creer_base = [
    {
        "categorie": "Plats Principaux",
        "sousCategorie": "Asiatique",
        "local_image_filename": "mes_recettes_image_1.jpg"
    },
    {
        "categorie": "Entrées & Apéritifs",
        "sousCategorie": "Végétarien",
        "local_image_filename": "mes_recettes_image_2.jpg"
    },
    {
        "categorie": "Desserts",
        "sousCategorie": "Pâtisserie",
        "local_image_filename": "mes_recettes_image_3.jpg"
    },
    {
        "categorie": "Boissons",
        "sousCategorie": "Sain",
        "local_image_filename": "mes_recettes_image_4.jpg"
    },
    {
        "categorie": "Accompagnements",
        "sousCategorie": "Français",
        "local_image_filename": "mes_recettes_image_5.jpg"
    },
    {
        "categorie": "Petit-déjeuner & Brunch",
        "sousCategorie": "Sucré",
        "local_image_filename": "mes_recettes_image_6.jpg"
    },
    {
        "categorie": "Boulangerie & Pâtisserie",
        "sousCategorie": "Pains",
        "local_image_filename": "mes_recettes_image_7.jpg"
    },
    {
        "categorie": "Snacks & Encas",
        "sousCategorie": "Sain",
        "local_image_filename": "mes_recettes_image_8.jpg"
    },
    {
        "categorie": "Autres",
        "sousCategorie": "Sauces",
        "local_image_filename": "mes_recettes_image_9.jpg"
    },
    {
        "categorie": "Plats Principaux",
        "sousCategorie": "Italien",
        "local_image_filename": "mes_recettes_image_10.jpg"
    },
    {
        "categorie": "Entrées & Apéritifs",
        "sousCategorie": "Italien",
        "local_image_filename": "mes_recettes_image_11.jpg"
    },
    {
        "categorie": "Desserts",
        "sousCategorie": "Chocolat",
        "local_image_filename": "mes_recettes_image_12.jpg"
    },
    {
        "categorie": "Boissons",
        "sousCategorie": "Rafraîchissant",
        "local_image_filename": "mes_recettes_image_13.jpg"
    },
    {
        "categorie": "Accompagnements",
        "sousCategorie": "Simple",
        "local_image_filename": "mes_recettes_image_14.jpg"
    },
    {
        "categorie": "Petit-déjeuner & Brunch",
        "sousCategorie": "Salé",
        "local_image_filename": "mes_recettes_image_15.jpg"
    },
    {
        "categorie": "Boulangerie & Pâtisserie",
        "sousCategorie": "Viennoiseries",
        "local_image_filename": "mes_recettes_image_16.jpg"
    },
    {
        "categorie": "Snacks & Encas",
        "sousCategorie": "Sain",
        "local_image_filename": "mes_recettes_image_17.jpg"
    },
    {
        "categorie": "Snacks & Encas",
        "sousCategorie": "Végétarien",
        "local_image_filename": "mes_recettes_image_18.jpg"
    },
    {
        "categorie": "Boulangerie & Pâtisserie",
        "sousCategorie": "Pains",
        "local_image_filename": "mes_recettes_image_19.jpg"
    },
    {
        "categorie": "Plats Principaux",
        "sousCategorie": "Français",
        "local_image_filename": "mes_recettes_image_20.jpg"
    },
    {
        "categorie": "Entrées & Apéritifs",
        "sousCategorie": "Salé",
        "local_image_filename": "mes_recettes_image_21.jpg"
    },
    {
        "categorie": "Desserts",
        "sousCategorie": "Français",
        "local_image_filename": "mes_recettes_image_22.jpg"
    },
    {
        "categorie": "Boissons",
        "sousCategorie": "Cocktails",
        "local_image_filename": "mes_recettes_image_23.jpg"
    },
    {
        "categorie": "Accompagnements",
        "sousCategorie": "Classique",
        "local_image_filename": "mes_recettes_image_24.jpg"
    },
    {
        "categorie": "Petit-déjeuner & Brunch",
        "sousCategorie": "Tendance",
        "local_image_filename": "mes_recettes_image_25.jpg"
    },
    {
        "categorie": "Boulangerie & Pâtisserie",
        "sousCategorie": "Goûter",
        "local_image_filename": "mes_recettes_image_26.jpg"
    },
    {
        "categorie": "Autres",
        "sousCategorie": "Sauces",
        "local_image_filename": "mes_recettes_image_27.jpg"
    },
    {
        "categorie": "Boulangerie & Pâtisserie",
        "sousCategorie": "Pains",
        "local_image_filename": "mes_recettes_image_28.jpg"
    },
    {
        "categorie": "Plats Principaux",
        "sousCategorie": "Soupes",
        "local_image_filename": "mes_recettes_image_29.jpg"
    },
    {
        "categorie": "Desserts",
        "sousCategorie": "Italien",
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
        response.raise_for_status()

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

    print(f"\nDébut de la création de {len(recettes_a_creer_base)} recettes avec upload d'images...")
    for i, recette_data_base in enumerate(recettes_a_creer_base):
        recette_data = recette_data_base.copy()

        # --- Génération du Lorem Ipsum pour le nom (titre) ---
        generated_name = generate_lorem_title()
        recette_data["nom"] = generated_name
        # -----------------------------------------------------

        print(f"\n--- Traitement de la recette {i+1}/{len(recettes_a_creer_base)}: {recette_data['nom']} ---")

        image_path = os.path.join(IMAGES_LOCAL_PATH, recette_data["local_image_filename"])

        if not os.path.exists(image_path):
            print(f"ATTENTION: Fichier image introuvable pour '{recette_data['nom']}' : {image_path}. Cette recette sera ignorée.")
            continue

        try:
            with open(image_path, 'rb') as f:
                files = {'image': (recette_data["local_image_filename"], f, 'image/jpeg')}

                # --- Génération du Lorem Ipsum pour la description, ingrédients et étapes ---
                generated_description = generate_lorem_text(50, 150)
                generated_ingredients = generate_lorem_ingredients()
                generated_etapes = generate_lorem_etapes()
                # --------------------------------------------------------------------------

                data = {
                    "nom": recette_data["nom"],
                    "description": generated_description,
                    "categorie": recette_data["categorie"],
                    "sousCategorie": recette_data["sousCategorie"],
                    "ingredients": json.dumps(generated_ingredients),
                    "etapes": json.dumps(generated_etapes)
                }

                print(f"Description générée: {generated_description[:50]}...")
                print(f"Nombre d'ingrédients générés: {len(generated_ingredients)}")
                print(f"Nombre d'étapes générées: {len(generated_etapes)}")


                response = requests.post(create_recipe_url, files=files, data=data, headers=headers)
                response.raise_for_status()

                reponse_json = response.json()
                print(f"Recette '{recette_data['nom']}' créée avec succès ! ID: {reponse_json.get('_id')}")

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