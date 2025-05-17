from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains
from pathlib import Path
import re
import time
import requests
from bs4 import BeautifulSoup
from collections import defaultdict
import json
from datetime import datetime

GALLERY_URL = "https://buddiesopen.com/gallery/"
START_YEAR = 2024
END_YEAR = 2002

def clean_image_url(url):
    # Extract the base URL without any size parameters or scaling
    base_match = re.search(r'https://(?:wp-modula\.b-cdn\.net/spai/[^/]+/)?(?:https://)?buddiesopen\.com/wp-content/uploads/(\d{4}/\d{2}/[^.]+)\.([^?\s]+)', url)
    if base_match:
        # Clean up the filename by removing any size parameters
        filename = base_match.group(1)
        # Remove any size specifications (e.g., -300x225, -scaled)
        filename = re.sub(r'-(?:\d+x\d+|scaled(?:-\d+x\d+)?)', '', filename)
        # Handle numbered filenames (e.g., 001-4, 001-10)
        if re.match(r'^[\d-]+$', filename.split('/')[-1]):
            # Keep the full numbered filename
            pass
        elif '-' in filename:
            # For other filenames with hyphens, keep meaningful parts
            parts = filename.split('-')
            base = parts[0]
            # Keep additional parts that aren't size specifications
            meaningful_parts = [p for p in parts[1:] if not re.match(r'^\d+x\d+$', p) and p != 'scaled']
            if meaningful_parts:
                filename = f"{base}-{'-'.join(meaningful_parts)}"
            else:
                filename = base
        return f"https://buddiesopen.com/wp-content/uploads/{filename}.{base_match.group(2)}"
    return url

def extract_year(url):
    # Try to extract year from URL path or filename
    year_match = re.search(r'[/-](\d{4})[/-]', url)
    if year_match:
        year = year_match.group(1)
        if 2002 <= int(year) <= 2024:
            return year
    return None

def get_images_from_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    images = set()
    
    # Find all img tags
    for img in soup.find_all('img'):
        src = img.get('src', '')
        if src and ('buddiesopen.com' in src or src.startswith('/wp-content')):
            if src.startswith('/'):
                src = f"https://buddiesopen.com{src}"
            images.add(src)
            
    # Find images in background-image styles
    for elem in soup.find_all(style=True):
        style = elem['style']
        if 'background-image' in style:
            matches = re.findall(r'url\([\'"]?(.*?)[\'"]?\)', style)
            for src in matches:
                if 'buddiesopen.com' in src or src.startswith('/wp-content'):
                    if src.startswith('/'):
                        src = f"https://buddiesopen.com{src}"
                    images.add(src)
                    
    # Find images in JSON data
    for script in soup.find_all('script', type='application/json'):
        try:
            data = json.loads(script.string)
            if isinstance(data, dict):
                json_str = json.dumps(data)
                matches = re.findall(r'https://buddiesopen\.com[^"\']+\.(jpg|jpeg|png|gif)', json_str)
                images.update(f"https://buddiesopen.com{m[0]}" if m[0].startswith('/') else m[0] for m in matches)
        except:
            pass
            
    return list(images)

def get_wayback_urls(url, year):
    try:
        wayback_url = f"https://web.archive.org/web/timemap/json?url={url}&matchType=prefix&collapse=urlkey&output=json&fl=original,timestamp,mimetype&filter=statuscode:200&filter=mimetype:text/html&from={year}0101&to={year}1231"
        response = requests.get(wayback_url)
        if response.status_code == 200:
            data = response.json()
            return [f"https://web.archive.org/web/{item[1]}/{item[0]}" for item in data[1:]]  # Skip header row
    except Exception as e:
        print(f"Error getting wayback URLs: {str(e)}")
    return []

def get_year_urls(year_str):
    return [
        f"https://buddiesopen.com/gallery/{year_str}/",
        f"https://buddiesopen.com/gallery/{year_str}",
        f"https://buddiesopen.com/gallery/?year={year_str}",
        f"https://buddiesopen.com/gallery/category/{year_str}/",
        f"https://buddiesopen.com/gallery/tag/{year_str}/",
        f"https://buddiesopen.com/wp-json/wp/v2/media?per_page=100&search={year_str}",
        f"https://buddiesopen.com/gallery/archive/{year_str}/",
        f"https://buddiesopen.com/gallery/buddies-open-{year_str}/",
        f"https://buddiesopen.com/gallery/buddies-{year_str}/",
        f"https://buddiesopen.com/gallery/{year_str}-tournament/",
        f"https://buddiesopen.com/gallery/{year_str}-gallery/",
        f"https://buddiesopen.com/wp-content/uploads/{year_str}/",
        f"https://buddiesopen.com/gallery/buddies-{year_str}-tournament/",
        f"https://buddiesopen.com/gallery/buddies-{year_str}-gallery/",
        f"https://buddiesopen.com/gallery/buddies-open-{year_str}-tournament/",
        f"https://buddiesopen.com/gallery/buddies-open-{year_str}-gallery/",
        f"https://buddiesopen.com/gallery/buddies-{year_str}-photos/",
        f"https://buddiesopen.com/gallery/buddies-{year_str}-photos/",
        f"https://buddiesopen.com/gallery/buddies-open-{year_str}-photos/",
        f"https://buddiesopen.com/gallery/{year_str}-photos/",
        f"https://buddiesopen.com/gallery/photos-{year_str}/",
        f"https://buddiesopen.com/gallery/tournament-{year_str}/",
        f"https://buddiesopen.com/gallery/buddies-tournament-{year_str}/",
        f"https://buddiesopen.com/gallery/buddies-open-tournament-{year_str}/"
    ]

def get_images_from_url(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            return get_images_from_html(response.text)
    except Exception as e:
        print(f"Error accessing {url}: {str(e)}")
    return []

def setup_driver():
    options = webdriver.ChromeOptions()
    # Run in non-headless mode for debugging
    # options.add_argument('--headless')  # Commented out for visual debugging
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    # Use webdriver_manager to get the correct ChromeDriver
    service = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=service, options=options)

def scroll_gallery_section(driver, section_selector):
    last_count = 0
    for _ in range(10):  # Try scrolling up to 10 times
        section = driver.find_element(By.CSS_SELECTOR, section_selector)
        images = section.find_elements(By.TAG_NAME, 'img')
        driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", section)
        time.sleep(1.5)  # Wait for images to load
        new_count = len(section.find_elements(By.TAG_NAME, 'img'))
        if new_count == last_count:
            break  # No new images loaded
        last_count = new_count

def get_images_for_year(driver, year):
    year_links = driver.find_elements(By.CSS_SELECTOR, ".modula_menu__link[data-filter]")
    print(f"  Year links found: {[link.get_attribute('data-filter') for link in year_links]}")
    for attempt in range(3):
        try:
            year_link = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, f".modula_menu__link[data-filter='{year}']"))
            )
            print(f"    Outer HTML for year {year}: {year_link.get_attribute('outerHTML')}")
            if 'selected' in year_link.get_attribute('class'):
                print(f"    Year {year} is already selected, skipping click.")
            else:
                ActionChains(driver).move_to_element(year_link).pause(0.5).click(year_link).perform()
                time.sleep(1)
            # Instead of looking for a section, select all .modula-item.jtg-filter-YYYY elements
            item_selector = f".modula-item.jtg-filter-{year}"
            print(f"    Looking for items: {item_selector}")
            scroll_gallery_section(driver, ".modula-items")  # Scroll the main gallery container
            soup = BeautifulSoup(driver.page_source, 'html.parser')
            items = soup.select(item_selector)
            print(f"    Found {len(items)} items for year {year}.")
            imgs = []
            for item in items:
                imgs.extend(item.find_all('img'))
            print(f"    Found {len(imgs)} <img> tags in items for year {year}.")
            for i, img in enumerate(imgs[:3]):
                print(f"      img[{i}]: {str(img)[:200]}{'...' if len(str(img)) > 200 else ''}")
            images = []
            data_full_count = 0
            for img in imgs:
                url = img.get('data-full') or img.get('src')
                if img.get('data-full'):
                    data_full_count += 1
                if url:
                    images.append(url)
            print(f"    Found {len(images)} images, {data_full_count} with data-full attribute.")
            return images
        except Exception as e:
            print(f"    Attempt {attempt+1} failed for year {year}: {e}")
            screenshot_path = f"screenshot_{year}_attempt{attempt+1}.png"
            driver.save_screenshot(screenshot_path)
            print(f"    Screenshot saved to {screenshot_path}")
            time.sleep(2)
    print(f"    All attempts failed for year {year}.")
    return []

def main():
    driver = setup_driver()
    driver.get(GALLERY_URL)
    print("Waiting 5 seconds for initial page load...")
    time.sleep(5)  # Longer wait for initial JS load
    all_images = {}
    for year in range(START_YEAR, END_YEAR - 1, -1):
        print(f"Processing {year}...")
        try:
            images = get_images_for_year(driver, year)
            print(f"  Found {len(images)} images.")
            all_images[year] = images
        except Exception as e:
            print(f"  Error for {year}: {e}")
            all_images[year] = []
    driver.quit()
    # Write to markdown
    with open('buddies-gallery-hotlinks.md', 'w', encoding='utf-8') as f:
        f.write('# Buddies Open Gallery Images\n\n')
        for year in range(START_YEAR, END_YEAR - 1, -1):
            f.write(f'\n## {year}\n')
            if all_images[year]:
                for url in all_images[year]:
                    f.write(f'- {url}\n')
            else:
                f.write('No images found.\n')

if __name__ == "__main__":
    main()