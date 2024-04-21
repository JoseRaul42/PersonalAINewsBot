const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Apply the stealth plugin to avoid being detected as a bot
puppeteer.use(StealthPlugin());

async function scrapeWholeWebpage(url) {
    console.log(`Scraping the webpage: ${url}`);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Attempt to navigate to the page with timeout handling
        await page.goto(url, { waitUntil: 'networkidle0'});

        const pageTitle = await page.title() || "Title not found"; // Default if no title
        const pageText = await page.evaluate(() => document.body.innerText) || "No content available"; // Default if text can't be retrieved
        const links = await page.evaluate(() => 
            Array.from(document.querySelectorAll('a'), a => a.href) || []); // Default to empty array if no links

        console.log(`Data for ${url} has been successfully scraped.`);
        return { title: pageTitle, content: pageText, links };
    } catch (error) {
        console.error(`Error during scraping ${url}:`, error);
        return { title: `Failed to load ${url}`, content: error.message, links: [] }; // Return default error structure
    } finally {
        await browser.close();
    }
}

async function runWholePageScrape() {
    const urls = ['https://apnews.com/', 'https://www.npr.org/', 'https://www.reuters.com/world/'];
    try {
        const results = await Promise.all(urls.map(url => scrapeWholeWebpage(url)));

        const titles = results.map(result => result.title).join(" | ");
        const contents = results.map(result => result.content).join("\n\n\n---\n\n\n");

        const data = {
            titles: titles,
            content: contents
        };

        fs.writeFileSync('C:\\Users\\Afro\\Projects\\JavascriptLMstudioTemplate\\LMstudioConnection\\output.json', JSON.stringify(data, null, 4));
        console.log('Completed scraping all websites. Data has been written to output.json');
    } catch (error) {
        console.error('An error occurred during the scraping process:', error);
    }
}

runWholePageScrape();