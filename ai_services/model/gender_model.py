import tensorflow as tf
from tensorflow.keras.models import load_model
import cv2
import numpy as np
import os
import sys

# Load trained model with error handling
model = None

def load_model_safe():
    global model
    model_path = os.path.join(os.path.dirname(__file__), "gender_model.h5")
    
    if not os.path.exists(model_path):
        print(f"Error: Model file not found at {model_path}")
        return False
    
    try:
        model = load_model(model_path, compile=False)
        print("Model loaded successfully")
        return True
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return False

# Lazy load the model
if not load_model_safe():
    print("Warning: Could not load model. Predictions will not work.")

def predict_gender(image_path):
    if model is None:
        raise RuntimeError("Model not loaded. Cannot make predictions.")
    
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Could not read image from {image_path}")
    
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.reshape(img, (1, 224, 224, 3))

    prediction = model.predict(img)[0][0]

    if prediction > 0.5:
        return "Male"
    else:
        return "Female"

# Also add a predict function that works with image bytes (for FastAPI)
def predict(image_bytes):
    if model is None:
        raise RuntimeError("Model not loaded. Cannot make predictions.")
    
    import io
    from PIL import Image
    
    # Convert bytes to image
    image = Image.open(io.BytesIO(image_bytes))
    img = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = np.reshape(img, (1, 224, 224, 3))

    prediction = model.predict(img)[0][0]

    if prediction > 0.5:
        return "Male"
    else:
        return "Female"

# Only run if this file is executed directly
if __name__ == "__main__":
    image_path = sys.argv[1]
    result = predict_gender(image_path)
    print(result)
