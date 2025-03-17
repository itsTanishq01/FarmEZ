import requests
from rasa_sdk import Action
from rasa_sdk.events import SlotSet

class ActionGetWeather(Action):
    def name(self):  
        return "action_get_weather"

    def run(self, dispatcher, tracker, domain):
        # Get user location from slots
        city = tracker.get_slot("location")

        if not city:
            dispatcher.utter_message(text="Please specify a location to get the weather forecast.")
            return []

        # Call Open-Meteo API (Geolocation Service for Latitude/Longitude)
        geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1"
        geo_response = requests.get(geo_url).json()

        if "results" not in geo_response or len(geo_response["results"]) == 0:
            dispatcher.utter_message(text="Sorry, I couldn't find the location. Please try again.")
            return []

        latitude = geo_response["results"][0]["latitude"]
        longitude = geo_response["results"][0]["longitude"]

        # Call Open-Meteo Weather API
        weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true"
        response = requests.get(weather_url).json()

        if "current_weather" in response:
            temperature = response["current_weather"]["temperature"]
            wind_speed = response["current_weather"]["windspeed"]
            condition_code = response["current_weather"]["weathercode"]

            weather_conditions = {
                0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy",
                3: "Overcast", 45: "Fog", 48: "Rime fog",
                51: "Light drizzle", 53: "Moderate drizzle", 55: "Heavy drizzle",
                61: "Light rain", 63: "Moderate rain", 65: "Heavy rain",
                80: "Light showers", 81: "Moderate showers", 82: "Heavy showers"
            }
            weather_description = weather_conditions.get(condition_code, "Unknown weather condition")

            message = f"The weather in {city} is {weather_description}, with a temperature of {temperature}°C and wind speed of {wind_speed} km/h."
        else:
            message = "Could not fetch weather data."

        dispatcher.utter_message(text=message)
        return [SlotSet("location", city)]

class ActionGetPestRisk(Action):
    def name(self):
        return "action_get_pest_risk"

    def run(self, dispatcher, tracker, domain):
        city = tracker.get_slot("location")

        if not city:
            dispatcher.utter_message(text="Please provide a location for pest risk analysis.")
            return []

        # Get weather data from Open-Meteo API
        geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1"
        geo_response = requests.get(geo_url).json()

        if "results" in geo_response and len(geo_response["results"]) > 0:
            latitude = geo_response["results"][0]["latitude"]
            longitude = geo_response["results"][0]["longitude"]

            weather_url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true"
            response = requests.get(weather_url).json()

            if "current_weather" in response:
                temperature = response["current_weather"]["temperature"]
                wind_speed = response["current_weather"]["windspeed"]

                # Simple logic: If temperature is high and wind is low, higher pest risk
                if temperature > 30 and wind_speed < 10:
                    risk = "High"
                elif 20 <= temperature <= 30:
                    risk = "Medium"
                else:
                    risk = "Low"

                message = f"The pest risk in {city} is {risk} based on current weather conditions."
            else:
                message = "Could not fetch weather data to analyze pest risk."

        else:
            message = "Invalid location. Please try again."

        dispatcher.utter_message(text=message)
        return [SlotSet("location", city)]

class ActionGetCropPrices(Action):
    def name(self):
        return "action_get_crop_prices"

    def run(self, dispatcher, tracker, domain):
        crop_name = tracker.get_slot("crop")

        # Extract crop name from user input if slot is empty
        if not crop_name:
            for entity in tracker.latest_message["entities"]:
                if entity["entity"] == "crop":
                    crop_name = entity["value"]
                    break

        if not crop_name:
            dispatcher.utter_message(text="I couldn't detect the crop name. Please specify it again.")
            return []

        # Placeholder API for crop prices (Replace with real API if available)
        API_URL = f"https://api.agmarknet.gov.in/crop_prices?crop={crop_name}"

        try:
            response = requests.get(API_URL)
            if response.status_code == 200:
                data = response.json()
                if "price" in data:
                    price = data["price"]
                    message = f"The latest market price of {crop_name} is ₹{price} per quintal."
                else:
                    message = "Sorry, I couldn't find the latest price for that crop."
            else:
                message = "Error fetching crop prices. Please try again later."
        
        except Exception as e:
            message = f"An error occurred while fetching prices: {str(e)}"

        dispatcher.utter_message(text=message)
        return [SlotSet("crop", crop_name)]

