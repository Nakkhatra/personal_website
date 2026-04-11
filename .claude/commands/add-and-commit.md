---
description: "Git add only necessary files, commit in new branch, create PR to main with Copilot reviewer"
---

# Add and Commit Workflow

You are performing a git workflow. Follow these steps exactly:

## 1. Check main branch exists
```bash
git rev-parse --verify main
```
If this fails: main branch doesn't exist. Tell the user to run `/bootstrap` first. Stop.

## 2. Sync with remote (if remote exists)
```bash
git remote get-url origin
```
If a remote exists, pull:
```bash
git pull origin main --rebase
```
If no remote, skip this step.

## 3. Analyze changes
Run `git status` and `git diff` to understand what changed. Identify ONLY the files that are necessary for this change. Exclude:
- `.env`, credentials, secrets
- Build artifacts, node_modules, dist/
- Unrelated files that were accidentally modified
- Large binaries unless explicitly part of the change

## 4. Create a branch
```bash
git checkout -b <type>/<short-description>
```
Types: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

Use the change context to pick a descriptive branch name. Keep it under 50 chars.

## 5. Stage only necessary files
Add files one by one or by specific path. NEVER use `git add .` or `git add -A`.
```bash
git add <file1> <file2> ...
```

## 6. Commit
Write a concise commit message. Focus on WHY, not WHAT.
```bash
git commit -m "<type>: <description>"
```

## 7. Push and create PR
```bash
git push -u origin HEAD
```

Then create a PR to main:
```bash
gh pr create --base main --title "<concise title>" --body "$(cat <<'EOF'
## Summary
<bullet points of what changed and why>

## Test Plan
<how to verify this works>

---
EOF
)" --reviewer "github-actions[bot]"
```

After PR creation, add GitHub Copilot as reviewer:
```bash
gh pr edit <PR_NUMBER> --add-reviewer @copilot
```

## 8. Report back
Show the PR URL and a one-line summary of what was committed.
