# AI News Bot: Web Scraper & Local LLM

Welcome to AI News Bot! This project is a web scraper and local LLM (Language Model) tool designed to help you extract headlines and articles from news websites and detect possible biases in the content.

## Tech Stack

The following technologies are used in this project:

- **JavaScript**: JavaScript is used for web scraping and sending results to the local server via Puppeteer library.
- **LMStudio**: LMStudio is an open-source platform that helps you create and manage local LLMs (Language Models). It's used here to establish a connection between the local model and our application.
- **Python**: Python serves as the main programming language for executing scripts and coordinating all the components of this project. The main script is named `main.py`.

## How It Works

1. The web scraper, implemented in JavaScript using Puppeteer library, retrieves headlines and articles from a news website based on selectors specified in the `scraper.js` file.
2. The scraped data is then outputted to a JSON file named `output.json`.
3. The `localmodel.js` file uses this output JSON to establish a connection with a local LLM model (hosted through LMStudio local server instance) and passes in the web scraper results for analysis.
4. The LLM model attempts to detect bias in the headline articles by processing the data from the JSON file.
5. The results are then presented to you for further analysis or use in your research or projects.

## Getting Started

To get started with AI News Bot, follow these steps:

1. Install the necessary dependencies by running `pip install -r requirements.txt` in your terminal or command prompt.
2. Set up LMStudio according to the official [installation guide](https://lmstudio.readthedocs.io/en/latest/getting_started.html). Make sure you have a local LLM model ready for use with the application.
3. Run the main script by executing `python main.py`. This will initiate the web scraper, which will extract headlines and articles from your selected news website and process them through the local LLM model to detect possible biases.
4. The results will be displayed on the terminal or command prompt, where you can analyze them according to your needs.

## Contributing

If you'd like to contribute to AI News Bot, feel free to submit pull requests or open an issue on GitHub. We welcome any improvements or bug fixes that can enhance the project.

For more information about how to contribute, check out our [Contributing Guidelines](https://github.com/your-username/ai-news-bot/blob/main/CONTRIBUTING.md).