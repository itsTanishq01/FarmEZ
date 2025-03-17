import requests

latitude = 28.7041  # Example: Delhi
longitude = 77.1025

url = f"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true"

response = requests.get(url).json()
temperature = response["current_weather"]["temperature"]
wind_speed = response["current_weather"]["windspeed"]
weather_code = response["current_weather"]["weathercode"]

print(f"Temperature: {temperature}°C, Wind Speed: {wind_speed} km/h, Weather Code: {weather_code}")
