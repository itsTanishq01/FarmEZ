import time
import logging
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager  

# Enable detailed logging
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s - %(levelname)s - %(message)s")

def script(state, commodity, market):
    """
    Fetch real-time crop price data from Agmarknet using Selenium.
    """
    try:
        logging.debug(f"Fetching data for {commodity}, {state}, {market}")

        # Setup Selenium WebDriver
        options = webdriver.ChromeOptions()  
        options.add_argument("--headless")  # Run in background (no browser pop-up)
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)

        # Open Agmarknet Search Page
        base_url = "https://agmarknet.gov.in/SearchCmmMkt.aspx"
        driver.get(base_url)
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        logging.debug("Page loaded successfully")

        # **IF Agmarknet Uses an iFrame, Switch to It**
        iframes = driver.find_elements(By.TAG_NAME, "iframe")
        if iframes:
            driver.switch_to.frame(iframes[0])  # Adjust the index if needed
            logging.debug("Switched to iframe")

        # **Wait and Find Commodity Field**
        commodity_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "Tx_Commodity"))  # Change if incorrect
        )
        commodity_input.send_keys(commodity)

        # **Wait and Find State Field**
        state_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "Tx_State"))  # Change if incorrect
        )
        state_input.send_keys(state)

        # **Wait and Find Market Field**
        market_input = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.NAME, "Tx_Market"))  # Change if incorrect
        )
        market_input.send_keys(market)

        # **Click the Search Button**
        search_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.NAME, "btnGo"))  # Change if incorrect
        )
        search_button.click()

        time.sleep(5)  # Allow time for results to load
        logging.debug("Form submitted successfully")

        # Extract price table
        try:
            price_table = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.ID, "cphBody_GridPriceData"))  # Ensure correct ID
            )
        except:
            driver.quit()
            return {"error": "Price table not found"}

        rows = price_table.find_elements(By.TAG_NAME, "tr")

        if len(rows) < 2:
            driver.quit()
            return {"error": "No price data found"}

        # Debug: Print all extracted rows
        extracted_data = []
        for i, row in enumerate(rows):
            cols = row.find_elements(By.TAG_NAME, "td")
            extracted_values = [col.text.strip() for col in cols]
            extracted_data.append(extracted_values)
            logging.debug(f"Row {i}: {extracted_values}")

        # Get modal price from the first data row
        first_row = rows[1].find_elements(By.TAG_NAME, "td")

        # Check if extracted values exist
        if len(first_row) > 5:
            modal_price = first_row[5].text.strip()  # Assuming price is in the 6th column
        else:
            modal_price = "Price not found"

        logging.debug(f"Extracted Price: {modal_price}")

        driver.quit()
        return {
            "commodity": commodity,
            "state": state,
            "market": market,
            "Modal Price": modal_price
        }

    except Exception as e:
        logging.error(f"Error occurred: {e}")
        return {"error": str(e)}

