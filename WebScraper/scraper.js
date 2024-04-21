const fs = require('fs');
const puppeteer = require('puppeteer');

async function scrapeWholeWebpage(url) {
    console.log('Scraping the entire webpage for text content and links...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Get the page title
        const pageTitle = await page.title();
        
        // Extracting text from the body of the webpage
        const pageText = await page.evaluate(() => document.body.innerText);

        // Extracting all href links from the page
        const links = await page.evaluate(() => {
            const anchorElements = Array.from(document.querySelectorAll('a'));
            return anchorElements.map(element => element.href).filter(href => href);
        });

        // Preparing and writing data to a JSON file
        const data = JSON.stringify({ title: pageTitle, content: pageText, links });
        fs.writeFileSync('C:\\Users\\Afro\\Projects\\JavascriptLMstudioTemplate\\LMstudioConnection\\output.json', data);
        console.log('Data has been written to output.json');
    } catch (error) {
        console.error('Error during scraping:', error);
    } finally {
        // Clean-up
        await browser.close();
        cleanupAndExit();
    }
}

function cleanupAndExit() {
    console.log('Exiting the script...');
    process.exit();
}

// Customize your specific webpage here
async function runWholePageScrape() {
    const url = 'https://www.nytimes.com/';
    await scrapeWholeWebpage(url);
}

runWholePageScrape();