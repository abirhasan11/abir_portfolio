[README.md](https://github.com/user-attachments/files/35290302/README.md)
<div align="center">

# Abir Hasan · Personal Portfolio

**Software Quality Assurance · Dhaka, Bangladesh**

A multi-page portfolio website built from scratch with HTML, CSS, JavaScript, jQuery and Ajax.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-2f5bea?style=for-the-badge&logo=googlechrome&logoColor=white)](https://abirhasan11.github.io/portfolio/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-abirhasan11-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abirhasan11/)
[![Email](https://img.shields.io/badge/Email-Contact_Me-0f7f72?style=for-the-badge&logo=gmail&logoColor=white)](mailto:abir11hasan09@gmail.com)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![jQuery](https://img.shields.io/badge/jQuery_3.7.1-0769AD?style=flat-square&logo=jquery&logoColor=white)
![Ajax](https://img.shields.io/badge/Ajax_+_JSON-5b3fe6?style=flat-square)
![Responsive](https://img.shields.io/badge/Responsive-Phone_·_Tablet_·_Laptop-14b8a6?style=flat-square)

<br>

<img src="docs/screenshots/home-desktop.jpg" alt="Home page of the portfolio" width="100%">

</div>

<br>

## 📑 Contents

- [About the project](#-about-the-project)
- [Pages](#-pages)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech stack](#-tech-stack)
- [Project structure](#-project-structure)
- [Run locally](#-run-locally)
- [Deploy on GitHub Pages](#-deploy-on-github-pages)
- [Update the content](#-update-the-content)
- [Featured projects](#-featured-projects)
- [Author](#-author)

<br>

## 👋 About the project

This is my personal portfolio, built for the course assignment **Design and Development of a Personal Portfolio Website**. It presents my education, skills and projects as a Computer Science and Engineering student at Daffodil International University, with a focus on **software quality assurance and testing**.

Everything is hand-written: no templates, no CSS frameworks and no build tools.

<br>

## 🗂 Pages

| Page | File | What it shows |
| :-- | :-- | :-- |
| 🏠 **Home** | `index.html` | Introduction, photo, stats, what I do, featured work, testing process |
| 🙋 **About** | `about.html` | Personal introduction, profile facts, academic background, soft skills, interests |
| 💼 **Projects** | `projects.html` | Selected work with cover images, filter tabs, Live Server and GitHub links |
| 🧪 **Skills** | `skills.html` | Technical capabilities and my 8-step testing process |
| ✉️ **Contact** | `contact.html` | Contact details and a validated contact form |

<br>

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

**⚡ Ajax data loading**
Projects and education load from JSON files with `$.ajax`, keeping content separate from the HTML.

**🗃 Project filter**
Tabs for All, QA & Testing, AI & Software and Web Design, with live counts and a two-column card layout.

**🔍 Project details popup**
Description, highlights and links in a modal that closes with the button, a click outside or <kbd>Esc</kbd>.

**🔢 Counting stats**
Home page numbers count up on load with a jQuery animation.

</td>
<td width="50%" valign="top">

**✅ Interactive testing process**
Each STLC step expands on click or with the keyboard.

**📝 Contact form validation**
Clear errors for name, email and message, then the email app opens with the message ready.

**🌗 Light and dark theme**
Follows the system setting and remembers your choice.

**📱 Fully responsive**
Tested at 360, 390, 768, 1024, 1280 and 1536 pixels wide.

</td>
</tr>
</table>

**♿ Accessible:** skip link, visible keyboard focus, alt text, labelled form fields, `aria-live` updates and reduced-motion support.

<br>

## 📸 Screenshots

<div align="center">

| Projects | Mobile |
| :--: | :--: |
| <img src="docs/screenshots/projects-desktop.jpg" alt="Projects page" width="560"> | <img src="docs/screenshots/home-mobile.jpg" alt="Home page on a phone" width="220"> |

<img src="docs/screenshots/skills-desktop.jpg" alt="Skills page" width="100%">

</div>

<br>

## 🛠 Tech stack

| Technology | Used for |
| :-- | :-- |
| **HTML5** | Semantic page structure |
| **CSS3** | Flexbox and Grid layout, CSS variables for theming, media queries |
| **JavaScript** | Page logic |
| **jQuery 3.7.1** | DOM handling, events and animations |
| **Ajax + JSON** | Loading project and education data |
| **Google Fonts** | Plus Jakarta Sans, Inter and JetBrains Mono |

<br>

## 📁 Project structure

```
abir-hasan-portfolio/
├── index.html                 # Home
├── about.html                 # About
├── skills.html                # Skills
├── projects.html              # Projects
├── contact.html               # Contact
├── css/
│   └── style.css              # all styles, themes and responsive rules
├── js/
│   ├── main.js                # jQuery code for every page
│   ├── fallback-data.js       # offline copy of the JSON data
│   └── jquery-3.7.1.min.js    # local jQuery, works without internet
├── data/
│   ├── projects.json          # project cards (loaded with Ajax)
│   └── education.json         # academic background (loaded with Ajax)
├── assets/
│   ├── Abir-Hasan-CV.pdf
│   └── img/
│       ├── abir-portrait.jpg
│       └── projects/          # project cover images
├── docs/screenshots/          # images for this README
├── .nojekyll
└── README.md
```

<br>

## 💻 Run locally

Browsers block Ajax on pages opened straight from disk (`file://`), so use a local server.

**Option 1: VS Code**

1. Install the **Live Server** extension.
2. Open the project folder.
3. Right-click `index.html` and choose **Open with Live Server**.

**Option 2: Python**

```bash
cd abir-hasan-portfolio
python -m http.server 8000
```

Then open <http://localhost:8000>.

> **Note**
> Double-clicking `index.html` also works. The site then shows a built-in copy of the data from `js/fallback-data.js`.

<br>

## 🚀 Deploy on GitHub Pages

```bash
git init
git add .
git commit -m "Add personal portfolio website"
git branch -M main
git remote add origin https://github.com/abirhasan11/portfolio.git
git push -u origin main
```

1. Go to **Settings → Pages** in the repository.
2. Set **Source** to **Deploy from a branch**.
3. Choose branch **main** and folder **/ (root)**, then **Save**.
4. The site goes live at **https://abirhasan11.github.io/portfolio/** within a minute or two.

> **Tip**
> Name the repository `abirhasan11.github.io` to get the shorter address `https://abirhasan11.github.io/`.

<br>

## ✏️ Update the content

| To change | Edit |
| :-- | :-- |
| Projects | `data/projects.json` (set `"live": null` to hide the Live Server button) |
| Education | `data/education.json` |
| Project images | Replace files in `assets/img/projects/`, keeping the same names |
| CV | Replace `assets/Abir-Hasan-CV.pdf` |

After editing a JSON file, copy the same change into `js/fallback-data.js` so the offline copy matches.

<br>

## 💼 Featured projects

| Project | Category | Links |
| :-- | :-- | :-- |
| **RoadSense: AI Vehicle Detection** | AI & Software | [Live](https://roadsense.ai.studio/) · [Code](https://github.com/abirhasan11/roadsense-ai-vehicle-detection) |
| **Test Case Writing (Flight Booking System)** | QA & Testing | [Code](https://github.com/abirhasan11/SQA-assignment) |
| **CV Maker AI** | AI & Software | [Code](https://github.com/abirhasan11/CV-Maker-Ai) |
| **Manual Testing (SauceDemo)** | QA & Testing | [Code](https://github.com/abirhasan11/SauceDemo_test) |
| **Nature’s Platter** | Web Design | [Code](https://github.com/abirhasan11/assignment-3) |
| **Kids Education School** | Web Design | [Live](https://kidseducationschool.netlify.app/) · [Code](https://github.com/abirhasan11/assignment-2) |

<br>

## 👤 Author

<table>
<tr>
<td>
<img src="assets/img/abir-portrait.jpg" alt="Abir Hasan" width="110">
</td>
<td>

**Abir Hasan**
B.Sc. in Computer Science and Engineering
Daffodil International University · Dhaka, Bangladesh

📧 [abir11hasan09@gmail.com](mailto:abir11hasan09@gmail.com)
💼 [linkedin.com/in/abirhasan11](https://www.linkedin.com/in/abirhasan11/)
🐙 [github.com/abirhasan11](https://github.com/abirhasan11)

</td>
</tr>
</table>

<br>

<div align="center">

**If you like this portfolio, consider giving the repository a ⭐**

© 2026 Abir Hasan · Designed and built by me

</div>
