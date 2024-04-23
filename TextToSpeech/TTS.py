import torch
from parler_tts import ParlerTTSForConditionalGeneration
from transformers import AutoTokenizer
import soundfile as sf

device = "cuda:0" if torch.cuda.is_available() else "cpu"

model = ParlerTTSForConditionalGeneration.from_pretrained("parler-tts/parler_tts_mini_v0.1").to(device)
tokenizer = AutoTokenizer.from_pretrained("parler-tts/parler_tts_mini_v0.1")

prompt = """AI response content: Sure, I'd be happy to help you summarize the text! Here are the key points:
* The article provides updates on various global events, including:
        + The conflict between Israel and Iran, with Israel launching airstrikes against Iranian targets in Syria and Lebanon. (para 1)
        + The ongoing violence in Gaza between Israeli forces and Palestinian militants, which has resulted in the deaths of six people. (para 2)
        + The recent explosion at an Iraq military base, which killed several people and injured many more. (para 3)
        + The political situation in Ukraine, where President Volodymyr Zelenskyy has expressed gratitude for a $60.8 billion aid package approved by the US House of Representatives. (para 4)
        + The potential impact of climate change on Sudan's health system, which is already crippled by conflict. (para 5)
        + The recent flooding in China, where heavy rainfall has caused widespread damage and displacement. (para 6)

I hope that helps! Let me know if you have any other questions."""
description = "speaks clearly"

input_ids = tokenizer(description, return_tensors="pt").input_ids.to(device)
prompt_input_ids = tokenizer(prompt, return_tensors="pt").input_ids.to(device)

generation = model.generate(input_ids=input_ids, prompt_input_ids=prompt_input_ids)
audio_arr = generation.cpu().numpy().squeeze()
sf.write("parler_tts_out.wav", audio_arr, model.config.sampling_rate)
