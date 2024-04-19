const fs = require('fs');
const puppeteer = require('puppeteer');

async function scrapeNewsWebsite(url, headlineSelector, summarySelector) {
    // Launch a new browser instance
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the desired URL
    await page.goto(url);

    // Extract the headlines and summaries using provided selectors
    const headlines = await page.$$eval(headlineSelector, elements => elements.map(element => element.innerText));
    const summaries = await page.$$eval(summarySelector, elements => elements.map(element => element.innerText));

    // Close the browser instance
    await browser.close();

    // Prepare data to write to a file
    const data = JSON.stringify({ headlines, summaries });

    // Write data to a JSON file
    fs.writeFileSync('output.json', data);

    console.log('Data has been written to output.json');
}

async function runScrape() {
    const url = 'https://aljazeera.com/';
    const headlineSelector = '#featured-news-container > div > article > div.article-card__liveblog-content.article-card__liveblog-featured-content.u-clickable-card__exclude > a';
    const summarySelector = '#featured-news-container > div > ul > li:nth-child(1) > article.article-card.article-card-home-page.article-card--medium.article-card--type-post.u-clickable-card.article-card--with-image > div.article-card__content-wrap.article-card__content-wrap--start-image > a';
    await scrapeNewsWebsite(url, headlineSelector, summarySelector);
}

runScrape();