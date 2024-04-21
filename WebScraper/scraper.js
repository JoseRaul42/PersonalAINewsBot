const fs = require('fs');
const puppeteer = require('puppeteer');

async function scrapeNewsWebsite(url, headlineSelectors, summarySelector) {
    console.log('Scraping the news website...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(url);

        // Collect headlines from multiple selectors
        let headlines = [];
        for (const selector of headlineSelectors) {
            await page.waitForSelector(selector); // Ensure the selectors exist on the page
            const result = await page.$$eval(selector, elements => elements.map(element => element.innerText));
            console.log(`Results for selector "${selector}":`, result.length); // Debug output
            headlines = headlines.concat(result);
        }
        console.log("Total headlines collected:", headlines.length); // Debug output
        // Collect summaries from a single selector
        const articles = await page.$$eval(summarySelector, elements => elements.map(element => element.innerText));

        // Preparing and writing data to a JSON file
        const data = JSON.stringify({ headlines, articles });
        fs.writeFileSync(`C:\\Users\\ CHANGE THIS TO YOUR PATH\\JavascriptLMstudioTemplate\\LMstudioConnection\\output.json`, data);
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

//Here You can Customize your search criteria by editing the website and selectors to extract any data you want.
async function runScrape() {
    const url = 'https://aljazeera.com/';
    const headlineSelectors = [
        '#featured-news-container > div > article > div.article-card__liveblog-content.article-card__liveblog-featured-content.u-clickable-card__exclude > a',
        '#featured-news-container > div > article > div.article-card__liveblog-content.article-card__liveblog-featured-content.u-clickable-card__exclude > ul > li:nth-child(1) > div.liveblog-timeline__update-details > a',
        '#featured-news-container > div > article > div.article-card__liveblog-content.article-card__liveblog-featured-content.u-clickable-card__exclude > ul > li:nth-child(5) > div.liveblog-timeline__update-details > a'
    ];
    const articleSelector = '#featured-news-container > div > ul > li:nth-child(1) > article.article-card.article-card-home-page.article-card--medium.article-card--type-post.u-clickable-card.article-card--with-image > div.article-card__content-wrap.article-card__content-wrap--start-image > a';
    await scrapeNewsWebsite(url, headlineSelectors, articleSelector);
}

runScrape();
