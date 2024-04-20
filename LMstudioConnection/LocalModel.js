const { LMStudioClient } = require("@lmstudio/sdk");
const fs = require('fs');
const readline = require('readline');


console.log('Reading the Output.json file with your local lmstudio server...');
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
    const cleanedSummaries = await Promise.all(jsonData.summaries.map(sanitizeString));

    const summary = {
        totalHeadlines: cleanedHeadlines.length,
        topHeadline: cleanedHeadlines[0],
        totalSummaries: cleanedSummaries.length,
        topSummary: cleanedSummaries[0]
    };
    return `Summary: Number of Headlines[ ${summary.totalHeadlines} ], Top headline: "${summary.topHeadline}".
    Number of summaries [${summary.totalSummaries}], top summary: "${summary.topSummary}".`;
}

async function main() {
    try {
        const client = new LMStudioClient();
        const model = await client.llm.load("TheBloke/OpenHermes-2.5-Mistral-7B-GGUF/openhermes-2.5-mistral-7b.Q6_K.gguf", {
            noHup: true
        });

        // Read and summarize the JSON data
        const jsonData = JSON.parse(fs.readFileSync('output.json', 'utf8'));
        const systemContent = await summarizeData(jsonData);

        // Print the prepared summary to the console
        console.log(systemContent);
        console.log('Welcome!');
        console.log('Summarizing the top news for you...');

        // Automatically ask the model to give a brief from the provided summary
        const inputPrompt = "Give a brief summary";
        const prediction = model.respond([
            { role: "system", content: systemContent },
            { role: "user", content: inputPrompt }
        ]);

        let fullResponse = "";
        for await (const text of prediction) {
            fullResponse += text;
        }
        console.log(`AI response: ${fullResponse}`);
        console.log('Type "exit" to stop or ask another question related to the news summary.');

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