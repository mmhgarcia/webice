import os
from PIL import Image

INPUT_FOLDER = "input"
OUTPUT_FOLDER = "outputs"

# Tamaños recomendados
SIZES = {
    "large": 800,   # para vista principal
    "small": 400    # para thumbnails / grid
}

def ensure_folders():
    for folder in SIZES.keys():
        os.makedirs(os.path.join(OUTPUT_FOLDER, folder), exist_ok=True)

def is_image_file(filename):
    ext = filename.lower().split('.')[-1]
    return ext in ["jpg", "jpeg", "png", "webp", "bmp"]

def resize_image(img: Image.Image, target_width: int):
    """Mantiene proporción automáticamente."""
    w, h = img.size
    scale = target_width / float(w)
    new_height = int(h * scale)
    return img.resize((target_width, new_height), Image.LANCZOS)

def process_images():
    ensure_folders()

    for filename in os.listdir(INPUT_FOLDER):
        if not is_image_file(filename):
            continue

        input_path = os.path.join(INPUT_FOLDER, filename)

        try:
            img = Image.open(input_path).convert("RGB")
        except Exception as e:
            print(f"❌ Error abriendo {filename}: {e}")
            continue

        base_name = os.path.splitext(filename)[0]

        for folder, width in SIZES.items():
            resized = resize_image(img, width)

            output_path = os.path.join(
                OUTPUT_FOLDER,
                folder,
                f"{base_name}_{width}.webp"
            )

            try:
                resized.save(output_path, "WEBP", quality=90, method=6)
                print(f"✔ {filename} → {folder}/{base_name}_{width}.webp")
            except Exception as e:
                print(f"❌ Error guardando {output_path}: {e}")

if __name__ == "__main__":
    process_images()
