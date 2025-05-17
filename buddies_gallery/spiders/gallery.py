import scrapy
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from pathlib import Path
import re
import time

class GallerySpider(scrapy.Spider):
    name = 'gallery'
    start_urls = ['https://buddiesopen.com/gallery/']
    
    def __init__(self, *args, **kwargs):
        super(GallerySpider, self).__init__(*args, **kwargs)
        # Initialize Chrome WebDriver
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service)
    
    def parse(self, response):
        # Use Selenium to get the page
        self.driver.get(response.url)
        
        # Wait for images to load
        WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "img"))
        )
        
        # Scroll to bottom to load all images
        last_height = self.driver.execute_script("return document.body.scrollHeight")
        while True:
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)  # Wait for new content to load
            new_height = self.driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height
        
        # Get all images
        images = self.driver.find_elements(By.TAG_NAME, "img")
        
        # Dictionary to store images by year
        images_by_year = {}
        
        for img in images:
            src = img.get_attribute('src')
            if not src:
                continue
                
            # Extract year from image URL or path
            year_match = re.search(r'/(\d{4})/', src)
            if year_match:
                year = year_match.group(1)
                if year not in images_by_year:
                    images_by_year[year] = []
                images_by_year[year].append(src)
        
        # Write to markdown file
        output_file = Path('buddies-gallery-hotlinks.md')
        with output_file.open('w', encoding='utf-8') as f:
            # Sort years in descending order
            for year in sorted(images_by_year.keys(), reverse=True):
                f.write(f'## {year}\n')
                for img_url in images_by_year[year]:
                    f.write(f'![](https://wp-modula.b-cdn.net/spai/q_lossless,ret_img/{img_url})\n')
                f.write('\n')
        
        self.driver.quit() 