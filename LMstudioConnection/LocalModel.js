const { LMStudioClient } = require("@lmstudio/sdk");
const fs = require('fs');
const readline = require('readline');



// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function sanitizeString(str) {
    // Replace U+00AD (soft hyphen) with an empty string
    return str.replace(/\u00AD/g, '').normalize();
}

async function summarizeData(jsonData) {
    const cleanedHeadlines = await Promise.all(jsonData.headlines.map(sanitizeString));
    const cleanedArticles = await Promise.all(jsonData.articles.map(sanitizeString));

    const articles = {
        totalHeadlines: cleanedHeadlines.length,
        topHeadline: cleanedHeadlines[0],
        totalarticles: cleanedArticles.length,
        toparticles: cleanedArticles[0]
    };
    return `articles: Number of Headlines[ ${articles.totalHeadlines} ], Top headline: "${articles.topHeadline}".
    Number of articles [${articles.totalarticles}], top articles: "${articles.toparticles}".`;
}

async function main() {
    try {
        const client = new LMStudioClient();
        const model = await client.llm.load("TheBloke/dolphin-2.2.1-mistral-7B-GGUF/dolphin-2.2.1-mistral-7b.Q6_K.gguf", {
            noHup: true
        });

        // Read and summarize the JSON data
        const jsonData = JSON.parse(fs.readFileSync('C:\\Users\\Afro\\Projects\\JavascriptLMstudioTemplate\\LMstudioConnection\\output.json', 'utf8'));
        const systemContent = await summarizeData(jsonData);

        // Print the prepared articles to the console
        console.log(systemContent);
        console.log(`\x1b[31mWelcome to your
   ___  _____   _   _                    ______       _
 / _ \\|_   _| | \\ | |                   | ___ \\     | |
/ /_\\ \\ | |   |  \\| | _____      _____  | |_/ / ___ | |_
|  _  | | |   | . \` |/ _ \\ \\ /\\ / / __| | ___ \\/ _ \\| __|
| | | |_| |_  | |\\  |  __/\\ V  V /\\__ \\ | |_/ / (_) | |_
\\_| |_/\\___/  \\_| \\_/\\___| \\_/\\_/ |___/ \\____/ \\___/\x1b[0m`);

        console.log('Reading the Output.json file with your LMstudio server connection...');
        // Automatically ask the model to give a brief from the provided articles
        const inputPrompt = "Try to detect bias in the overall sentiment of the news articles, and where.";
        const prediction = model.respond([
            { role: "system", content: systemContent },
            { role: "user", content: inputPrompt }
        ]);

        let fullResponse = "";
        for await (const text of prediction) {
            fullResponse += text;
        }
        console.log(`\x1b[31mAI response: ${fullResponse}\x1b[0m`);
        console.log('Type "exit" to stop or ask another question related to the news articles.');

        // Continue to handle user inputs
        rl.on('line', async (input) => {
            if (input.toLowerCase() === 'exit') {
                console.log('Exiting the AI assistant...');
                rl.close();
            } else {
                try {
                    const followup = await model.respond([
                        { role: "system", content: systemContent },
                        { role: "user", content: input }
                    ]);
                    let followupResponse = followup.text || JSON.stringify(followup); // Adjust according to your model's response structure
                    console.log(`AI response: ${followupResponse}`);
                    console.log('Type "exit" to stop or ask another question.');
                } catch (error) {
                    console.error('Error handling follow-up:', error);
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        rl.close();
    }
}

main();