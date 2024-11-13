import google.generativeai as genai
import pandas as pd
import os

gemini_api_key = os.getenv("GOOGLE_API_KEY")
# if not gemini_api_key:
#     print("Gemini API key not found in .env file.")
#     exit(1)

genai.configure(api_key="AIzaSyAUBJk3naFh_SJF1S2mzZbpjpQ4zSAoRtc")

df = pd.read_csv('employees2.csv')

df_features = df.drop(columns=['Salary'])

data_json = df_features.to_json(orient='records')

model = genai.GenerativeModel('gemini-1.5-flash')

prompt = f"Predict the rough salary for each employee based on their attributes: {data_json}. This is data of an Indian Series B tech startup, backed by YC. Assume missing information according to market standards of tech market 2024. Give rough estimates only."
response = model.generate_content([prompt])


if response:
    print("Predictions:", response.text)
    with open('results.txt', 'w') as file:
        file.write(response.text)
else:
    print("Error in prediction")
