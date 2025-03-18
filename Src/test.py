from fastapi import FastAPI
import joblib
import pandas as pd
from pydantic import BaseModel

app = FastAPI()

model = joblib.load("Crop.pkl")

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

@app.post("/predict_crop/")
def predict_crop(features: SoilFeatures):
    data = pd.DataFrame([features.dict()])
    predicted_crop = model.predict(data)[0]
    return {"Recommended_Crop": predicted_crop}
