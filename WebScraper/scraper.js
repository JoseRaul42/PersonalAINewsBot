const fs = require('fs');
const puppeteer = require('puppeteer');

async function scrapeNewsWebsite(url, headlineSelector, summarySelector) {
    // Outputting initial scraping log
    console.log('Scraping the news website...');

    // Launching a new browser instance 
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigating to the desired URL and extracting data
    await page.goto(url);
    const headlines = await page.$$eval(headlineSelector, elements => elements.map(element => element.innerText));
    const summaries = await page.$$eval(summarySelector, elements => elements.map(element => element.innerText));

    // Closing the browser instance once tasks are complete
    await browser.close();

    // Preparing and writing data to a JSON file
    const data = JSON.stringify({ headlines, summaries });
    fs.writeFileSync(`C:\\Users\\Afro\\Projects\\JavascriptLMstudioTemplate\\LMstudioConnection\\output.json`, data);
    console.log('Data has been written to output.json');

    // Ensuring the process exits cleanly
    cleanupAndExit();
}

function cleanupAndExit() {
    console.log('Exiting the script...');
    // Perform any cleanup here if necessary, then exit
    // For example, closing database connections or clearing temporary files
    process.exit();
}

async function runScrape() {
    const url = 'https://aljazeera.com/';
    const headlineSelector = '#featured-news-container > div > article > div.article-card__liveblog-content.article-card__liveblog-featured-content.u-clickable-card__exclude > a';
    const summarySelector = '#featured-news-container > div > ul > li:nth-child(1) > article.article-card.article-card-home-page.article-card--medium.article-card--type-post.u-clickable-card.article-card--with-image > div.article-card__content-wrap.article-card__content-wrap--start-image > a';
    await scrapeNewsWebsite(url, headlineSelector, summarySelector);
}

runScrape();