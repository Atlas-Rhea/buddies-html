BOT_NAME = "buddies_gallery"

SPIDER_MODULES = ["buddies_gallery.spiders"]
NEWSPIDER_MODULE = "buddies_gallery.spiders"

# Crawl responsibly by identifying yourself (and your website) on the user-agent
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

# Obey robots.txt rules
ROBOTSTXT_OBEY = True

# Configure maximum concurrent requests performing at the same time to the same domain
CONCURRENT_REQUESTS = 1

# Configure a delay for requests for the same website
DOWNLOAD_DELAY = 3

# Enable or disable downloader middlewares
DOWNLOADER_MIDDLEWARES = {
    "scrapy_playwright.middleware.PlaywrightMiddleware": 800,
}

# Configure Playwright settings
DOWNLOAD_HANDLERS = {
    "http": "scrapy_playwright.handler.PlaywrightDownloadHandler",
    "https": "scrapy_playwright.handler.PlaywrightDownloadHandler",
}

TWISTED_REACTOR = "twisted.internet.asyncio.AsyncioSelectorReactor"

PLAYWRIGHT_LAUNCH_OPTIONS = {
    "headless": True,
}

PLAYWRIGHT_DEFAULT_NAVIGATION_TIMEOUT = 60000 