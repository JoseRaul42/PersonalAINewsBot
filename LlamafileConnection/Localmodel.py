import json
import re
import asyncio
from aioconsole import ainput
import aiohttp

BASE_URL = "http://127.0.0.1:8080/v1/chat/completions"

def sanitize_string(string):
    return re.sub(r'[^\w\s.,;!?\'"]', '', string)

async def generate_summary(session, json_content, user_input=None):
    messages = [
        {"role": "system", "content": json_content},
        {"role": "user", "content": "You are an AI News Bot Designed to help me digest large chunks of information in a few major key points. Summarize the text with the key points in this format. EXAMPLE 'The text provides updates on various global events, including:'"}
    ]
    if user_input:
        messages.append({"role": "user", "content": user_input})

    payload = {
        "model": "Meta-Llama-3-8B-Instruct-Q6_K.gguf",
        "stream": True,
        "messages": messages
    }
    headers = {"Content-Type": "application/json", "Accept": "text/event-stream"}

    full_response_content = []

    async with session.post(BASE_URL, json=payload, headers=headers) as response:
        try:
            if response.headers.get('Content-Type') == 'text/event-stream':
                async for line in response.content:
                    if line.strip():
                        json_data = json.loads(line.decode().split("data: ", 1)[1])  # Parsing the streamed JSON object
                        content = json_data.get("choices", [{}])[0].get("delta", {}).get("content", "")
                        full_response_content.append(content)
            return ''.join(full_response_content)  # Join all content parts into a single string
        except Exception as e:
            print(f"Unexpected error occurred while handling the stream: {e}")
            return None

async def main():
    async with aiohttp.ClientSession() as session:
        system_content = "Initial system content here"
        user_input = None
        print("Reading the Output.json file with your LLamafile server connection...")
        summary = await generate_summary(session, system_content, user_input)
        if summary:
            print(f"AI response content: {summary}")
        else:
            print('Error: No content found in the AI response.')

        while True:
            user_input = await ainput("Type 'exit' to stop or ask another question: ")
            if user_input.lower() == 'exit':
                print('Exiting the AI assistant...')
                break

            follow_up_response = await generate_summary(session, system_content, user_input)
            if follow_up_response:
                print(f"AI follow-up response: {follow_up_response}")
            else:
                print('Follow-up error: No content found in the AI response.')

if __name__ == '__main__':
    asyncio.run(main())
