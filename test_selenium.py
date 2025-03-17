import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager  

# Setup Selenium WebDriver
options = webdriver.ChromeOptions()  
options.add_argument("--headless")  # Run in background (no browser pop-up)
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=options)

# Open Agmarknet Search Page
base_url = "https://agmarknet.gov.in/SearchCmmMkt.aspx"
driver.get(base_url)
time.sleep(5)  # Wait for JavaScript to load data

print("✅ Selenium Successfully Opened Agmarknet!")

driver.quit()

