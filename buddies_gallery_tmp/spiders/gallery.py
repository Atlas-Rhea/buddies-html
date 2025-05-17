import scrapy
import os
from urllib.parse import urljoin, urlparse

class GallerySpider(scrapy.Spider):
    name = "gallery"
    allowed_domains = ["buddiesopen.com"]
    start_urls = ["https://buddiesopen.com/gallery/"]

    def parse(self, response):
        # Find all image URLs on the main gallery page
        image_urls = response.xpath('//img/@src').getall()
        for img_url in image_urls:
            img_url = urljoin(response.url, img_url)
            yield scrapy.Request(img_url, callback=self.save_image, cb_kwargs={'img_url': img_url})

    def save_image(self, response, img_url):
        # Create directory if it doesn't exist
        os.makedirs('assets/gallery', exist_ok=True)
        # Extract image filename
        filename = os.path.basename(urlparse(img_url).path)
        # Save image to the gallery folder
        path = f'assets/gallery/{filename}'
        with open(path, 'wb') as f:
            f.write(response.body)
        self.logger.info(f"Saved {path}") 