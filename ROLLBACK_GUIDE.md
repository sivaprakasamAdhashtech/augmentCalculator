# 🔄 Rollback Checkpoints Guide

## Current Project Status
- ✅ **Git Repository**: Initialized
- ✅ **Initial Commit**: `5465bbb` - React Calculator with dual display feature
- ✅ **Current Branch**: `master`

## 📋 How to Check Rollback Checkpoints

### 1. Git Commit History
```bash
# View all commits (detailed)
git log

# View commits in one line
git log --oneline

# View commits with graph
git log --graph --oneline --all

# View last 5 commits
git log -5

# View commits by author
git log --author="Your Name"

# View commits in date range
git log --since="2025-05-29" --until="2025-05-30"
```

### 2. Current Available Checkpoints
```bash
# Check current commit
git show HEAD

# Check previous commits
git show HEAD~1  # 1 commit back
git show HEAD~2  # 2 commits back

# Check specific commit
git show 5465bbb
```

### 3. Branch Information
```bash
# List all branches
git branch -a

# Check current branch
git branch

# Check remote branches
git branch -r
```

## 🔄 How to Create New Checkpoints

### 1. Stage and Commit Changes
```bash
# Check what files have changed
git status

# Add specific files
git add src/components/Calculator.jsx

# Add all changes
git add .

# Commit with message
git commit -m "Add new feature: Memory functions"

# Commit with detailed message
git commit -m "Feature: Add memory functions

- Add M+, M-, MR, MC buttons
- Implement memory state management
- Update button grid layout
- Add memory indicator in display"
```

### 2. Create Tagged Checkpoints
```bash
# Create a tag for important versions
git tag -a v1.0 -m "Version 1.0: Basic calculator with dual display"
git tag -a v1.1 -m "Version 1.1: Added keyboard support"

# List all tags
git tag

# View tag details
git show v1.0
```

## ⏪ How to Rollback to Checkpoints

### 1. Soft Rollback (Keep Changes)
```bash
# Go back 1 commit but keep changes in working directory
git reset --soft HEAD~1

# Go back to specific commit (keep changes)
git reset --soft 5465bbb
```

### 2. Mixed Rollback (Default)
```bash
# Go back 1 commit, unstage changes but keep in working directory
git reset HEAD~1

# Go back to specific commit
git reset 5465bbb
```

### 3. Hard Rollback (Discard Changes)
```bash
# ⚠️ WARNING: This will permanently delete changes
git reset --hard HEAD~1

# Go back to specific commit (discard all changes)
git reset --hard 5465bbb
```

### 4. Create New Branch from Checkpoint
```bash
# Create branch from specific commit
git checkout -b feature-branch 5465bbb

# Create branch from tag
git checkout -b hotfix-branch v1.0
```

### 5. Revert Specific Commits
```bash
# Revert a specific commit (creates new commit)
git revert 5465bbb

# Revert multiple commits
git revert HEAD~3..HEAD
```

## 📊 Checkpoint Management Best Practices

### 1. Meaningful Commit Messages
```bash
# Good examples:
git commit -m "Fix: Division by zero error handling"
git commit -m "Feature: Add scientific calculator mode"
git commit -m "Style: Update button hover animations"
git commit -m "Refactor: Extract calculation logic to separate module"

# Bad examples:
git commit -m "fix"
git commit -m "update"
git commit -m "changes"
```

### 2. Frequent Checkpoints
```bash
# Create checkpoints for:
- Each new feature completion
- Before major refactoring
- After bug fixes
- Before experimenting with new code
- At end of each work session
```

### 3. Branching Strategy
```bash
# Create feature branches
git checkout -b feature/memory-functions
git checkout -b feature/scientific-mode
git checkout -b bugfix/display-overflow

# Merge back to main
git checkout master
git merge feature/memory-functions
```

## 🛠️ Advanced Checkpoint Commands

### 1. Interactive Rebase
```bash
# Edit last 3 commits
git rebase -i HEAD~3

# Options: pick, reword, edit, squash, drop
```

### 2. Stash Changes
```bash
# Save current changes temporarily
git stash

# List stashes
git stash list

# Apply stash
git stash apply

# Apply specific stash
git stash apply stash@{1}

# Drop stash
git stash drop
```

### 3. Cherry Pick
```bash
# Apply specific commit to current branch
git cherry-pick 5465bbb

# Apply multiple commits
git cherry-pick commit1 commit2
```

## 📁 File-Level Rollbacks

### 1. Restore Specific Files
```bash
# Restore file from last commit
git checkout HEAD -- src/components/Calculator.jsx

# Restore file from specific commit
git checkout 5465bbb -- src/components/Calculator.jsx

# Restore all files in directory
git checkout HEAD -- src/components/
```

### 2. Show File History
```bash
# View file commit history
git log -- src/components/Calculator.jsx

# View file changes
git log -p -- src/components/Calculator.jsx
```

## 🔍 Inspection Commands

### 1. Compare Changes
```bash
# Compare working directory with last commit
git diff

# Compare specific commits
git diff 5465bbb HEAD

# Compare specific files
git diff HEAD~1 src/components/Calculator.jsx
```

### 2. Blame/Annotate
```bash
# See who changed each line
git blame src/components/Calculator.jsx

# Blame specific lines
git blame -L 10,20 src/components/Calculator.jsx
```

## 🚨 Emergency Recovery

### 1. Reflog (Recovery Log)
```bash
# View all recent actions
git reflog

# Recover lost commits
git checkout HEAD@{2}
git reset --hard HEAD@{1}
```

### 2. Lost Commit Recovery
```bash
# Find lost commits
git fsck --lost-found

# Recover specific commit
git checkout <commit-hash>
git checkout -b recovery-branch
```

## 📋 Quick Reference Commands

```bash
# Check status
git status

# View history
git log --oneline

# Create checkpoint
git add . && git commit -m "Checkpoint: Description"

# Rollback safely
git reset --soft HEAD~1

# Rollback dangerously
git reset --hard HEAD~1

# Create branch from checkpoint
git checkout -b new-branch <commit-hash>

# View specific commit
git show <commit-hash>
```

## 🎯 Recommended Workflow

1. **Before making changes**: `git status` to check current state
2. **During development**: Make small, frequent commits
3. **Before major changes**: Create a new branch
4. **After features**: Tag important versions
5. **Regular cleanup**: Use interactive rebase to clean history

---

**Remember**: Always backup important work and test rollbacks in a safe environment first!
