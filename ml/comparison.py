import pandas as pd
import re

# Read the CSV file (employees data)
employees_df = pd.read_csv('salary/employees2.csv')

# Read the response.txt file, which contains predicted salaries
with open('salary/results.txt', 'r') as f:
    response_text = f.read()

# Parse the response text to extract predicted salaries
# Extract each employee's name and their predicted salary range
predicted_salaries = {}

# We need to extract the name and salary range from the text
# Updated format: "Anjali Patel (Network Engineer): 10-12 Lakhs"
pattern = r"([A-Za-z\s\.]+)\s\([^)]+\):\s(\d+)-(\d+)\sLakhs"

matches = re.findall(pattern, response_text)

# Create a dictionary with names and their predicted salary ranges
for match in matches:
    name = match[0].strip()
    min_salary = int(match[1]) * 10000  # Convert Lakhs to actual value
    max_salary = int(match[2]) * 10000  # Convert Lakhs to actual value
    predicted_salaries[name] = [min_salary, max_salary]

# Convert predicted salaries to DataFrame for easier comparison
predicted_salaries_df = pd.DataFrame.from_dict(predicted_salaries, orient='index', columns=["Predicted Salary Min", "Predicted Salary Max"])

# Merge the employees data with the predicted salary data
merged_df = pd.merge(employees_df, predicted_salaries_df, left_on='Name', right_index=True, how='left')

# Calculate percentage difference between actual and predicted salaries
def calculate_percentage_diff(row):
    # Calculate the midpoint of the predicted salary range
    predicted_salary_mid = (row["Predicted Salary Min"] + row["Predicted Salary Max"]) / 2
    if predicted_salary_mid != 0:
        return ((row["Salary"] - predicted_salary_mid) / predicted_salary_mid) * 100
    else:
        return 0

# Add the percentage difference column
merged_df["Percentage Difference"] = merged_df.apply(calculate_percentage_diff, axis=1)

# Display the final DataFrame
print(merged_df[['Name', 'Salary', 'Predicted Salary Min', 'Predicted Salary Max', 'Percentage Difference']])
merged_df = merged_df.drop(['Designation', 'No. of Working Days', 'GitHub ID', 'Projects Worked On', 'No. of Working Hours', 'Resume Link', 'Resume ATS', 'GitHub ATS', 'Peer Review Score', 'No. of Years Experience', 'No. of Years Working', 'Avg. Salary of Developer on Designation', 'Quality1', 'Quality2', 'Quality3', 'Quality4', 'Quality5'], axis=1)
merged_df.to_csv('comparison_results.csv', index=False)