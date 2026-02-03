import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam
import os
import numpy as np
from pathlib import Path

print("Creating gender classification model with transfer learning...")

# Create a pre-trained MobileNetV2 model
base_model = MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights='imagenet')

# Freeze the base model weights
base_model.trainable = False

# Create the model architecture
model = Sequential([
    base_model,
    GlobalAveragePooling2D(),
    Dense(256, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')  # Binary classification (Male/Female)
])

# Compile the model
model.compile(
    optimizer=Adam(learning_rate=0.001),
    loss='binary_crossentropy',
    metrics=['accuracy']
)

print("Model architecture created successfully!")
print(model.summary())

# Save the model as HDF5
model_path = os.path.join(os.path.dirname(__file__), 'model', 'gender_model.h5')
model.save(model_path)
print(f"\nModel saved to {model_path}")
print("The model is ready to use!")
print("\nNote: This is a base model. For better accuracy, you should:")
print("1. Collect a gender classification dataset")
print("2. Fine-tune this model with your data using transfer learning")
print("3. The model can accept images and classify them as Male (output > 0.5) or Female (output < 0.5)")
