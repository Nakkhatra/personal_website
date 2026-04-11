---
description: "Initialize git repo with main branch and first commit"
---

# Bootstrap Workflow

Initialize a new git repository with a main branch and first commit.

## 1. Check current state
```bash
git branch --list main
git log --oneline -1
```

If main already exists with commits, skip to step 4.
If main exists but has no commits, go to step 2.
If main doesn't exist, create it:
```bash
git checkout -b main
```
If already on an orphan main (no commits yet), just continue.

## 2. Stage initial files
Add all files for the initial commit. Exclude:
- `.env`, credentials, secrets
- `node_modules`, `dist/`, build artifacts
- Large binaries

```bash
git add <file1> <file2> ...
```

## 3. Make first commit
A branch doesn't truly exist in git until it has at least one commit.
```bash
git commit -m "chore: initial commit"
```

## 4. Verify main exists
```bash
git rev-parse --verify main
git log --oneline -1 main
```

Both must succeed. If not, something went wrong — diagnose before continuing.

Main branch now exists. You can use `/add-and-commit` for future changes.
