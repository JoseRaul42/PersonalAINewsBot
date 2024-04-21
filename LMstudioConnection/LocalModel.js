const { LMStudioClient } = require("@lmstudio/sdk");
const fs = require('fs');
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to sanitize string by removing soft hyphens and normalizing
async function sanitizeString(str) {
  // Strip only dangerous characters, retain punctuation
  return str.replace(/[^\w\s.,;!?']/gi, '');
}

// Function to summarize JSON data
async function summarizeData(jsonData) {
  const title = jsonData.title;
  const rawContentLines = jsonData.content.split('\n');

  //console.log("All Content Lines Split:", rawContentLines);

  // Consider expanding the filter criteria to capture more relevant data
  const newsItems = rawContentLines.filter(line => 
    line.includes('ago') || 
    line.includes('LIVE UPDATES') ||
    line.includes('BREAKING')
  );

  //console.log("Filtered News Items:", newsItems);

  const cleanedItems = await Promise.all(newsItems.map(sanitizeString));

  console.log("Sanitized News Items:", cleanedItems);

  const contentSummary = cleanedItems.join('. ');
  const numberOfLinks = jsonData.links.length;

  return {
    title: title,
    contentSummary: contentSummary,
    numberOfLinks: numberOfLinks
  };
}

async function main() {
  try {
    const client = new LMStudioClient();

    // Load model
    const model = await client.llm.load("TheBloke/dolphin-2.2.1-mistral-7B-GGUF/dolphin-2.2.1-mistral-7b.Q6_K.gguf", {noHup: true});

    // Read the JSON data
    const jsonData = JSON.parse(fs.readFileSync('C:\\Users\\Afro\\Projects\\JavascriptLMstudioTemplate\\LMstudioConnection\\output.json', 'utf8'));
    
    //console.log("Full JSON Content:", jsonData.content);

    // Generate summary from the JSON data
    const systemContent = jsonData.content;
    console.log(`Number of characters in the summarized content: ${systemContent.length}`);
    console.log(`\x1b[31mWelcome to your
        ___  _____   _   _                    ______       _
      / _ \\|_   _| | \\ | |                   | ___ \\     | |
     / /_\\ \\ | |   |  \\| | _____      _____  | |_/ / ___ | |_
     |  _  | | |   | . \` |/ _ \\ \\ /\\ / / __| | ___ \\/ _ \\| __|
     | | | |_| |_  | |\\  |  __/\\ V  V /\\__ \\ | |_/ / (_) | |_
     \\_| |_/\\___/  \\_| \\_/\\___| \\_/\\_/ |___/ \\____/ \\___/\\____/\x1b[0m`);
             console.log('Reading the Output.json file with your LMstudio server connection...');
           // console.log(systemContent) test to see what is being out put to the model
    const prediction = await model.respond([
      {role: "system", content: systemContent},
      {role: "user", content: "Your name is AI News Bot!.Your task is to summarize the news that has been scraped off of a news website"}
    ]);

    if (prediction && prediction.content) {
      console.log(`\x1b[31mAI response content: ${prediction.content}\x1b[0m`);
    } else {
      console.error('Error: No content found in the AI response.');
    }

    console.log('Type "exit" to stop or ask another question related to the news articles.');

     // Continue to handle user inputs
        rl.on('line', async (input) => {
            if (input.toLowerCase() === 'exit') {
                console.log('Exiting the AI assistant...');
                rl.close();
            } else {
                try {
                    const followup = await model.respond([
                        { role: "system", content: systemContent }, // Ensure content here matches expected structure
                        { role: "user", content: input }
                    ]);
                    
                    if (followup && followup.content) {
                        console.log(`\x1b[31mAI follow-up response: ${followup.content}\x1b[0m`); // Adjust per actual response structure
                    } else {
                        console.error('Follow-up error: No content found in the AI response.');
                    }
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