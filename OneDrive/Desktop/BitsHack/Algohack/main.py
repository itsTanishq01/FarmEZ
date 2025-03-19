import os
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.applications.efficientnet import EfficientNetB0, preprocess_input
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split

# Function to check if a file is an image
def is_image_file(filename):
    return filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif', '.jfif'))

# Function to load and preprocess images
def load_image(image_path):
    try:
        with Image.open(image_path) as img:
            img = img.convert('RGB')  # Ensure image is in RGB format
            img = img.resize((224, 224))  # Resize to match EfficientNetB0 input size
            img_array = np.array(img)
            return img_array
    except Exception as e:
        print(f"Error loading image: {image_path}, {e}")
        return None

# Function to load data from directories (for training)
# Function to load data from directories (for training)
def load_data_from_dirs(data_dir):
    images = []
    labels = []
    label_map = {}
    idx = 0
    
    print(f"Loading data from: {data_dir}")
    
    for label in os.listdir(data_dir):
        label_dir = os.path.join(data_dir, label)
        
        if os.path.isdir(label_dir):
            label_map[label] = idx
            idx += 1
            
            for img_file in os.listdir(label_dir):
                img_path = os.path.join(label_dir, img_file)
                
                if not os.path.isfile(img_path) or not is_image_file(img_file):
                    print(f"Skipping non-file or non-image: {img_path}")
                    continue
                
                img = load_image(img_path)
                if img is None:
                    continue
                
                img = preprocess_input(img)
                images.append(img)
                labels.append(label_map[label])
    
    print("Detected classes:", label_map.keys())
    return np.array(images), np.array(labels), label_map


# Function to load data from images only (for testing)
def load_data_from_images(image_dir):
    images = []
    
    print(f"Loading data from: {image_dir}")
    
    for img_file in os.listdir(image_dir):
        img_path = os.path.join(image_dir, img_file)
        
        if not os.path.isfile(img_path) or not is_image_file(img_file):
            print(f"Skipping non-file or non-image: {img_path}")
            continue
        
        img = load_image(img_path)
        if img is None:
            continue
        
        img = preprocess_input(img)
        images.append(img)
    
    return np.array(images)

# Function to build the model
def build_model(num_classes):
    base_model = EfficientNetB0(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
    
    model = Sequential([
        base_model,
        GlobalAveragePooling2D(),
        Dense(num_classes, activation='softmax')
    ])
    
    model.compile(optimizer=Adam(), loss='categorical_crossentropy', metrics=['accuracy'])
    return model

# Main function to train the model and make predictions
def main(train_dir, test_dir):
    # Load training data
    X_train, y_train, label_map = load_data_from_dirs(train_dir)
    num_classes = len(label_map)
    
    # Print label map for debugging
    print("Training label map:", label_map)
    
    # Ensure labels are within the range of num_classes
    assert np.max(y_train) < num_classes, "Labels exceed number of classes"
    
    # Convert labels to one-hot encoding
    y_train = to_categorical(y_train, num_classes=num_classes)
    
    # Split the training data into training and validation sets
    X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.2, random_state=42)
    
    # Build and train the model
    model = build_model(num_classes)
    
    print("Training the model...")
    model.fit(X_train, y_train, epochs=10, batch_size=32, validation_data=(X_val, y_val))
    
    # Save the model
    model.save('crop_disease_model.h5')
    print("Model saved as 'crop_disease_model.h5'")
    
    # Load the test data
    X_test = load_data_from_images(test_dir)
    
    # Predict on test data
    predictions = model.predict(X_test)
    
    # Convert predictions to class labels
    class_labels = list(label_map.keys())
    predicted_labels = [class_labels[np.argmax(pred)] for pred in predictions]
    
    print("Predictions:", predicted_labels)

if __name__ == "__main__":
    # Enter the paths to your training and test image directories here
    train_dir =r'C:\Users\prana\Downloads\model_data\better\New Plant Diseases Dataset(Augmented)\New Plant Diseases Dataset(Augmented)\train'
    test_dir =r'C:\Users\prana\Downloads\model_data\better\test\test'
    
    main(train_dir, test_dir)