# StitchAble (స్టిచ్‌ఏబుల్)
### Learn It. Cut It. Stitch It.
*నేర్చుకోండి. కట్ చేయండి. కుట్టండి.*

**StitchAble** is a full-featured, interactive digital application based on the 6 master tailoring and fashion design curriculum reference books:
1. **Indian Garment Design Course Book** (భారతీయ సాంప్రదాయ దుస్తులు)
2. **Western Casual Wear Course Book** (పాశ్చాత్య క్యాజువల్ వేర్)
3. **Little Girls Dress Making Course Book** (చిన్న పిల్లల గౌన్లు & డ్రెస్ మేకింగ్)
4. **Sewing and Design Master Book** (కుట్టు మరియు డిజైన్ సమగ్ర కోర్సు)
5. **Cutting and Tailoring Fundamentals** (కటింగ్ & టైలరింగ్ ప్రాథమిక పరిజ్ఞానం)
6. **Creative Design Course Book** (క్రియేటివ్ డిజైన్, జిగ్-జాగ్ మెషీన్స్ & అప్‌సైక్లింగ్)

---

## 🌟 Key Features

### 1. 🌐 Seamless Bilingual Experience (English 🇬🇧 & Telugu 🇮🇳 తెలుగు)
- **1-Click Language Switcher:** Instantly toggle between English and Telugu across every single tutorial, formula, label, calculation, and AI mentor response.
- **Tailoring Terminology in Telugu:** Authentic vocabulary such as *చంక లోతు (Armhole Depth), ఎపెక్స్ పాయింట్ (Apex Point), గ్రెయిన్‌లైన్ (Grainline), ఉక్సుల పట్టీ, పాంచా, కలిలు*.

### 2. 👗 Haute Couture Fashion Theme UI
- Curated luxury atelier aesthetic: Deep Atelier Plum (`#4a044e`), Rose Gold (`#f43f5e`), Silk Blush, and Couture Amber/Gold (`#f59e0b`).
- Dual theme support: **Atelier Dark Mode** and **Silk Light Mode**.
- Bespoke generated visuals: Atelier mannequin, drafting table flatlay, and Master Ji AI Mentor portrait.
- Stitched golden dashed border accents and glassmorphic translucent panels.

### 3. 🧠 "Master Ji" - AI Tailoring Mentor (సందేహాల నివృత్తి)
- Real-time doubt clarification in Telugu and English.
- Instant expert solutions for drafting issues, shoulder slippage, seam puckering, bobbin tension, and fabric calculations.
- **Voice Readout (TTS):** 1-click audio narration of answers in English or Telugu.
- **Quick Doubt Chips:** Instant answers for common questions:
  - *Princess Cut Blouse drafting formula*
  - *Why does the upper thread break constantly?*
  - *Patiala Salwar cloth meterage calculation*
  - *Needle selection for Silk vs Denim*
  - *French Seam vs Flat-Felled Seam*
- Optional live Gemini / Groq API key support with seamless local expert fallback.

### 4. 📐 Interactive Pattern Drafting Calculator
- Enter customer body measurements (Chest, Waist, Hip, Shoulder, Length).
- Instantly computes:
  - Armhole Depth: $\text{Chest} / 6 + 0.5"$
  - Neck Width: $\text{Chest} / 12$
  - Bust Apex Height: $\text{Chest} / 4 + 1.5"$
  - Bust Line Quarter (+1.5" ease)
  - Waist Quarter (+1" dart intake)
  - 1.5" Seam allowance margins
- **Dynamic Live SVG Pattern Schematic:** Visually illustrates the bodice block matching your input dimensions with marked grainlines, fold directions, and dart placement.

### 5. 📏 Fabric Meterage Estimator (Roll Width Converter)
- Select garment style (Blouse, Princess Cut, Kameez, 20-Kali Anarkali, Patiala Salwar, Circular Skirt, etc.).
- Select fabric roll width (32", 36", 44", 54", 60").
- Calculates exact meters and yards required, including pre-wash shrinkage and cutting buffer, with cutting layout recommendations.

### 6. 🩺 Sewing Machine Doctor & Diagnostics
- Interactive visual troubleshooter for:
  - *Upper thread snapping*
  - *Lower bobbin looping / bird-nesting*
  - *Skipped stitches on stretch fabrics*
  - *Needle snapping*
  - *Fabric puckering under the seam*
- Includes a comprehensive Needle, Thread, and Fabric Compatibility Chart.

---

## 🚀 How to Run Locally

You can run STITCHABLE immediately with the built-in server:

```powershell
# Open terminal in the STITCHABLE folder
cd c:\Users\syedk\Desktop\Sadiya\STITCHABLE

# Start the local server
python server.py
```

Then open your browser at:
👉 **[http://localhost:8888](http://localhost:8888)**

Alternatively, you can open `index.html` directly or serve it with any local web server (like `npx serve .` or VS Code Live Server).

---

## 📂 Project Architecture

```
STITCHABLE/
├── index.html                   # Master single-page app layout
├── server.py                    # Lightweight local server (port 8888)
├── css/
│   ├── style.css                # Haute couture fashion styling & tokens
│   └── components.css           # Luxury cards, modals, calculators, AI drawer
├── js/
│   ├── app.js                   # Application state, router, and event handlers
│   ├── i18n.js                  # English & Telugu dictionaries
│   ├── curriculumData.js        # Structured lessons from all 6 reference books
│   ├── mentorAI.js              # Master Ji AI Mentor engine & speech synthesis
│   ├── draftingCalculator.js    # Precision drafting math & dynamic SVG schematic
│   ├── fabricEstimator.js       # Yardage calculator & roll-width converter
│   └── troubleshooter.js        # Sewing machine diagnostic wizard
├── assets/
│   ├── hero_atelier.jpg         # Bespoke atelier hero image
│   ├── drafting_art.jpg         # Bespoke pattern drafting illustration
│   └── ai_mentor.jpg            # Master Ji mentor portrait
└── references/                  # 6 Original PDF Course Books
```
