# Webscraper and Local LLM

This application serves as a template for creating a web scraper using Puppeteer in JavaScript. It retrieves headlines and summaries from AlJazeera news site and outputs the data in JSON format to a file named `output.json`. The script utilizes the `LocalModel.js` file to feed the output.json file to a local LLM model hosted through a LMStudio local server instance.

## Overview

- Puppeteer-based web scraper
- Retrieves headlines and summaries from AlJazeera news site
- Outputs data in JSON format to `output.json`
- Uses `LocalModel.js` to feed `output.json` to a local LLM model
- User only needs to adjust the model name, URL, and element selectors

## Requirements

- Node.js
- Puppeteer
- LMStudio local server instance (optional)

## Usage

1. Clone or download this repository to your local machine.
2. Install dependencies by running `npm install` in the project directory.
3. Open `LocalModel.js` and adjust the model name, URL, and element selectors as per your needs.
4. Run the script using `node Scraper.js` within the Webscraper folder. The output will be saved to `output.json`.
5. If you're using a local LLM model hosted through LMStudio, provide the appropriate endpoint URL in the `LocalModel.js` file before switching to the LMstudioConnection folder and running Node `LocalModel.js` .
6. Monitor the `output.json` file for updates and feed it to your local LLM model as needed.

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.
