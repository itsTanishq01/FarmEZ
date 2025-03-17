import requests
import logging

# Enable logging for debugging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

# 🔹 Replace YOUR_API_KEY with your actual API key from Data.gov.in
API_KEY = "579b464db66ec23bdd0000011d9ae4520bf347124af0751ddc1b6b93"
API_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070"

def get_crop_price(state, commodity, market):
    """
    Fetch real-time crop price data using the Data.gov.in API.
    """
    try:
        logging.debug(f"Fetching data for {commodity}, {state}, {market}")

        # Construct API request URL
        params = {
            "api-key": API_KEY,
            "format": "json",
            "filters[commodity]": commodity,
            "filters[state]": state,
            "filters[district]": market  # Assuming "market" is the district
        }

        response = requests.get(API_URL, params=params)

        # Handle API errors
        if response.status_code != 200:
            logging.error(f"API Error: {response.status_code}")
            return {"error": f"API request failed with status code {response.status_code}"}

        data = response.json()

        # 🔹 Print full API response for debugging
        logging.debug(f"API Response: {data}")

        # Extract the latest modal price
        if "records" in data and len(data["records"]) > 0:
            latest_entry = data["records"][0]  # Assuming the latest price is the first entry
            modal_price = latest_entry.get("modal_price", "Not Available")
        else:
            return {"error": "No price data found in API response"}

        logging.debug(f"Extracted Price: {modal_price}")

        return {
            "commodity": commodity,
            "state": state,
            "market": market,
            "Modal Price": modal_price
        }

    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return {"error": str(e)}

