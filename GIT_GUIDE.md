# 🔧 Git Setup & Collaboration Guide

## 📤 Pushing to GitHub Repository

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **+** icon (top right) → **New repository**
3. Fill in the details:
   - **Repository name**: `hospital-management-system`
   - **Description**: "Modern web-based hospital management system with patient records, appointments, and medical history tracking"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README (we already have one)
4. Click **Create repository**

### Step 2: Initialize Git in Your Project

Open terminal in your project folder and run:

```bash
# Navigate to project directory
cd "/c/Users/parak/OneDrive/Desktop/java project/Hospital-Management-System"

# Initialize Git repository
git init

# Add all files to staging
git add .

# Create first commit
git commit -m "Initial commit: Hospital Management System web application"
```

### Step 3: Connect to GitHub and Push

Copy the commands from GitHub (shown after creating repository), or use these:

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/hospital-management-system.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/johndoe/hospital-management-system.git
git branch -M main
git push -u origin main
```

### Step 4: Enter Credentials

When prompted, enter:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your password)

#### Creating a Personal Access Token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **Generate new token** → **Generate new token (classic)**
3. Give it a name: "Hospital Management System"
4. Select scopes: Check **repo** (full control of private repositories)
5. Click **Generate token**
6. **Copy the token** (you won't see it again!)
7. Use this token as your password when pushing

---

## 👥 Adding Collaborators

### For Public Repositories

Anyone can view and fork, but to give write access:

1. Go to your repository on GitHub
2. Click **Settings** (repository settings, not account)
3. Click **Collaborators** (left sidebar)
4. Click **Add people**
5. Enter their GitHub username or email
6. Select the person from the dropdown
7. Click **Add [username] to this repository**
8. They'll receive an email invitation

### For Private Repositories

Same process as above:
1. Repository → **Settings** → **Collaborators**
2. Click **Add people**
3. Search by username/email
4. Send invitation

### Collaborator Permissions

GitHub offers different roles:
- **Read**: Can view and clone
- **Triage**: Can manage issues and pull requests
- **Write**: Can push to repository
- **Maintain**: Write access + manage settings
- **Admin**: Full access

Choose **Write** or **Maintain** for active collaborators.

---

## 🔄 Collaborator Workflow

### For Collaborators to Clone

Once they accept the invitation:

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/hospital-management-system.git

# Navigate into the project
cd hospital-management-system

# Start working!
```

### Basic Git Commands for Team

```bash
# Pull latest changes before starting work
git pull origin main

# Check status of changes
git status

# Add changes
git add .
# Or add specific files
git add src/HospitalManagementSystem/WebServer.java

# Commit changes
git commit -m "Add new feature: XYZ"

# Push changes
git push origin main

# View commit history
git log --oneline
```

### Branch-Based Workflow (Recommended)

Instead of everyone pushing to main:

```bash
# Create a new branch for your feature
git checkout -b feature/appointment-email-notifications

# Make changes and commit
git add .
git commit -m "Add email notification for appointments"

# Push the branch
git push origin feature/appointment-email-notifications

# Go to GitHub and create a Pull Request
# Team reviews, approves, and merges
```

---

## 📋 Best Practices for Collaboration

### 1. Use Meaningful Commit Messages

❌ Bad:
```bash
git commit -m "fix"
git commit -m "update"
```

✅ Good:
```bash
git commit -m "Fix appointment slot validation bug"
git commit -m "Add patient search functionality to dashboard"
git commit -m "Update README with deployment instructions"
```

### 2. Commit Message Format

```
<type>: <short description>

<detailed description (optional)>

<issue reference (optional)>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```bash
git commit -m "feat: Add prescription printing functionality"
git commit -m "fix: Resolve time slot booking conflict"
git commit -m "docs: Update API documentation"
```

### 3. Pull Before Push

Always pull latest changes before pushing:
```bash
git pull origin main
git push origin main
```

### 4. .gitignore Best Practices

Your `.gitignore` is already set up to exclude:
- Compiled `.class` files
- IDE configuration files
- Build artifacts
- Logs

Don't commit:
- Database passwords (use environment variables)
- Local configuration files
- Large binary files
- Personal settings

### 5. Use Branches for Features

```bash
# Create branch
git checkout -b feature/patient-export

# Work on feature
# ... make changes ...

# Push branch
git push origin feature/patient-export

# Create Pull Request on GitHub
# After review and merge, delete branch
git branch -d feature/patient-export
```

---

## 🔐 Protecting Your Main Branch

### Enable Branch Protection Rules

1. Repository → **Settings** → **Branches**
2. Click **Add rule** under "Branch protection rules"
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (set to 1)
   - ✅ Dismiss stale pull request approvals
   - ✅ Require status checks to pass
5. Click **Create**

Now no one can push directly to main - all changes must go through Pull Requests!

---

## 🚀 Advanced Collaboration Features

### Issues & Project Boards

**Create Issues:**
1. Go to **Issues** tab
2. Click **New issue**
3. Title: "Add email notification feature"
4. Description: Detailed explanation
5. Assign to team member
6. Add labels (bug, enhancement, etc.)

**Project Boards:**
1. Go to **Projects** tab
2. Create a Kanban board
3. Columns: To Do, In Progress, Done
4. Link issues to cards

### Pull Request Workflow

1. **Create PR:**
   ```bash
   git checkout -b feature/new-dashboard
   # ... make changes ...
   git push origin feature/new-dashboard
   ```
   Then create PR on GitHub

2. **Review Code:**
   - Team members review changes
   - Add comments
   - Request changes or approve

3. **Merge:**
   - After approval, click **Merge pull request**
   - Delete branch after merge

### Code Reviews

**For Reviewers:**
- Check code quality
- Test functionality
- Verify documentation
- Ensure no breaking changes

**For Authors:**
- Respond to comments
- Make requested changes
- Keep PRs small and focused

---

## 📊 Repository Settings Checklist

### Essential Settings

- ✅ Add repository description
- ✅ Add topics/tags: `java`, `mysql`, `healthcare`, `web-application`
- ✅ Add README (already have it!)
- ✅ Add LICENSE (already have it!)
- ✅ Configure .gitignore (already configured!)
- ✅ Set up branch protection
- ✅ Add collaborators
- ✅ Create repository template (optional)

### Optional Enhancements

- 📝 Add CONTRIBUTING.md with contribution guidelines
- 🔒 Add SECURITY.md for security policies
- 📋 Add issue templates
- 🎯 Add pull request templates
- 🏷️ Use GitHub releases for versions
- 📖 Enable GitHub Pages for documentation
- 🤖 Set up GitHub Actions for CI/CD

---

## 🛠️ Troubleshooting

### Authentication Issues

**Problem:** `remote: Support for password authentication was removed`

**Solution:** Use Personal Access Token instead of password

### Permission Denied

**Problem:** `Permission denied (publickey)`

**Solution:** Set up SSH keys or use HTTPS with token

### Merge Conflicts

**Problem:** Conflicts when pulling/merging

**Solution:**
```bash
git pull origin main
# Fix conflicts in files
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

### Accidentally Committed Sensitive Data

**Problem:** Pushed password or API key

**Solution:**
```bash
# Remove from history (use with caution!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/sensitive/file" \
  --prune-empty --tag-name-filter cat -- --all

# Force push
git push origin --force --all
```

**Better:** Use tools like `git-secrets` or `BFG Repo-Cleaner`

---

## 📱 Using GitHub Desktop (Alternative)

For those who prefer GUI:

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Install and sign in
3. File → Add Local Repository
4. Select your project folder
5. Publish repository to GitHub
6. Use GUI for commits, pulls, and pushes

---

## 📚 Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)
- [Pro Git Book (Free)](https://git-scm.com/book/en/v2)

---

## 🎯 Quick Command Reference

```bash
# Initial Setup
git init
git add .
git commit -m "Initial commit"
git remote add origin <url>
git push -u origin main

# Daily Workflow
git pull origin main        # Get latest changes
git add .                   # Stage changes
git commit -m "message"     # Commit changes
git push origin main        # Push to GitHub

# Branching
git checkout -b feature-name  # Create and switch to branch
git push origin feature-name  # Push branch
git checkout main            # Switch back to main
git merge feature-name       # Merge branch

# Collaboration
git pull                    # Get latest from team
git log                     # View commit history
git status                  # Check current state
git diff                    # See changes
```

---

**Ready to collaborate! 🚀**

Need help? Open an issue or contact the repository maintainer.
