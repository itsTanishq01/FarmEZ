import os
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.efficientnet import preprocess_input

# Function to check if a file is an image
def is_image_file(filename):
    return filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif', '.jfif'))

# Function to load and preprocess an image
def load_and_preprocess_image(image_path):
    try:
        with Image.open(image_path) as img:
            img = img.convert('RGB')  # Ensure image is in RGB format
            img = img.resize((224, 224))  # Resize to match EfficientNetB0 input size
            img_array = np.array(img)
            img_array = preprocess_input(img_array)  # Apply EfficientNet preprocessing
            img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
            return img_array
    except Exception as e:
        print(f"Error loading image: {image_path}, {e}")
        return None

# Function to predict the class of an image
def predict_image(model_path, image_path, label_map):
    if not os.path.exists(model_path):
        print("Error: Model file not found!")
        return
    
    if not os.path.isfile(image_path) or not is_image_file(image_path):
        print("Error: Invalid image file!")
        return

    # Load the trained model
    model = load_model(model_path)
    
    # Load and preprocess the image
    img_array = load_and_preprocess_image(image_path)
    if img_array is None:
        return
    
    # Make prediction
    predictions = model.predict(img_array)
    
    # Convert predictions to class label
    class_labels = list(label_map.keys())
    predicted_label = class_labels[np.argmax(predictions)]
    
    print(f"Predicted class: {predicted_label}")

if __name__ == "__main__":
    # Path to the trained model
    model_path = r"C:\Users\prana\Downloads\crop_disease_model.h5"
    
    # Dictionary mapping labels (same used during training)
    label_map = {
        "Tomato___healthy":0,  
        "Tomato___Tomato_mosaic_virus":1,  
        "Tomato___Tomato_Yellow_Leaf_Curl_Virus":2,  
        "Tomato___Target_Spot":3,  
        "Tomato___Spider_mites_Two-spotted_spider_mite":4,  
        "Tomato___Septoria_leaf_spot":5,  
        "Tomato___Leaf_Mold":6,  
        "Tomato___Late_blight":7,  
        "Tomato___Early_blight":8,  
        "Tomato___Bacterial_spot":9,  
        "Strawberry___healthy":10,  
        "Strawberry___Leaf_scorch":11,  
        "Squash___Powdery_mildew":12,  
        "Soybean___healthy":13,  
        "Raspberry___healthy":14,  
        "Potato___healthy":15,  
        "Potato___Late_blight":16,  
        "Potato___Early_blight":17,  
        "Pepper,_bell___healthy":18,  
        "Pepper,_bell___Bacterial_spot":19,  
        "Peach___healthy":20,  
        "Peach___Bacterial_spot":21,  
        "Orange___Haunglongbing_(Citrus_greening)":22,  
        "Grape___healthy":23,  
        "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)":24,  
        "Grape___Esca_(Black_Measles)":25,  
        "Grape___Black_rot":26,  
        "Corn_(maize)___healthy":27,  
        "Corn_(maize)___Northern_Leaf_Blight":28,  
        "Corn_(maize)___Common_rust_":29,  
        "Corn_(maize)___Cercospora_leaf_spot_Gray_Leaf_Spot":30,  
        "Cherry_(including_sour)___healthy":31,  
        "Cherry_(including_sour)___Powdery_mildew":32,  
        "Blueberry___healthy":33,  
        "Apple___healthy":34,  
        "Apple___Cedar_apple_rust":35,  
        "Apple___Black_rot":36,  
        "Apple___Apple_scab":37,  
        # Add all class labels here (ensure they match training data)
    }

    # Path to user-provided image (change as needed)
    image_path = r"C:\Users\prana\Downloads\appleleafmuld.jpeg"

    # Predict the class of the image
    predict_image(model_path, image_path, label_map)
