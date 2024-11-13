import pandas as pd
df = pd.read_csv("comparison_results.csv")
# print(df)
female_df = df[df["Gender"] == "Female"]
average_percent_difference = female_df["Percentage Difference"].mean()

print(average_percent_difference)