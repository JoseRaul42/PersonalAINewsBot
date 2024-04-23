const { LMStudioClient } = require("@lmstudio/sdk");
const fs = require('fs');
const readline = require('readline');
const nlp = require('compromise');  // Import compromise
const Tokenizer = require('nlp-tokenizer');
const stopword = require('stopword');  // Import the stopword module
var natural = require("natural"); 

// Setup reading line interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function main() {
  try {
      const client = new LMStudioClient();
      const model = await client.llm.load("lmstudio-community/Meta-Llama-3-8B-Instruct-GGUF/Meta-Llama-3-8B-Instruct-Q5_K_M.gguf");
      
      console.log("Reading the RawData.json file");
      // Read the JSON data
      const jsonData = JSON.parse(fs.readFileSync('C:\\Users\\Afro\\Projects\\JavascriptLMstudioTemplate\\LMstudioConnection\\RawData.json', 'utf8'));
  
      // Apply NLP processing using compromise
      const doc = nlp(jsonData.content);
      doc.normalize(); // normalize the text
  
      // Ensure we're passing a string to the tokenizer
      let rawText = doc.text() || ''; // Ensure there's a default empty string if nothing is returned
      //console.log("rawText"+ rawText);
      const tokenizer = new natural.WordTokenizer(); // Instantiate the tokenizer

      // rawText = rawText.replace(/,/g, '');
     // console.log("tokenizer" + tokenizer.tokenize(rawText))
      let tokens = tokenizer.tokenize(rawText)

    
      // Remove stopwords, ensuring all tokens are valid strings
      const filteredTokens = stopword.removeStopwords(tokens); // Use the stopword module to filter tokens
  
  
      // Rebuild the text with cleaned tokens
      const systemContent = filteredTokens.join('').toLowerCase();
      // TESTING PURPOconsole.log("SYS prompt"+systemContent);

  

    // Generate summary from the JSON data
    console.log(`\x1b[31mWelcome to your
        ___  _____   _   _                    ______       _
      / _ \\|_   _| | \\ | |                   | ___ \\     | |
     / /_\\ \\ | |   |  \\| | _____      _____  | |_/ / ___ | |_
     |  _  | | |   | . \` |/ _ \\ \\ /\\ / / __| | ___ \\/ _ \\| __|
     | | | |_| |_  | |\\  |  __/\\ V  V /\\__ \\ | |_/ / (_) | |_
     \\_| |_/\\___/  \\_| \\_/\\___| \\_/\\_/ |___/ \\____/ \\___/\\____/ By Jose Raul Valois\x1b[0m`);
             console.log()
             console.log(`Number of characters in the summarized content: ${systemContent.length}`);
      console.log(`Waiting on response from LMstudio`);

      const prediction = await model.respond([
          { role: "system", content: systemContent },
          { role: "user", content: "You are an AI News Bot Designed to help me digest large chunks of information in a few major key points. Identify major news events as key events in this format.EXAMPLE 'The text provides updates on various global events, including:[summarized key points of data]+[Cited Source]+[Date]'" }
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