# 🚀 Deploy Your Portfolio to GitHub Pages

Follow these steps to make your portfolio live on the internet!

## Prerequisites
- A GitHub account (create one at https://github.com if you don't have one)
- Git installed on your computer

---

## Step 1: Install Git (if not already installed)

### Windows:
1. Download Git from: https://git-scm.com/download/win
2. Run the installer with default settings
3. Open PowerShell to verify: `git --version`

---

## Step 2: Create a GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon in the top right
3. Select **"New repository"**
4. Repository settings:
   - **Name**: `portfolio` (or any name you like)
   - **Description**: "AI Image Generation Portfolio"
   - **Public** (important for free GitHub Pages)
   - ❌ Do NOT initialize with README (we already have one)
5. Click **"Create repository"**

---

## Step 3: Push Your Code to GitHub

### Open PowerShell in your project folder:
```powershell
cd "C:\Users\kisha\Desktop\Work\Website\Image"
```

### Initialize Git and push:
```powershell
# Initialize Git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - AI Portfolio Website"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important:** Replace `YOUR_USERNAME` with your actual GitHub username!

---

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. In the left sidebar, click **"Pages"**
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **"Save"**

---

## Step 5: Wait for Deployment

- GitHub will start building your site (takes 1-2 minutes)
- Once done, you'll see a message: **"Your site is live at..."**
- Your URL will be: `https://YOUR_USERNAME.github.io/portfolio/`

---

## 🎉 Your Site is Live!

Share your portfolio URL with anyone:
- **URL Format**: `https://YOUR_USERNAME.github.io/portfolio/`

---

## 📝 Making Updates

Whenever you want to update your portfolio:

```powershell
cd "C:\Users\kisha\Desktop\Work\Website\Image"

# Add changes
git add .

# Commit changes
git commit -m "Updated portfolio"

# Push to GitHub
git push
```

GitHub Pages will automatically update your live site in 1-2 minutes!

---

## 🔧 Troubleshooting

### Images not loading?
- Make sure all image paths use forward slashes: `images/combo/1.png`
- Check that image files are committed to GitHub

### Site not updating?
- Wait 2-3 minutes after pushing
- Clear your browser cache (Ctrl + Shift + R)
- Check GitHub Actions tab for build errors

### Need help?
- GitHub Pages Documentation: https://docs.github.com/pages
- Contact: kishanahir1098@gmail.com

---

## 🌟 Optional: Custom Domain

Want a custom domain like `kishanambaliya.com`?

1. Buy a domain from Namecheap, GoDaddy, etc.
2. In your repository, create a file named `CNAME`
3. Add your domain name inside: `kishanambaliya.com`
4. Configure DNS settings at your domain registrar
5. Full guide: https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site

---

**Good luck! 🚀 Your portfolio will be live soon!**
