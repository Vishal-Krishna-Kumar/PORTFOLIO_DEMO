import numpy as np
from PIL import Image, ImageEnhance, ImageOps
import sys

def generate_dot_art(image_path, output_filename, target_width=150):
    print(f"Processing: {image_path}")

    # =========================================
    # STEP 1: Load & Convert to Black and White
    # =========================================
    # Open the image
    try:
        img_color = Image.open(image_path)
    except FileNotFoundError:
        print(f"Error: Could not find file '{image_path}'")
        return

    # Convert to standard 8-bit Grayscale ('L' mode)
    # This discards all color information immediately.
    img_bw = img_color.convert('L')
    print("- Converted to grayscale (black and white).")

    # =========================================
    # STEP 2: Pre-processing for better dots
    # =========================================
    # Increase contrast slightly to make blacks deeper and whites brighter.
    enhancer = ImageEnhance.Contrast(img_bw)
    img_processed = enhancer.enhance(1.5) # Adjust 1.5 up or down for more/less contrast
    
    # Increase sharpness to define edges (like the glass structure).
    sharpener = ImageEnhance.Sharpness(img_processed)
    img_processed = sharpener.enhance(2.0)
    print("- Enhanced contrast and sharpness.")

    # =========================================
    # STEP 3: Resize for the Braille Grid
    # =========================================
    # Braille characters are a 2x4 grid of dots. They are taller than they are wide.
    # We must adjust the resizing to prevent the image from looking squashed.
    w_orig, h_orig = img_processed.size
    aspect_ratio = h_orig / w_orig
    
    # The 0.55 multiplier corrects for the height of text lines in most editors.
    target_height = int(target_width * aspect_ratio * 0.55)
    
    # We resize to the exact number of *dots* we need (width*2, height*4)
    # Using LANCZOS filter for high-quality downscaling.
    img_resized = img_processed.resize((target_width * 2, target_height * 4), Image.Resampling.LANCZOS)
    print(f"- Resized to a dot grid of {target_width*2}x{target_height*4}.")


    # =========================================
    # STEP 4: Dithering (Grayscale to Pure Dots)
    # =========================================
    # This is the secret to "perfect" shading. It uses math to decide if a pixel
    # should be a dot or empty space based on its gray level and its neighbors.
    print("- Applying Floyd-Steinberg dithering (creating the dots)...")
    
    # Convert image to numpy array of floats (0.0 to 1.0) for calculation
    pixels = np.array(img_resized, dtype=float) / 255.0
    height, width = pixels.shape
    
    for y in range(height):
        for x in range(width):
            old_val = pixels[y, x]
            # Decide: is it closer to black (0.0) or white (1.0)?
            new_val = 1.0 if old_val > 0.5 else 0.0
            pixels[y, x] = new_val
            
            # Calculate the "error" (how much shade we lost)
            error = old_val - new_val
            
            # Spread error to neighboring pixels (Floyd-Steinberg weights)
            if x + 1 < width:
                pixels[y, x + 1] += error * 0.4375 # 7/16
            if (y + 1 < height) and (x - 1 >= 0):
                pixels[y + 1, x - 1] += error * 0.1875 # 3/16
            if y + 1 < height:
                pixels[y + 1, x] += error * 0.3125 # 5/16
            if (y + 1 < height) and (x + 1 < width):
                pixels[y + 1, x + 1] += error * 0.0625 # 1/16

    # Final binary grid: 1 means put a dot here, 0 means empty space.
    # We invert it because in Braille unicode, a '1' bit means a raised dot.
    dot_grid = 1 - (pixels > 0.5).astype(int)


    # =========================================
    # STEP 5: Convert Dots to Braille Characters
    # =========================================
    print("- Mapping dots to Braille text characters...")
    output_text = ""
    
    # Braille Unicode dot mapping values
    # [1, 8]
    # [2, 16]
    # [4, 32]
    # [64, 128]
    braille_map = np.array([
        [1, 8],
        [2, 16],
        [4, 32],
        [64, 128]
    ])

    # Iterate over the grid in 4x2 blocks
    for y in range(0, height, 4):
        line = ""
        for x in range(0, width, 2):
            # Grab a 4x2 block of our dot grid
            # We use min() to handle edge cases at the bottom/right of image
            chunk = dot_grid[y:min(y+4, height), x:min(x+2, width)]
            
            # Pad with zeros if we are at the very edge and don't have a full 4x2 block
            if chunk.shape != (4, 2):
                padded_chunk = np.zeros((4, 2), dtype=int)
                padded_chunk[:chunk.shape[0], :chunk.shape[1]] = chunk
                chunk = padded_chunk
            
            # Multiply the chunk by the map and sum to get Unicode offset
            braille_val = np.sum(chunk * braille_map)
            
            # Base Braille unicode character is 0x2800
            line += chr(0x2800 + braille_val)
        output_text += line + "\n"

    # Save to file using UTF-8 encoding to support Braille chars
    with open(output_filename, "w", encoding="utf-8") as f:
        f.write(output_text)
    
    print(f"\nDone! Result saved to: {output_filename}")
    print("Open the text file and ZOOM OUT to see the image clearly.")


# =========================================
# EXECUTION START
# =========================================
# Change this to your exact image filename
my_image = 'img-1.jpg'

# target_width=150 is a good high-detail size.
# Try 100 for smaller, 200 for huge detail.
generate_dot_art(my_image, "final_dot_art.txt", target_width=150)