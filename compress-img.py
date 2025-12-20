import os
from PIL import Image

INPUT_DIR = "images/Mandat/Groupe1/"
OUTPUT_DIR = "images/Mandat/Groupe/"

# Création du dossier de sortie si inexistant
os.makedirs(OUTPUT_DIR, exist_ok=True)

QUALITY = 70       # Qualité de compression
MAX_SIZE = 600     # Taille max en pixels (largeur ou hauteur)

for filename in os.listdir(INPUT_DIR):
    if filename.lower().endswith((".jpg", ".jpeg", ".png")):
        filepath = os.path.join(INPUT_DIR, filename)
        with Image.open(filepath) as img:
            img = img.convert("RGB")

            # Redimensionnement si l’image est trop grande
            img.thumbnail((MAX_SIZE, MAX_SIZE))

            new_filename = os.path.splitext(filename)[0] + ".webp"
            output_path = os.path.join(OUTPUT_DIR, new_filename)

            img.save(output_path, "WEBP", quality=QUALITY)
            print(f"✅ {filename} → {new_filename}")
