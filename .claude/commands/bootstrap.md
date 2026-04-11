---
description: "Initialize git repo with main branch and first commit"
---

# Bootstrap Workflow

Initialize a new git repository with a main branch and first commit.

## 1. Create main branch
```bash
git checkout -b main
```

## 2. Stage initial files
Add all files for the initial commit. Exclude:
- `.env`, credentials, secrets
- `node_modules`, `dist/`, build artifacts
- Large binaries

```bash
git add <files>
```

## 3. Make first commit
```bash
git commit -m "chore: initial commit"
```

## 4. Ready to use /add-and-commit
Main branch now exists. You can use `/add-and-commit` for future changes.
