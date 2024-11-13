import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

gemini_api_key = os.getenv("GOOGLE_API_KEY")
if not gemini_api_key:
    print("Gemini API key not found in .env file.")
    exit(1)

genai.configure(api_key=gemini_api_key)

def analyze_and_score_employee_logs(log_file_path, output_file_path):
    try:
        with open(log_file_path, "r") as file:
            logs = file.readlines()

        employee_scores = {}

        for i, line in enumerate(logs):
            if "Author:" in line:
                author = line.split("Author:")[1].split("|")[0].strip()

                pr_details = "".join(logs[i:i+5])  

                prompt = f"""
                Rate the coder's commits in this repository based on the following pull request details:

                {pr_details}

                Score the performance on a scale from 1 to 10. Consider the following factors:
                - Code quality and adherence to best practices.
                - Problem complexity and the significance of the changes.
                - Review feedback and comments from reviewers.
                - Testing coverage and the overall impact of the PR on the project.

                Please provide the score and any additional insights.
                """

                model = genai.GenerativeModel('gemini-1.5-flash')
                response = model.generate_content([prompt])

                if response and 'text' in response:
                    score_text = response['text']
                    try:
                        score = float(score_text.split("Score:")[1].strip())  
                    except (IndexError, ValueError):
                        score = 0 

                    employee_scores[author] = employee_scores.get(author, 0) + score
                else:
                    print(f"Error processing PR for {author}: {response}")

        with open(output_file_path, "w") as output_file:
            for author, score in employee_scores.items():
                output_file.write(f"Employee: {author} | Total Score: {score}\n")

        print(f"Results have been written to {output_file_path}")

    except Exception as e:
        print(f"Error processing log file: {e}")


analyze_and_score_employee_logs("pr_logs_detailed2.txt", "employee_scores.txt")
