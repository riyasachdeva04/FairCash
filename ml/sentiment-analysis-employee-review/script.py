import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

gemini_api_key = os.getenv("GOOGLE_API_KEY")
if not gemini_api_key:
    print("Gemini API key not found in .env file.")
    exit(1)

genai.configure(api_key=gemini_api_key)

def analyze_and_score_employee_logs(role, log_file_path, output_file_path):
    try:
        with open(log_file_path, "r") as file:
            reviews = file.readlines()

        employee_descriptions = {}


        prompt = f"Extract 5 key terms that describe the employee based on the review for their role as {role}. Review: {reviews}"

        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content([prompt])

        if response and 'text' in response:
            description_text = response['text']
            print(f"Model response for review : {description_text}")

            terms = description_text.strip().split('\n')
            if len(terms) >= 5:
                employee_descriptions = terms[:5] 

        else:
            print(f"Error processing review : {response}")

        with open(output_file_path, 'w') as output_file:
            # for review_id, description in employee_descriptions.items():
            output_file.write(f"{description_text}")

        print(f"Results have been written to {output_file_path}")

    except Exception as e:
        print(f"Error processing log file: {e}")


analyze_and_score_employee_logs("data scientist", "reviews.txt", "review_result.txt")
