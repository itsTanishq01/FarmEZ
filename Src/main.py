from fastapi import FastAPI
import joblib
import pandas as pd
from pydantic import BaseModel

app = FastAPI()

crop_model = joblib.load("Crop.pkl")
soil_health_model = joblib.load("Soil.pkl")

class SoilFeatures(BaseModel):
    Soil_Moisture_: float
    Bulk_Density_g_cm3: float
    Porosity_: float
    Water_Holding_Capacity_: float
    pH_Level: float
    Electrical_Conductivity_dS_m: float
    Organic_Carbon_: float
    Nitrogen_mg_kg: float
    Phosphorus_mg_kg: float
    Potassium_mg_kg: float
    Sulfur_mg_kg: float
    Calcium_mg_kg: float
    Magnesium_mg_kg: float
    Temperature_C: float
    Rainfall_mm: float
    Humidity_: float
    Solar_Radiation_W_m2: float

@app.post("/predict/")
def predict(features: SoilFeatures):
    data = pd.DataFrame([features.dict()])
    
    soil_health_score = soil_health_model.predict(data)[0]
    recommended_crop = crop_model.predict(data)[0]
    
    return {"Soil_Health_Score": soil_health_score, "Recommended_Crop": recommended_crop}