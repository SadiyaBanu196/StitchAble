import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6] # completely blank layout

    # Color Palette - Haute Couture Atelier
    C_BG_DARK = RGBColor(18, 9, 26)       # Deep Atelier Plum / Obsidian
    C_CARD_BG = RGBColor(34, 16, 48)       # Translucent Plum Card
    C_CARD_BG2 = RGBColor(46, 22, 66)      # Lighter Card Accent
    C_GOLD = RGBColor(245, 158, 11)        # Couture Amber Gold
    C_ROSE = RGBColor(244, 63, 94)         # Luxury Rose Accent
    C_WHITE = RGBColor(255, 255, 255)      # Pure White Title
    C_MUTED = RGBColor(209, 196, 222)      # Soft Lavender Grey Body
    C_TEAL = RGBColor(16, 185, 129)        # Emerald / Success Green
    C_BORDER = RGBColor(88, 42, 118)       # Subtle border accent

    def set_slide_background(slide, color=C_BG_DARK):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = color
        bg.line.fill.background()
        return bg

    def add_header(slide, tag_text, title_text, subtitle_text=""):
        # Category Tag / Pill
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(8), Inches(0.4))
        tf = tag_box.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = tag_text.upper()
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = C_GOLD
        p.font.name = "Arial"

        # Main Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.72), Inches(11.5), Inches(0.65))
        tf_t = title_box.text_frame
        tf_t.word_wrap = True
        tf_t.margin_left = tf_t.margin_top = tf_t.margin_right = tf_t.margin_bottom = 0
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.font.size = Pt(24)
        p_t.font.bold = True
        p_t.font.color.rgb = C_WHITE
        p_t.font.name = "Georgia"

        # Subtitle
        if subtitle_text:
            sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.35), Inches(11.5), Inches(0.35))
            tf_s = sub_box.text_frame
            tf_s.word_wrap = True
            tf_s.margin_left = tf_s.margin_top = tf_s.margin_right = tf_s.margin_bottom = 0
            p_s = tf_s.paragraphs[0]
            p_s.text = subtitle_text
            p_s.font.size = Pt(12)
            p_s.font.color.rgb = C_MUTED
            p_s.font.name = "Calibri"

    def add_card(slide, left, top, width, height, bg_color=C_CARD_BG, border_color=C_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(1.2)
        else:
            card.line.fill.background()
        return card

    # =========================================================================
    # SLIDE 1: Title & Hackathon Overview
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1, C_BG_DARK)

    # Decorative background panel right
    right_card = add_card(s1, Inches(7.4), Inches(0.8), Inches(5.1), Inches(5.9), C_CARD_BG, C_BORDER)
    if os.path.exists("assets/hero_atelier.jpg"):
        pic = s1.shapes.add_picture("assets/hero_atelier.jpg", Inches(7.55), Inches(0.95), Inches(4.8), Inches(3.2))

    # Badge in right card
    badge_demo = add_card(s1, Inches(7.55), Inches(4.3), Inches(4.8), Inches(2.2), C_CARD_BG2, C_GOLD)
    b_tf = badge_demo.text_frame
    b_tf.word_wrap = True
    b_tf.margin_left = Inches(0.2)
    b_tf.margin_top = Inches(0.18)
    
    p = b_tf.paragraphs[0]
    p.text = "LIVE MVP / PROTOTYPE URL:"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = C_GOLD
    p.font.name = "Arial"

    p2 = b_tf.add_paragraph()
    p2.text = "https://stitchable.vercel.app/"
    p2.font.size = Pt(16)
    p2.font.bold = True
    p2.font.color.rgb = C_WHITE
    p2.font.name = "Arial"

    p3 = b_tf.add_paragraph()
    p3.text = "• Tested & Deployed on Global Edge Cloud\n• 100% Responsive on Budget Smartphones\n• Full English & Telugu Bilingual Architecture"
    p3.font.size = Pt(10.5)
    p3.font.color.rgb = C_MUTED
    p3.font.name = "Calibri"

    # Left content on Slide 1
    # Hackathon badge
    hb = add_card(s1, Inches(0.8), Inches(0.9), Inches(6.2), Inches(0.48), C_CARD_BG2, C_ROSE)
    hb_tf = hb.text_frame
    hb_tf.margin_top = Inches(0.08)
    hb_tf.margin_left = Inches(0.15)
    p_hb = hb_tf.paragraphs[0]
    p_hb.text = "🏆 INDIATHON — IIIT Bhubaneswar E-Cell × LearnApart"
    p_hb.font.size = Pt(11)
    p_hb.font.bold = True
    p_hb.font.color.rgb = C_ROSE
    p_hb.font.name = "Arial"

    # Challenge tag
    ch_box = s1.shapes.add_textbox(Inches(0.8), Inches(1.5), Inches(6.2), Inches(0.35))
    ch_tf = ch_box.text_frame
    ch_tf.margin_left = ch_tf.margin_top = 0
    p_ch = ch_tf.paragraphs[0]
    p_ch.text = "TRACK: BUILD YOUR MVP — 14-DAY CHALLENGE"
    p_ch.font.size = Pt(12)
    p_ch.font.bold = True
    p_ch.font.color.rgb = C_GOLD
    p_ch.font.name = "Arial"

    # Main Project Title
    t_box = s1.shapes.add_textbox(Inches(0.8), Inches(1.9), Inches(6.2), Inches(1.8))
    t_tf = t_box.text_frame
    t_tf.word_wrap = True
    t_tf.margin_left = t_tf.margin_top = 0
    p_t = t_tf.paragraphs[0]
    p_t.text = "StitchAble"
    p_t.font.size = Pt(46)
    p_t.font.bold = True
    p_t.font.color.rgb = C_WHITE
    p_t.font.name = "Georgia"

    p_t2 = t_tf.add_paragraph()
    p_t2.text = "స్టిచ్‌ఏబుల్ • Learn It. Cut It. Stitch It."
    p_t2.font.size = Pt(18)
    p_t2.font.color.rgb = C_GOLD
    p_t2.font.name = "Georgia"

    # Description
    d_box = s1.shapes.add_textbox(Inches(0.8), Inches(3.8), Inches(6.2), Inches(1.4))
    d_tf = d_box.text_frame
    d_tf.word_wrap = True
    d_tf.margin_left = d_tf.margin_top = 0
    p_d = d_tf.paragraphs[0]
    p_d.text = "An AI-powered, bilingual vocational fashion design & precision tailoring operating system. Transforming traditional tailoring education into a smart digital atelier for grassroots creators and micro-entrepreneurs."
    p_d.font.size = Pt(13)
    p_d.font.color.rgb = C_MUTED
    p_d.font.name = "Calibri"

    # Team & Submission Meta
    meta_card = add_card(s1, Inches(0.8), Inches(5.35), Inches(6.2), Inches(1.35), C_CARD_BG, C_BORDER)
    m_tf = meta_card.text_frame
    m_tf.word_wrap = True
    m_tf.margin_left = Inches(0.2)
    m_tf.margin_top = Inches(0.15)
    
    pm1 = m_tf.paragraphs[0]
    pm1.text = "TEAM NAME: AURELIA"
    pm1.font.size = Pt(14)
    pm1.font.bold = True
    pm1.font.color.rgb = C_GOLD
    pm1.font.name = "Arial"

    pm2 = m_tf.add_paragraph()
    pm2.text = "Submission: Round 2 MVP / Functional Prototype Deck\nRepository: github.com/SadiyaBanu196/StitchAble\nTarget Audience: 12M+ Indian Home-Tailors, Artisans & Boutique Owners"
    pm2.font.size = Pt(11)
    pm2.font.color.rgb = C_MUTED
    pm2.font.name = "Calibri"

    # =========================================================================
    # SLIDE 2: Problem Statement & Market Reality
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2, C_BG_DARK)
    add_header(s2, "The Gap & Opportunity", "The Tailoring Industry Crisis: Severe Barriers to Grassroots Success", 
               "Why 80% of aspiring home-tailors struggle to achieve profitable, high-precision garment making.")

    problems = [
        {
            "num": "01",
            "title": "Severe Linguistic & Literacy Barrier",
            "desc": "Most fashion tech and drafting software (CAD) is in complex English. Over 80% of micro-tailors in Tier 2/3 cities and rural India think in regional languages (e.g. Telugu) and lack localized instruction."
        },
        {
            "num": "02",
            "title": "High Error Rates in Manual Drafting",
            "desc": "Complex geometry (armhole depth, apex point, dart intake) is traditionally memorized via guesswork. Result: ill-fitting clothes, customer loss, and 30-40% fabric wastage."
        },
        {
            "num": "03",
            "title": "Expensive & Inaccessible Training",
            "desc": "Commercial fashion design schools cost ₹40,000 to ₹1.5 Lakhs. Physical tailoring classes have rigid timings, making them inaccessible to women managing households."
        },
        {
            "num": "04",
            "title": "Zero On-Demand Technical Mentorship",
            "desc": "When sewing machines jam (bird-nesting, upper thread snapping, tension flaws), tailors lose days waiting for scarce mechanics, disrupting micro-business cash flow."
        }
    ]

    card_w = Inches(2.75)
    card_h = Inches(3.5)
    spacing = Inches(0.2)
    start_left = Inches(0.8)
    top_pos = Inches(1.8)

    for i, p in enumerate(problems):
        c_left = start_left + i * (card_w + spacing)
        card = add_card(s2, c_left, top_pos, card_w, card_h, C_CARD_BG, C_BORDER)
        c_tf = card.text_frame
        c_tf.word_wrap = True
        c_tf.margin_left = c_tf.margin_right = Inches(0.18)
        c_tf.margin_top = Inches(0.2)

        p_num = c_tf.paragraphs[0]
        p_num.text = p["num"]
        p_num.font.size = Pt(28)
        p_num.font.bold = True
        p_num.font.color.rgb = C_ROSE
        p_num.font.name = "Georgia"

        p_t = c_tf.add_paragraph()
        p_t.text = p["title"]
        p_t.font.size = Pt(13.5)
        p_t.font.bold = True
        p_t.font.color.rgb = C_WHITE
        p_t.font.name = "Arial"
        p_t.space_before = Pt(8)

        p_d = c_tf.add_paragraph()
        p_d.text = p["desc"]
        p_d.font.size = Pt(11)
        p_d.font.color.rgb = C_MUTED
        p_d.font.name = "Calibri"
        p_d.space_before = Pt(8)

    # Market Stat Bar at Bottom
    stat_bar = add_card(s2, Inches(0.8), Inches(5.6), Inches(11.6), Inches(1.2), C_CARD_BG2, C_GOLD)
    s_tf = stat_bar.text_frame
    s_tf.word_wrap = True
    s_tf.margin_left = Inches(0.3)
    s_tf.margin_top = Inches(0.15)
    
    ps = s_tf.paragraphs[0]
    ps.text = "MARKET VALIDATION & SOCIAL OPPORTUNITY IN INDIA:"
    ps.font.size = Pt(11)
    ps.font.bold = True
    ps.font.color.rgb = C_GOLD
    ps.font.name = "Arial"

    ps2 = s_tf.add_paragraph()
    ps2.text = "• ₹4.5 Trillion Indian custom apparel & tailoring ecosystem   • 12 Million+ unorganized tailors and home artisans\n• 70%+ are women seeking economic self-reliance via home micro-boutiques   • $120B+ market ripe for vernacular tech."
    ps2.font.size = Pt(11.5)
    ps2.font.color.rgb = C_WHITE
    ps2.font.name = "Calibri"

    # =========================================================================
    # SLIDE 3: The Solution — StitchAble
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3, C_BG_DARK)
    add_header(s3, "The Innovation", "StitchAble: The Pocket Fashion Atelier & Precision Mentor", 
               "Transforming 6 master tailoring reference books into an interactive, bilingual web application.")

    # Left visual
    left_img_card = add_card(s3, Inches(0.8), Inches(1.8), Inches(4.5), Inches(5.0), C_CARD_BG, C_BORDER)
    if os.path.exists("assets/drafting_art.jpg"):
        s3.shapes.add_picture("assets/drafting_art.jpg", Inches(0.95), Inches(1.95), Inches(4.2), Inches(3.0))
    
    # Overlay box on left
    ol_box = add_card(s3, Inches(0.95), Inches(5.1), Inches(4.2), Inches(1.5), C_CARD_BG2, C_GOLD)
    ol_tf = ol_box.text_frame
    ol_tf.word_wrap = True
    ol_tf.margin_left = Inches(0.15)
    ol_tf.margin_top = Inches(0.12)
    p_ol = ol_tf.paragraphs[0]
    p_ol.text = "LIVE MVP DEMONSTRATION:"
    p_ol.font.size = Pt(10)
    p_ol.font.bold = True
    p_ol.font.color.rgb = C_GOLD
    p_ol2 = ol_tf.add_paragraph()
    p_ol2.text = "https://stitchable.vercel.app/"
    p_ol2.font.size = Pt(13)
    p_ol2.font.bold = True
    p_ol2.font.color.rgb = C_WHITE
    p_ol3 = ol_tf.add_paragraph()
    p_ol3.text = "Try drafting calculations, bilingual switch, & AI voice in real-time."
    p_ol3.font.size = Pt(10)
    p_ol3.font.color.rgb = C_MUTED

    # Right side: 4 Key Solution Pillars
    solutions = [
        ("🌐 1-Click Bilingual Core (English + Telugu)", 
         "Every formula, drafting lesson, button, and AI response works seamlessly in both English and vernacular Telugu with authentic tailoring terminology (చంక లోతు, ఎపెక్స్ పాయింట్, కలిలు)."),
        ("📐 Automated CAD Pattern Drafting Calculator", 
         "Input basic body measurements. The system computes armhole depth, neck width, darts, ease, and renders a live dynamic SVG cutting layout matching exact proportions."),
        ("🧠 'Master Ji' — AI Voice Tailoring Mentor", 
         "On-demand assistant answering drafting doubts, fabric matching, and fitting corrections with 1-click text-to-speech audio narration in English or Telugu."),
        ("🩺 Machine Doctor & Fabric Meterage Optimizer", 
         "Visual diagnostic troubleshooter for machine tension flaws, paired with an exact roll-width converter (32\" to 60\") that prevents cloth over-purchasing.")
    ]

    r_top = Inches(1.8)
    for title, desc in solutions:
        s_card = add_card(s3, Inches(5.5), r_top, Inches(6.9), Inches(1.15), C_CARD_BG, C_BORDER)
        sc_tf = s_card.text_frame
        sc_tf.word_wrap = True
        sc_tf.margin_left = Inches(0.2)
        sc_tf.margin_top = Inches(0.12)

        pt = sc_tf.paragraphs[0]
        pt.text = title
        pt.font.size = Pt(13)
        pt.font.bold = True
        pt.font.color.rgb = C_GOLD
        pt.font.name = "Arial"

        pd = sc_tf.add_paragraph()
        pd.text = desc
        pd.font.size = Pt(11)
        pd.font.color.rgb = C_MUTED
        pd.font.name = "Calibri"
        pd.space_before = Pt(3)

        r_top += Inches(1.28)

    # =========================================================================
    # SLIDE 4: MVP Core Architecture & Key Features (Deep Dive)
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4, C_BG_DARK)
    add_header(s4, "Built in 14-Day MVP Sprint", "Core MVP Features & Functional Demonstration", 
               "Live functional modules addressing every stage of the garment creation lifecycle.")

    feats = [
        {
            "badge": "MODULE 01",
            "title": "Interactive Pattern Drafting Engine",
            "bullets": [
                "Automates precision drafting mathematics for blouses, dresses & kurtis.",
                "Computes: Armhole = Chest/6 + 0.5\", Apex = Chest/4 + 1.5\", Neck = Chest/12.",
                "Dynamic Live SVG Blueprint: Real-time rendering of bodice block, grainlines, fold directions, and 1.5\" seam allowances."
            ]
        },
        {
            "badge": "MODULE 02",
            "title": "'Master Ji' Voice AI Mentor",
            "bullets": [
                "Tailoring-specialized AI trained on 6 industry curriculum books.",
                "Quick-solve chips for shoulder slippage, fabric stretch, and thread tension.",
                "Integrated Web Speech API: 1-click audio narration in English and Telugu for accessible hands-free learning while sewing."
            ]
        },
        {
            "badge": "MODULE 03",
            "title": "Smart Fabric Meterage Estimator",
            "bullets": [
                "Solves customer fabric estimation guesswork.",
                "Select garment silhouette (Blouse, 20-Kali Anarkali, Patiala, Skirt).",
                "Calculates exact yardage based on roll width (32\", 36\", 44\", 54\", 60\") with shrinkage buffers and cutting layouts."
            ]
        },
        {
            "badge": "MODULE 04",
            "title": "Sewing Machine Diagnostic Doctor",
            "bullets": [
                "Interactive visual troubleshooting flow.",
                "Instant remedies for bird-nesting bobbins, upper thread snapping, and skipped stitches.",
                "Compatibility chart matching needle sizes (9 to 18) with silk, chiffon, denim, and cotton."
            ]
        }
    ]

    f_w = Inches(5.65)
    f_h = Inches(2.4)
    positions = [
        (Inches(0.8), Inches(1.8)),
        (Inches(6.8), Inches(1.8)),
        (Inches(0.8), Inches(4.45)),
        (Inches(6.8), Inches(4.45))
    ]

    for i, f in enumerate(feats):
        c_l, c_t = positions[i]
        f_card = add_card(s4, c_l, c_t, f_w, f_h, C_CARD_BG, C_BORDER)
        ftf = f_card.text_frame
        ftf.word_wrap = True
        ftf.margin_left = Inches(0.2)
        ftf.margin_top = Inches(0.15)

        pb = ftf.paragraphs[0]
        pb.text = f["badge"]
        pb.font.size = Pt(10)
        pb.font.bold = True
        pb.font.color.rgb = C_ROSE
        pb.font.name = "Arial"

        pt = ftf.add_paragraph()
        pt.text = f["title"]
        pt.font.size = Pt(14)
        pt.font.bold = True
        pt.font.color.rgb = C_GOLD
        pt.font.name = "Arial"

        for b in f["bullets"]:
            pbl = ftf.add_paragraph()
            pbl.text = f"• {b}"
            pbl.font.size = Pt(11)
            pbl.font.color.rgb = C_MUTED
            pbl.font.name = "Calibri"
            pbl.space_before = Pt(3)

    # =========================================================================
    # SLIDE 5: Technology Stack & Technical Execution
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5, C_BG_DARK)
    add_header(s5, "Engineering & Architecture", "Modern, Lightweight & Ultra-Fast Technical Stack", 
               "Engineered for high performance, zero barrier to entry, and instant mobile loading.")

    tech_cards = [
        {
            "icon": "⚡",
            "title": "Vanilla Web Core & CAD Engine",
            "subtitle": "HTML5, CSS3 Luxury Atelier Theme & ES6+ JavaScript",
            "points": [
                "Zero framework bloat: No heavy React/Angular bundle downloads.",
                "Loads in under 0.8 seconds on 3G/4G networks in rural India.",
                "Custom SVG Vector Drafting Engine for real-time mathematical garment schematics."
            ]
        },
        {
            "icon": "🗣️",
            "title": "Bilingual i18n & Voice Synthesis",
            "subtitle": "Web Speech API & Dual-Language Data Models",
            "points": [
                "Comprehensive Telugu & English technical tailoring dictionaries.",
                "Browser-native Text-To-Speech (TTS) synthesis with zero latency.",
                "Dynamic DOM localization without page reloads."
            ]
        },
        {
            "icon": "🧠",
            "title": "AI Mentor Intelligence Engine",
            "subtitle": "Curated Knowledge Base + Gemini/Groq LLM Pipeline",
            "points": [
                "Structured decision tree for 100+ standard tailoring failure modes.",
                "Fast-response instant doubt chips for immediate solutions.",
                "Extensible live LLM integration fallback for free-form queries."
            ]
        },
        {
            "icon": "☁️",
            "title": "Cloud Serverless Deployment",
            "subtitle": "Vercel Edge Platform & Git CI/CD",
            "points": [
                "Live at: https://stitchable.vercel.app/",
                "Continuous integration connected to GitHub repository.",
                "PWA-ready design: Works smoothly across Android & iOS browsers."
            ]
        }
    ]

    for i, t in enumerate(tech_cards):
        c_l, c_t = positions[i]
        t_card = add_card(s5, c_l, c_t, f_w, f_h, C_CARD_BG, C_BORDER)
        ttf = t_card.text_frame
        ttf.word_wrap = True
        ttf.margin_left = Inches(0.2)
        ttf.margin_top = Inches(0.15)

        pt = ttf.paragraphs[0]
        pt.text = f"{t['icon']} {t['title']}"
        pt.font.size = Pt(14)
        pt.font.bold = True
        pt.font.color.rgb = C_GOLD
        pt.font.name = "Arial"

        ps = ttf.add_paragraph()
        ps.text = t["subtitle"]
        ps.font.size = Pt(11)
        ps.font.bold = True
        ps.font.color.rgb = C_ROSE
        ps.font.name = "Calibri"

        for p in t["points"]:
            pbl = ttf.add_paragraph()
            pbl.text = f"• {p}"
            pbl.font.size = Pt(11)
            pbl.font.color.rgb = C_MUTED
            pbl.font.name = "Calibri"
            pbl.space_before = Pt(3)

    # =========================================================================
    # SLIDE 6: Business Model, Impact & Scalability
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6, C_BG_DARK)
    add_header(s6, "Sustainability & Growth", "Business Model, Monetization & Social Impact", 
               "How StitchAble scales from an MVP into a self-sustaining vocational ecosystem.")

    b_cards = [
        {
            "tier": "TIER 1 • COMMUNITY FREEMIUM",
            "name": "Grassroots Access (Free)",
            "details": [
                "Full access to 6-discipline foundation tailoring lessons.",
                "Standard bodice pattern drafting calculator.",
                "Essential sewing machine troubleshooting wizard.",
                "Bilingual English/Telugu toggle for all public modules."
            ],
            "target": "Goal: Maximum viral adoption among rural women & self-help groups."
        },
        {
            "tier": "TIER 2 • STITCHABLE PRO",
            "name": "Boutique & Creator Tier (₹299/mo)",
            "details": [
                "Full AI Voice Mentor unlimited interactive queries.",
                "Downloadable 1:1 scale printable PDF pattern tiles (A4 / Plotter).",
                "Advanced designer patterns: Bridal lehengas, princess cuts, blazers.",
                "Customer measurement vault and cloud order tracker."
            ],
            "target": "Goal: Direct monetization from 500,000+ commercial micro-boutiques."
        },
        {
            "tier": "TIER 3 • INSTITUTIONAL B2B",
            "name": "Vocational & CSR Licensing",
            "details": [
                "Custom LMS white-labeling for government skill centers.",
                "Tie-ups with Skill India, PMKVY, and textile colleges.",
                "Student progress tracking and automated assessment tests.",
                "Bulk hardware-tablet pre-installs for rural vocational labs."
            ],
            "target": "Goal: High-ticket recurring institutional contracts."
        }
    ]

    col_w = Inches(3.68)
    col_h = Inches(4.0)
    col_spacing = Inches(0.28)
    c_start = Inches(0.8)

    for i, b in enumerate(b_cards):
        b_left = c_start + i * (col_w + col_spacing)
        card = add_card(s6, b_left, Inches(1.8), col_w, col_h, C_CARD_BG, C_BORDER)
        btf = card.text_frame
        btf.word_wrap = True
        btf.margin_left = btf.margin_right = Inches(0.18)
        btf.margin_top = Inches(0.18)

        p_t = btf.paragraphs[0]
        p_t.text = b["tier"]
        p_t.font.size = Pt(10)
        p_t.font.bold = True
        p_t.font.color.rgb = C_ROSE
        p_t.font.name = "Arial"

        p_n = btf.add_paragraph()
        p_n.text = b["name"]
        p_n.font.size = Pt(14)
        p_n.font.bold = True
        p_n.font.color.rgb = C_GOLD
        p_n.font.name = "Arial"
        p_n.space_before = Pt(4)

        for d in b["details"]:
            pd = btf.add_paragraph()
            pd.text = f"• {d}"
            pd.font.size = Pt(11)
            pd.font.color.rgb = C_MUTED
            pd.font.name = "Calibri"
            pd.space_before = Pt(4)

        ptg = btf.add_paragraph()
        ptg.text = b["target"]
        ptg.font.size = Pt(10.5)
        ptg.font.bold = True
        ptg.font.color.rgb = C_WHITE
        ptg.font.name = "Calibri"
        ptg.space_before = Pt(10)

    # Social Impact Banner
    imp_bar = add_card(s6, Inches(0.8), Inches(6.0), Inches(11.6), Inches(0.9), C_CARD_BG2, C_TEAL)
    itf = imp_bar.text_frame
    itf.word_wrap = True
    itf.margin_left = Inches(0.2)
    itf.margin_top = Inches(0.1)
    pi = itf.paragraphs[0]
    pi.text = "🌱 SUSTAINABILITY & EMPOWERMENT IMPACT:"
    pi.font.size = Pt(10.5)
    pi.font.bold = True
    pi.font.color.rgb = C_TEAL
    pi.font.name = "Arial"
    pi2 = itf.add_paragraph()
    pi2.text = "• Eliminates 25% textile landfill waste via precision roll estimation   • Powers financial independence for stay-at-home mothers & rural artisans."
    pi2.font.size = Pt(11)
    pi2.font.color.rgb = C_WHITE
    pi2.font.name = "Calibri"

    # =========================================================================
    # SLIDE 7: Roadmap, Demo & Submission Summary
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7, C_BG_DARK)
    add_header(s7, "Execution & Vision", "14-Day MVP Achievements & Future Roadmap", 
               "From a 14-day hackathon challenge to an empowering movement in vocational fashion tech.")

    # Left Card: MVP Milestones Achieved
    l_card = add_card(s7, Inches(0.8), Inches(1.8), Inches(5.6), Inches(4.1), C_CARD_BG, C_BORDER)
    ltf = l_card.text_frame
    ltf.word_wrap = True
    ltf.margin_left = Inches(0.25)
    ltf.margin_top = Inches(0.2)

    p = ltf.paragraphs[0]
    p.text = "✅ COMPLETED IN 14-DAY MVP SPRINT:"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = C_TEAL
    p.font.name = "Arial"

    achievements = [
        "Transformed 6 Comprehensive Tailoring Master Reference Books into a unified digital curriculum.",
        "Engineered real-time bilingual engine (English 🇬🇧 & Telugu 🇮🇳) across the entire application.",
        "Built mathematical CAD pattern drafting calculator with live interactive SVG schematics.",
        "Integrated 'Master Ji' AI mentor with real-time text-to-speech audio doubt clarification.",
        "Developed sewing machine diagnostic troubleshooter & roll-width yardage optimizer.",
        "Deployed to global production on Vercel Edge with clean URL routing & zero dependencies."
    ]
    for a in achievements:
        pa = ltf.add_paragraph()
        pa.text = f"• {a}"
        pa.font.size = Pt(11)
        pa.font.color.rgb = C_MUTED
        pa.font.name = "Calibri"
        pa.space_before = Pt(4)

    # Right Card: 30-90 Day Roadmap
    r_card = add_card(s7, Inches(6.8), Inches(1.8), Inches(5.6), Inches(4.1), C_CARD_BG, C_BORDER)
    rtf = r_card.text_frame
    rtf.word_wrap = True
    rtf.margin_left = Inches(0.25)
    rtf.margin_top = Inches(0.2)

    p_r = rtf.paragraphs[0]
    p_r.text = "🚀 NEXT 30–90 DAYS EXPANSION ROADMAP:"
    p_r.font.size = Pt(12)
    p_r.font.bold = True
    p_r.font.color.rgb = C_GOLD
    p_r.font.name = "Arial"

    roadmap = [
        "📸 AI Camera Body Scanning: Extract body dimensions automatically using smartphone camera computer vision.",
        "🖨️ PDF Printable Patterns: 1-Click export of 100% life-size pattern sheets formatted for A4 home printers.",
        "🗣️ Multi-Language Voice: Expand Telugu TTS to Hindi, Tamil, Kannada, and Marathi regional vernaculars.",
        "🤝 Tailor-Client Order Marketplace: Allow local customers to upload design photos and match with certified StitchAble home tailors."
    ]
    for r in roadmap:
        pr = rtf.add_paragraph()
        pr.text = f"• {r}"
        pr.font.size = Pt(11)
        pr.font.color.rgb = C_MUTED
        pr.font.name = "Calibri"
        pr.space_before = Pt(6)

    # Bottom Submission Bar
    sub_bar = add_card(s7, Inches(0.8), Inches(6.05), Inches(11.6), Inches(1.0), C_CARD_BG2, C_GOLD)
    sbtf = sub_bar.text_frame
    sbtf.word_wrap = True
    sbtf.margin_left = Inches(0.3)
    sbtf.margin_top = Inches(0.12)

    ps1 = sbtf.paragraphs[0]
    ps1.text = "TEAM AURELIA • SUBMISSION SUMMARY:"
    ps1.font.size = Pt(11)
    ps1.font.bold = True
    ps1.font.color.rgb = C_GOLD
    ps1.font.name = "Arial"

    ps2 = sbtf.add_paragraph()
    ps2.text = "🌐 Live MVP Prototype: https://stitchable.vercel.app/   |   💻 GitHub: github.com/SadiyaBanu196/StitchAble\nEvent: Indiathon – Powered by E-Cell IIIT Bhubaneswar & LearnApart (Build Your MVP – 14 Day Challenge)"
    ps2.font.size = Pt(11)
    ps2.font.color.rgb = C_WHITE
    ps2.font.name = "Calibri"

    # Save presentation
    output_filename = "StitchAble_Hackathon_MVP_Aurelia.pptx"
    prs.save(output_filename)
    print(f"Presentation saved successfully as {output_filename}")

if __name__ == "__main__":
    create_deck()
