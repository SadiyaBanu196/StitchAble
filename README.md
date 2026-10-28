# StitchAble
### Learn It. Cut It. Stitch It.

**StitchAble** is an interactive digital tailoring and fashion-design platform that helps beginners and aspiring designers learn garment construction, plan patterns, estimate fabric requirements, and troubleshoot common sewing-machine problems.

By bringing together stitching guides, interactive calculation tools, pattern visualizations, and an AI-powered tailoring mentor, StitchAble aims to make garment-making more accessible, structured, and beginner-friendly.

## 🌐 Live Demo

Try StitchAble here:

[Open StitchAble](https://stitchable-app.vercel.app)
---

## 🌟 Key Features

### 1. 👗 Haute Couture Fashion-Themed Interface

Experience a premium fashion-inspired interface designed around the elegance of a modern tailoring atelier.

- Luxury-inspired color palette featuring Deep Atelier Plum (`#4a044e`), Rose Gold (`#f43f5e`), Silk Blush, and Couture Amber (`#f59e0b`).
- Dual themes: **Atelier Dark Mode** and **Silk Light Mode**.
- Custom fashion and tailoring visuals.
- Elegant stitched-border accents and glassmorphic interface elements.
- Responsive layouts for an engaging learning experience.

### 2. 🧵 Start a Garment Project

Begin your garment-making journey through a dedicated project entry point.

- Explore garment options and project guides.
- Access relevant learning materials.
- Prepare measurements and drafting calculations where supported.
- Estimate fabric requirements before cutting.
- Use supporting tools to understand garment construction.
- Get assistance with tailoring questions and common sewing problems.

**Goal:** Help beginners approach garment-making as a guided project rather than a collection of disconnected tasks.

### 3. 📚 Interactive Stitching Guides

Explore structured learning guides covering garment construction, sewing techniques, and creative fabric projects.

**Learning categories include:**
- Indian Ethnic & Couture
- Western Casual Wear
- Little Girls & Kids
- Stitches & Seams
- Machine Mastery
- Creative Design & Upcycling

The guides introduce garment-making techniques and help users understand the processes involved in creating different garments and fabric projects.

### 4. 🧠 Master Ji — AI Tailoring Mentor

Master Ji provides AI-assisted guidance for tailoring questions, garment construction, drafting, and sewing techniques.

**Key capabilities:**
- Interactive answers to tailoring-related questions.
- Guidance on pattern drafting and garment construction.
- Help understanding common sewing-machine problems.
- Fabric-estimation assistance.
- Text-to-speech narration of supported responses.
- Quick-question suggestions for common tailoring doubts.
- Optional Gemini or Groq API integration, with a local fallback for supported questions.

**Example questions:**
- How do I draft a princess-cut blouse?
- Why does my upper thread keep breaking?
- How much fabric is required for a Patiala salwar?
- Which needle should I use for silk or denim?
- What is the difference between a French seam and a flat-felled seam?

AI-generated guidance should be checked against appropriate measurements, garment requirements, and sewing practices before use.

### 5. 📐 Interactive Pattern Drafting Calculator

Enter body measurements to calculate selected drafting dimensions and generate a visual bodice-pattern schematic.

**Measurement inputs:**
- Chest
- Waist
- Hip
- Shoulder
- Garment length

**Supported calculations include:**

| Drafting measurement | Formula |
|---|---|
| Armhole depth | Chest ÷ 6 + 0.5" |
| Neck width | Chest ÷ 12 |
| Bust apex height | Chest ÷ 4 + 1.5" |
| Bust-line quarter | Quarter chest measurement + 1.5" ease |
| Waist quarter | Quarter waist measurement + 1" dart intake |
| Seam allowance | 1.5" margins, as configured |

**Dynamic SVG Pattern Visualization**
- Generates a bodice-pattern schematic based on entered measurements.
- Illustrates grainlines and fold directions.
- Shows dart placement and pattern markings.

*Note: These formulas represent the configured drafting method. They may not be suitable for every garment, body shape, or tailoring system. Verify the pattern and measurements before cutting fabric.*

### 6. 📏 Fabric Meterage Estimator

Estimate fabric requirements for different garment styles and fabric widths.

**Features:**
- Garment selection, including blouses, princess-cut blouses, kameez, Anarkali, Patiala salwar, and circular skirts.
- Fabric-width options: 32", 36", 44", 54", and 60".
- Meter and yard conversions.
- Configurable pre-wash shrinkage and cutting-buffer allowances.
- Cutting-layout recommendations.

Fabric requirements depend on garment design, body measurements, fabric width, pattern placement, and cutting layout. Estimates should be checked before purchasing or cutting fabric.

### 7. 🩺 Sewing Machine Doctor & Diagnostics

Explore troubleshooting guidance for common sewing-machine problems.

**Troubleshooting topics include:**
- Upper-thread breakage
- Bobbin looping and thread bunching
- Skipped stitches on stretch fabrics
- Needle breakage
- Fabric puckering along seams

The application also includes a **Needle, Thread, and Fabric Compatibility Chart** to help users understand suitable combinations for different sewing tasks.

---

## 🛠️ Technology Stack

StitchAble is organized as a web application using the following technologies and components:

- **Frontend:** HTML, CSS, JavaScript
- **Visualizations:** SVG
- **Local server:** Python
- **AI integration:** Optional Gemini or Groq API support
- **Speech:** Browser-supported text-to-speech functionality

Actual API availability and browser speech support may depend on configuration and the user's environment.

---

## 🚀 Getting Started

Follow these steps to run StitchAble locally.

### Prerequisites

Install the following:

- [Git](https://git-scm.com/)
- [Python 3](https://www.python.org/)
- A modern web browser

### 1. Clone the Repository

Replace the placeholder below with your GitHub repository's clone URL.

```bash
git clone <your-github-repository-url>
```

### 2. Navigate to the Project Directory

```bash
cd StitchAble
```

If the cloned repository has a different directory name, use that name instead.

### 3. Start the Local Server

Run:

```bash
python server.py
```

On systems where Python is available through `python3`, use:

```bash
python3 server.py
```

### 4. Open StitchAble

Open your browser and visit:

**http://localhost:8888**

The application should load if the server starts successfully and the required files are present.

### Alternative Launch Methods

You may also open `index.html` directly in a browser or use a local web server such as VS Code Live Server.

Some features, including API integrations, may require the local server or additional configuration.

---

## 🔑 Optional AI API Configuration

StitchAble supports optional AI integration with Gemini or Groq, depending on the implementation and configuration.

1. Obtain an API key from the relevant provider.
2. Follow the provider's integration instructions and the application's configuration requirements.
3. Test the mentor functionality after configuration.

**Security recommendations:**
- Never commit API keys or other secrets to a public repository.
- Do not place private API keys directly in publicly accessible frontend JavaScript.
- If an API key must remain secret, route requests through a secure backend.
- Use the local fallback for supported questions when an external AI provider is unavailable.

---

## 📂 Project Structure

```text
STITCHABLE/
├── index.html
├── server.py
├── css/
│   ├── style.css
│   └── components.css
├── js/
│   ├── app.js
│   ├── i18n.js
│   ├── curriculumData.js
│   ├── mentorAI.js
│   ├── draftingCalculator.js
│   ├── fabricEstimator.js
│   └── troubleshooter.js
├── assets/
│   ├── hero_atelier.jpg
│   ├── drafting_art.jpg
│   └── ai_mentor.jpg
└── references/
```

### Main Components

| File | Purpose |
|---|---|
| `index.html` | Main application interface |
| `server.py` | Lightweight local web server |
| `css/style.css` | Global styling and design tokens |
| `css/components.css` | Component layouts and interface styling |
| `js/app.js` | Application state, navigation, and event handling |
| `js/i18n.js` | Language and interface text configuration |
| `js/curriculumData.js` | Structured stitching lessons and guides |
| `js/mentorAI.js` | AI mentor logic and speech synthesis |
| `js/draftingCalculator.js` | Drafting calculations and SVG pattern visualization |
| `js/fabricEstimator.js` | Fabric requirement calculations and width conversion |
| `js/troubleshooter.js` | Sewing-machine diagnostic workflows |
| `assets/` | Images and other visual assets |
| `references/` | Supporting project resources |

---

## 🎯 Project Vision

StitchAble aims to make tailoring knowledge more accessible by bringing together garment-project guidance, interactive stitching guides, drafting tools, fabric estimation, sewing-machine troubleshooting, and AI-assisted learning in one digital workspace.

By combining practical tools with step-by-step learning support, StitchAble seeks to help beginners approach garment-making with greater clarity and confidence.

### StitchAble — Learn It. Cut It. Stitch It.
