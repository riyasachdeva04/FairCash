from github import Github

# Authenticate with a GitHub token
g = Github("your_github_token")

# Get the repository
repo = g.get_repo("owner/repo_name")

# Get all commits
commits = repo.get_commits()
for commit in commits:
    print(commit.committer.name, commit.commit.message)

# Get all pull requests
prs = repo.get_pull_requests(state='all')
for pr in prs:
    print(pr.title, pr.user.login)
