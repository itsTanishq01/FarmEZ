from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io

# Initialize FastAPI app
app = FastAPI()

# Enable CORS to allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
MODEL_PATH = r"C:\\Users\\prana\\OneDrive\\Desktop\\BitsHack\\fastapi-backend\\crop_disease_model.h5"  # Make sure this path is correct!
model = load_model(MODEL_PATH)

# Class labels (Ensure this order matches your training)
class_labels = [
    "Tomato___healthy",  
    "Tomato___Tomato_mosaic_virus",  
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus",  
    "Tomato___Target_Spot",  
    "Tomato___Spider_mites_Two-spotted_spider_mite",  
    "Tomato___Septoria_leaf_spot",  
    "Tomato___Leaf_Mold",  
    "Tomato___Late_blight",  
    "Tomato___Early_blight",  
    "Tomato___Bacterial_spot",  
    "Strawberry___healthy",  
    "Strawberry___Leaf_scorch",  
    "Squash___Powdery_mildew",  
    "Soybean___healthy",  
    "Raspberry___healthy",  
    "Potato___healthy",  
    "Potato___Late_blight",  
    "Potato___Early_blight",  
    "Pepper,_bell___healthy",  
    "Pepper,_bell___Bacterial_spot",  
    "Peach___healthy",  
    "Peach___Bacterial_spot",  
    "Orange___Haunglongbing_(Citrus_greening)",  
    "Grape___healthy",  
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",  
    "Grape___Esca_(Black_Measles)",  
    "Grape___Black_rot",  
    "Corn_(maize)___healthy",  
    "Corn_(maize)___Northern_Leaf_Blight",  
    "Corn_(maize)___Common_rust_",  
    "Corn_(maize)___Cercospora_leaf_spot_Gray_Leaf_Spot",  
    "Cherry_(including_sour)___healthy",  
    "Cherry_(including_sour)___Powdery_mildew",  
    "Blueberry___healthy",  
    "Apple___healthy",
    "Apple___Cedar_apple_rust",  
    "Apple___Black_rot",  
    "Apple___Apple_scab",
]

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read the uploaded image
        contents = await file.read()
        img = Image.open(io.BytesIO(contents))

        # Save received image for debugging
        img.save("debug_received_image.jpg")

        # Preprocess image: Resize & Normalize
        img = img.resize((224, 224))  # Ensure this matches training image size
        img_array = np.array(img) / 255.0  # Normalize pixel values
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        # Debugging: Check Image Shape
        print("✅ Processed Image Shape:", img_array.shape)

        # Model Prediction
        prediction = model.predict(img_array)
        print("🔍 Model Raw Output:", prediction)  # Debugging model output

        # Get the predicted class
        predicted_class_index = np.argmax(prediction)
        predicted_class = class_labels[predicted_class_index]
        confidence = float(np.max(prediction))

        return {"class": predicted_class, "confidence": confidence}

    except Exception as e:
        return {"error": str(e)}

# Root endpoint
@app.get("/")
def home():
    return {"message": "Crop Disease Prediction API is running!"}
