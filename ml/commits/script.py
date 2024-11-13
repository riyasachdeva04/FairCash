import os
from github import Github
from dotenv import load_dotenv

load_dotenv()
token = os.getenv("GITHUB_TOKEN")

if not token:
    print("GitHub token not found in .env file.")
    exit(1)

g = Github(token)

employee_usernames = [
    "texasmichelle", "Conchylicultor", "alimuldal", "Molugan", "huxiaoxu2019", "ddsh", "osanseviero",
    "jrruijli", "kkenealy", "JasperSnoek", "andsteing", "saugenst", "fabianp", "mtthss"
]

repos = [
    "google-deepmind/gemma", "google-deepmind/optax", "google-deepmind/mujoco"
]

def collect_pr_logs():
    with open("pr_logs_detailed.txt", "w") as file: 
        for repo_name in repos:
            try:
                file.write(f"Fetching repo: {repo_name}\n")
                repo = g.get_repo(repo_name)
                prs = repo.get_pulls(state='all') 
                
                for pr in prs:
                    if pr.user.login in employee_usernames:
                        file.write(f"Repo: {repo_name} | PR Title: {pr.title} | Author: {pr.user.login} | Status: {pr.state}\n")
                        file.write(f"Created at: {pr.created_at} | Merged at: {pr.merged_at}\n")
                        file.write(f"Additions: {pr.additions} | Deletions: {pr.deletions} | Changed Files: {pr.changed_files}\n")
                        file.write(f"Comments: {pr.comments} | Review Comments: {pr.review_comments}\n")
                        file.write(f"Diff URL: {pr.diff_url}\n") 
                        file.write(f"Test Information: {pr.labels}\n") 
                        file.write(f"Impact Description: {pr.body}\n") 
                        file.write(f"URL: {pr.html_url}\n")
                        file.write("-" * 80 + "\n")

            except Exception as e:
                file.write(f"Error accessing repo {repo_name}: {e}\n")

collect_pr_logs()

