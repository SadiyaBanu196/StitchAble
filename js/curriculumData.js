/**
 * STITCHABLE - Fashion Tailoring Curriculum Database
 * Directly synthesized from the 6 Reference Course Books:
 * 1. Indian Garment Design Course Book
 * 2. Western Casual Wear Course Book
 * 3. Little Girls Dress Making Course Book
 * 4. Sewing and Design Master Book
 * 5. Cutting and Tailoring Fundamentals
 * 6. Creative Design Course Book
 */

export const curriculumData = [
  // ==========================================
  // TRACK 1: INDIAN TRADITIONAL APPAREL
  // ==========================================
  {
    id: "plain-blouse",
    track: "indian",
    category: "blouse",
    book: "Indian Garment Design Course Book (Ch. 28, P. 82)",
    icon: "fa-shirt",
    difficulty: "Beginner to Intermediate",
    duration: "3 Days / 6 Hours",
    title: {
      en: "Plain Traditional Saree Blouse",
      te: "సాధారణ చీర బ్లౌజ్ (ప్లెయిన్ బ్లౌజ్)"
    },
    subtitle: {
      en: "The cornerstone of Indian tailoring with 4-dart cup shaping and front placket.",
      te: "భారతీయ టైలరింగ్ ప్రాథమిక పాఠం - 4 డాట్స్ కప్ షేప్ మరియు ఫ్రంట్ ఉక్సుల పట్టీ."
    },
    fabricRequirement: {
      en: "80 cm to 1 meter (2x2 Rubia / Cotton / Silk, 36\" width)",
      te: "80 సెం.మీ నుండి 1 మీటర్ (2x2 రూబియా / కాటన్ / సిల్క్, 36 అంగుళాల వెడల్పు)"
    },
    measurementsNeeded: [
      { key: "blouseLength", en: "Blouse Length (13\" - 15\")", te: "బ్లౌజ్ పొడవు (13\" - 15\")" },
      { key: "chest", en: "Chest / Bust Round (32\" - 44\")", te: "ఛాతీ చుట్టుకొలత (32\" - 44\")" },
      { key: "waist", en: "Waist Round (26\" - 38\")", te: "నడుము చుట్టుకొలత (26\" - 38\")" },
      { key: "shoulder", en: "Across Shoulder (13\" - 15\")", te: "భుజం వెడల్పు (13\" - 15\")" },
      { key: "sleeveLength", en: "Sleeve Length & Round", te: "చేతి పొడవు & చుట్టుకొలత" },
      { key: "frontNeck", en: "Front & Back Neck Depth", te: "ముందు & వెనుక మెడ లోతు" }
    ],
    formulas: [
      { label: "Neck Width", formula: "Chest / 12 (Typically 2\" to 2.5\")", note: "Avoid wider neck to prevent shoulder falling" },
      { label: "Armhole Depth", formula: "Chest / 6 + 0.5\" (Typically 5.5\" - 6.5\")", note: "Mark 1/2\" deeper curve on front pattern" },
      { label: "Bust Apex Point", formula: "Shoulder to Bust Height = Chest / 4 + 1.5\"", note: "Intersection point for all 4 shaping darts" },
      { label: "Seam Allowance", formula: "1.5\" at side seams, 0.5\" at armhole & shoulder, 1\" at bottom hem", note: "Standard Indian tailoring allowance" }
    ],
    draftingSteps: {
      en: [
        "Fold fabric lengthwise with selvages together, right sides inside.",
        "Back Panel: Mark total length + 1.5\" hem allowance. Mark Chest/4 + 1.5\" ease width.",
        "Draw neck rectangle: width = Chest/12, depth = 6\" to 8\" as desired; shape with French curve.",
        "Shoulder slope: 1/2\" down at armhole edge. Armhole depth = Chest/6 + 0.5\".",
        "Front Panel: Add 1\" extra length for front cup fullness. Position bust apex point.",
        "Mark 4 darts: Waist dart (1\" wide intake), Centre Front dart (1/2\"), Armhole dart (1/2\"), Side seam dart (1/2\"). All tips stop 1\" before the apex point.",
        "Cut bias strips (true 45° angle) of 1.25\" width for neck piping."
      ],
      te: [
        "క్లాత్ ను నిలువుగా రెండు మడతలుగా వేసి, అంచులు ఒకవైపు ఉండేలా అమర్చండి.",
        "వెనుక భాగం (Back): బ్లౌజ్ పూర్తి పొడవు + 1.5 అంగుళాలు మడతకు కలపండి. వెడల్పు = ఛాతీ/4 + 1.5 అంగుళాలు.",
        "మెడ మార్కింగ్: వెడల్పు = ఛాతీ/12 (సాధారణంగా 2\" నుండి 2.5\"), లోతు 6\" నుండి 8\". ఫ్రెంచ్ కర్వ్ తో రౌండ్ గీయండి.",
        "భుజం డ్రాప్ 1/2\" దించి, చంక లోతు = ఛాతీ/6 + 0.5\" మార్క్ చేయండి.",
        "ముందు భాగం (Front): కప్ బరువు కోసం పొడవులో అదనంగా 1 అంగుళం పెంచాలి. బస్ట్ సెంటర్ పాయింట్ గుర్తించండి.",
        "4 డాట్స్ మార్కింగ్: నడుము డాట్ (1\" వెడల్పు), హుక్స్ పట్టీ డాట్ (1/2\"), చంక డాట్ (1/2\"), సైడ్ డాట్ (1/2\"). డాట్ చివర్లు సెంటర్ కు 1\" దూరంలో ఆగాలి.",
        "మెడ పైపింగ్ కోసం 45 డిగ్రీల క్రాస్ ముక్కలు 1.25 అంగుళాల వెడల్పుతో కత్తిరించండి."
      ]
    },
    stitchingSteps: {
      en: [
        "Stitch all 4 front darts on both sides, tapering smoothly to points without knotting.",
        "Prepare front plackets: 1.5\" wide strip on right (eye placket / extended) and 2.25\" strip on left (hook placket / turned inside).",
        "Join front and back shoulder seams with a secure 1/2\" seam.",
        "Finish neckline with prepared cross-bias piping or facing.",
        "Attach sleeves with ease distributed evenly around the armhole curve.",
        "Join side seams from sleeve hem down to bottom hem, leaving 1.5\" margin for future alterations.",
        "Hem bottom edge neatly with blind hemming and attach hooks and hand-stitched thread eyes."
      ],
      te: [
        "ముందు రెండు భాగాల్లో 4 డాట్లను చివరి వరకు సన్నగా కుట్టండి; చివరన దారం బిగించకుండా వదలండి.",
        "ఉక్సుల పట్టీలు: కుడివైపు కాజా పట్టీ (1.5\" వెడల్పు పైకి వచ్చేలా), ఎడమవైపు ఉక్సుల పట్టీ (2.25\" లోపలికి మడిచేలా) కుట్టండి.",
        "ముందు మరియు వెనుక భుజాలను (Shoulders) 1/2 అంగుళం మార్జిన్ తో జత చేయండి.",
        "తయారుచేసిన క్రాస్ పీస్ తో మెడకు పైపింగ్ లేదా హెమ్మింగ్ పట్టీ వేయండి.",
        "చేతులను చంక రౌండ్ కు సమానంగా సర్దుతూ జత చేయండి.",
        "సైడ్ కుట్లు వేయండి, లోపల 1.5 అంగుళాల మార్జిన్ వదలండి భవిష్యత్తు లూజ్ చేసుకోవడానికి.",
        "కింద అంచును ఎమ్మింగ్ చేసి, చేతి సూదితో ఉక్సులు మరియు కాజాలు వేయండి."
      ]
    },
    mentorTip: {
      en: "Pro Tip: If shoulders keep slipping down, reduce back neck width by 1/4\" and ensure front armhole is scooped 0.5\" deeper than the back armhole.",
      te: "మాస్టర్ జీ సలహా: భుజాలు జారిపోతుంటే, మెడ వెడల్పు 1/4 అంగుళం తగ్గించండి మరియు ముందు చంక లోతును వెనుక కన్నా 1/2 అంగుళం ఎక్కువ కట్ చేయండి."
    },
    svgType: "blouse"
  },
  {
    id: "princess-cut-blouse",
    track: "indian",
    category: "blouse",
    book: "Indian Garment Design Course Book (Ch. 29, P. 84)",
    icon: "fa-gem",
    difficulty: "Advanced",
    duration: "3 Days / 6 Hours",
    title: {
      en: "Princess Cut Designer Blouse",
      te: "ప్రిన్సెస్ కట్ డిజైనర్ బ్లౌజ్"
    },
    subtitle: {
      en: "Modern dartless contoured cup styling with seamless princess curve from armhole to waist.",
      te: "డాట్స్ లేకుండా చంక నుండి నడుము వరకు అందమైన కర్వ్ తో రూపొందే ఆధునిక డిజైనర్ బ్లౌజ్."
    },
    fabricRequirement: {
      en: "1 meter main fabric + 1 meter lining fabric (Cotton / Brocade / Satin)",
      te: "1 మీటర్ మెయిన్ క్లాత్ + 1 మీటర్ లైనింగ్ (కాటన్ / బ్రొకేడ్ / రా సిల్క్)"
    },
    measurementsNeeded: [
      { key: "chest", en: "Full Bust & Upper Bust", te: "ఫుల్ బస్ట్ & అప్పర్ బస్ట్" },
      { key: "apexLength", en: "Shoulder to Apex Point (9.5\" - 10.5\")", te: "భుజం నుండి బస్ట్ ఎపెక్స్ పొడవు" },
      { key: "apexDistance", en: "Distance Between Bust Points (Typically 7\" - 8\")", te: "రెండు ఎపెక్స్ పాయింట్ల మధ్య దూరం" },
      { key: "waist", en: "Waist Measurement", te: "నడుము కొలత" }
    ],
    formulas: [
      { label: "Centre Front Width", formula: "Apex Distance / 2 (e.g. 7\" / 2 = 3.5\")", note: "Placement of princess seam line" },
      { label: "Princess Seam Armhole", formula: "Midpoint of front armhole curve", note: "Smooth convex curve into apex point" },
      { label: "Waist Dart Intake", formula: "(Bust - Waist) / 2 (approx 2\" - 2.5\" cutout)", note: "Creates 3D natural bust volume" }
    ],
    draftingSteps: {
      en: [
        "Trace basic front bodice pattern on paper first (recommended for Princess Cut).",
        "Mark Apex Point: Distance down = Shoulder to Apex, Distance in = Apex Distance / 2.",
        "From apex point, draw a gentle French curve meeting the front armhole at 1/3 height.",
        "From apex down to waist, mark dart width of 2\" to 2.5\". Draw curved lines creating side cup panel.",
        "Separate the pattern into 2 pieces: Centre Panel (cut on fold or with front opening) and Side Panel.",
        "Add 1/2\" seam allowance on both curved edges where pieces will be joined."
      ],
      te: [
        "మొదట పేపర్ పై ఫ్రంట్ బ్లౌజ్ డ్రాఫ్టింగ్ గీయండి (ప్రిన్సెస్ కట్ కు పేపర్ ప్యాటర్న్ తప్పనిసరి).",
        "ఎపెక్స్ పాయింట్ గుర్తించండి: భుజం నుండి పొడవు, సెంటర్ ఫోల్డ్ నుండి సగం దూరం (ఉదా. 3.5\").",
        "ఎపెక్స్ నుండి చంక మధ్యభాగానికి ఫ్రెంచ్ కర్వ్ తో అందమైన ఆర్క్ గీయండి.",
        "ఎపెక్స్ నుండి కింద నడుము వైపు 2\" నుండి 2.5\" వెడల్పుతో కర్వ్ గీసి డాట్ భాగం వేరుచేయండి.",
        "ప్యాటర్న్ రెండు ముక్కలుగా విడిపోతుంది: సెంటర్ ప్యానెల్ మరియు సైడ్ కప్ ప్యానెల్.",
        "రెండు ముక్కలను కలిపే కర్వ్ అంచుల వద్ద 1/2 అంగుళం కుట్టు మార్జిన్ అదనంగా కలుపుకోండి."
      ]
    },
    stitchingSteps: {
      en: [
        "Cut both main fabric and lining fabric using the paper pattern.",
        "Baste lining to main fabric pieces for crisp handling.",
        "Match the apex notches of Centre and Side panels precisely.",
        "Stitch the princess seam from waist upwards to armhole, easing the curve without pulling either fabric.",
        "Clip small triangles into the curved seam allowance and press open for a flat, rounded cup.",
        "Join shoulder seams and attach sleeves and neck finishing with matching piping."
      ],
      te: [
        "పేపర్ ప్యాటర్న్ సహాయంతో మెయిన్ క్లాత్ మరియు లైనింగ్ కట్ చేయండి.",
        "లైనింగ్ ను మెయిన్ క్లాత్ కు సరిగ్గా సర్ది ప్రాథమిక కుట్టు వేయండి.",
        "సెంటర్ ప్యానెల్ మరియు సైడ్ ప్యానెల్ యొక్క ఎపెక్స్ నాచ్ లను సరిగ్గా కలపండి.",
        "నడుము నుండి చంక వైపుకు సాగదీయకుండా నెమ్మదిగా కుట్టు వేయండి.",
        "లోపలి కర్వ్ లో చిన్న చిన్న కట్స్ (Notches) ఇచ్చి ఐరన్ తో ప్రెస్ చేయండి; దీనివల్ల కప్ షేప్ రౌండ్ గా కూర్చుంటుంది.",
        "భుజాలు జత చేసి, చేతులు మరియు నెక్ పైపింగ్ పూర్తి చేయండి."
      ]
    },
    mentorTip: {
      en: "Pro Tip: Always sew princess curves from bottom (waist) to top (armhole) on both sides to ensure symmetrical bust shape and avoid stretching.",
      te: "మాస్టర్ జీ సలహా: రెండు వైపులా కర్వ్ కుట్టేటప్పుడు కింద నడుము నుంచే పైకి కుట్టాలి. దీనివల్ల కప్ షేప్ సమానంగా వచ్చి సాగకుండా ఉంటుంది."
    },
    svgType: "princess"
  },
  {
    id: "anarkali-kameez",
    track: "indian",
    category: "kameez",
    book: "Indian Garment Design Course Book (Ch. 42, P. 110-111)",
    icon: "fa-vest",
    difficulty: "Advanced",
    duration: "4 Days / 8 Hours",
    title: {
      en: "Royal Anarkali Kurti (20-Kali Flair)",
      te: "రాయల్ అనార్కలి కుర్తీ (20-కలి గ్రాండ్ గేరా)"
    },
    subtitle: {
      en: "Empire waist bodice with 20 flared triangular panels (10 front + 10 back) for majestic royal flare.",
      te: "ఎంపైర్ వేస్ట్ యోక్ తో 20 కలిలు (ముందు 10 + వెనుక 10) తో కూడిన అద్భుతమైన ఫ్లేర్ కుర్తీ."
    },
    fabricRequirement: {
      en: "5 to 6 meters (Georgette / Chanderi / Silk / Net with cotton lining)",
      te: "5 నుండి 6 మీటర్లు (జార్జెట్ / చందేరి / కాటన్ సిల్క్, లైనింగ్ తో)"
    },
    measurementsNeeded: [
      { key: "fullLength", en: "Full Garment Length (Ankle length)", te: "పూర్తి పొడవు (చీలమండల వరకు)" },
      { key: "yokeLength", en: "Yoke / Underbust Length (13\" - 14\")", te: "యోక్ / అండర్‌బస్ట్ పొడవు (13\" - 14\")" },
      { key: "chest", en: "Chest Measurement", te: "ఛాతీ చుట్టుకొలత" },
      { key: "waist", en: "Waist Measurement at Yoke Joint", te: "యోక్ జాయింట్ వద్ద నడుము కొలత" }
    ],
    formulas: [
      { label: "Kali Length", formula: "Full Length - Yoke Length + 1.5\" Hemming", note: "Length for each panel" },
      { label: "Kali Top Width", formula: "(Waist Round + 2\" Ease) / Total Kalis (e.g. 32\"/20 = 1.6\" + seam)", note: "Each kali top is ~1.5\" to 2\"" },
      { label: "Kali Bottom Flare", formula: "6\" to 10\" per kali depending on total desired flare (120\" - 200\")", note: "Gives sweeping circumference" }
    ],
    draftingSteps: {
      en: [
        "Bodice Yoke: Draft fitted bodice from shoulder to underbust (13\"-14\"). Shape front neckline.",
        "Kali Calculation: Total kalis = 20 (10 Front + 10 Back).",
        "Draft one master Kali template on brown paper: Top width = 1.5\" + 1\" seam allowance; Bottom width = 6\" to 8\"; Length = Full length minus yoke length.",
        "Layout on fabric: Interlock kalis alternately (wide end up, narrow end down) to save fabric efficiently.",
        "Mark grainline straight down the centre of each kali to avoid wavy hemline distortion."
      ],
      te: [
        "పై యోక్ భాగం: భుజం నుండి అండర్‌బస్ట్ వరకు 13\"-14\" పొడవుతో బాడీస్ కట్ చేయండి.",
        "కలి లెక్కింపు: మొత్తం 20 కలిలు (ముందు 10 + వెనుక 10).",
        "పేపర్ పై ఒక మాస్టర్ కలి గీయండి: పై వెడల్పు = 1.5\" + 1\" కుట్టు మార్జిన్; కింద వెడల్పు = 6\" నుండి 8\"; పొడవు = పూర్తి పొడవు - యోక్ పొడవు.",
        "క్లాత్ లేఅవుట్: క్లాత్ ఆదా చేయడానికి ఒక కలి పైకి, పక్క కలి కిందకు (ఆల్టర్నేటివ్ గా) అమర్చి కట్ చేయండి.",
        "ప్రతి కలి మధ్యలో నిలువు గ్రెయిన్‌లైన్ గుర్తించండి; లేకపోతే గేరా వంకర తిరుగుతుంది."
      ]
    },
    stitchingSteps: {
      en: [
        "Join 10 front kalis sequentially using strong French seams or overlocked plain seams.",
        "Join 10 back kalis similarly. Press all seams outwards toward side seams.",
        "Attach front flared skirt to front yoke, aligning centre points precisely.",
        "Attach back flared skirt to back yoke.",
        "Close shoulder seams and finish neck with brocade piping or potli button accents.",
        "Attach sleeves and stitch continuous side seam from sleeve down to hem.",
        "Level the circular hemline while hanging on dummy, then finish with can-can crinoline or broad golden zari border."
      ],
      te: [
        "ముందు భాగం కోసం 10 కలిలను వరుసగా ఫ్లాట్ సీమ్ లేదా ఓవర్‌లాక్ తో జత చేయండి.",
        "వెనుక భాగం 10 కలిలను అలాగే జత చేయండి. అన్ని కుట్లను ఐరన్ చేసి ప్రెస్ చేయండి.",
        "ముందు కలి గేరాను ముందు యోక్ భాగానికి సెంటర్ మ్యాచ్ చేస్తూ జత చేయండి.",
        "వెనుక కలి గేరాను వెనుక యోక్ కు జత చేయండి.",
        "భుజాలు కలిపి, నెక్ కు జరీ పైపింగ్ లేదా పోట్లీ బటన్స్ వేయండి.",
        "చేతులు జత చేసి, చంక నుండి కింద గేరా వరకు సైడ్ కుట్లు వేయండి.",
        "కింద గేరాను సమానంగా లెవెల్ చేసి, కాన్-కాన్ లేదా వెడల్పాటి జరీ బోర్డర్ తో ఫినిష్ చేయండి."
      ]
    },
    mentorTip: {
      en: "Pro Tip: Hang the assembled Anarkali on a hanger for 12 hours before cutting the bottom hem. The bias sections naturally drop; trim them level for a perfect circle silhouette!",
      te: "మాస్టర్ జీ సలహా: కలిలు కుట్టిన తర్వాత ఒక రోజంతా హ్యాంగర్ కు వేలాడదీయండి. క్రాస్ క్లాత్ సాగి కిందకి జారుతుంది. ఆ తర్వాత కింద రౌండ్ సమంగా కట్ చేస్తే గేరా అద్భుతంగా వస్తుంది!"
    },
    svgType: "anarkali"
  },
  {
    id: "patiala-salwar",
    track: "indian",
    category: "salwar",
    book: "Indian Garment Design Course Book (Ch. 46, P. 118)",
    icon: "fa-layer-group",
    difficulty: "Intermediate",
    duration: "2 Days / 4 Hours",
    title: {
      en: "Royal Shahi Patiala Salwar",
      te: "షాహీ పాటియాలా సల్వార్ (నిండు కుచ్చుల సల్వార్)"
    },
    subtitle: {
      en: "Traditional Punjabi voluminous pleats draped gracefully toward the back ankle cuff (Paincha).",
      te: "పంజాబీ స్టైల్ నిండు కుచ్చులు, గ్రేస్ ఫుల్ ఫాల్ మరియు స్టిఫ్ కాన్వాస్ పాంచా ఫినిషింగ్."
    },
    fabricRequirement: {
      en: "3.5 to 4.5 meters (Crepe / Georgette / Cotton / Rayon)",
      te: "3.5 నుండి 4.5 మీటర్లు (కాటన్ / రేయాన్ / క్రేప్)"
    },
    measurementsNeeded: [
      { key: "length", en: "Total Salwar Length (38\" - 42\")", te: "సల్వార్ పూర్తి పొడవు" },
      { key: "hip", en: "Hip Round (36\" - 44\")", te: "హిప్ చుట్టుకొలత" },
      { key: "ankle", en: "Ankle Opening / Mori Round (12\" - 14\")", te: "బాటమ్ మోరి / పాంచా లూజ్" }
    ],
    formulas: [
      { label: "Belt Height", formula: "7\" Finished (Cut 9\" for drawstring casing and seam)", note: "Standard belt length" },
      { label: "Belt Width", formula: "Hip Round + 6\" to 8\" ease", note: "Allows comfortable movement" },
      { label: "Leg Panel Length", formula: "Total Length - Belt Height (7\") + 1.5\" seam allowance", note: "Cut for central straight panels" },
      { label: "Crotch Depth", formula: "9\" on the Kali pieces + 7\" belt = 16\" total seat depth", note: "Prevents pulling when sitting" }
    ],
    draftingSteps: {
      en: [
        "Cut Belt: Width = Hip + 8\", Height = 9\". Keep aside for drawstring casing.",
        "Central Panels (Kunda): Cut 2 straight panels of width 14\" (folded 7\") and length = Total Length minus 7\".",
        "Flared Panels (Kalis): Fold remaining 3+ meters fabric in half. Cut 4 triangular kalis to maximize pleating fabric.",
        "Mark Crotch curve of 9\" depth on each kali piece.",
        "Cut canvas buckram strip of 1.5\" to 2\" width for stiffening the bottom ankle cuff."
      ],
      te: [
        "బెల్ట్ కటింగ్: వెడల్పు = హిప్ + 8\", పొడవు = 9\" (నాడా మడతతో సహా).",
        "సెంటర్ పార్ట్ (కుందా): 2 నిలువు ముక్కలు వెడల్పు 14\" (మడతపై 7\"), పొడవు = పూర్తి పొడవు - 7\".",
        "కలిలు (Kalis): మిగిలిన 3+ మీటర్ల క్లాత్ లో 4 పెద్ద త్రిభుజాకారపు కలిలను కట్ చేయండి.",
        "ప్రతి కలి వైపు 9 అంగుళాల కిస్తీ (Crotch) రౌండ్ మార్క్ చేయండి.",
        "కింద పాంచా స్టిఫ్ గా ఉండటానికి 1.5\" వెడల్పున్న కాన్వాస్ బక్రమ్ పట్టీని సిద్ధం చేయండి."
      ]
    },
    stitchingSteps: {
      en: [
        "Attach 2 kalis to each side of the central leg panel (making left and right legs).",
        "Join the front and back crotch seams securely with double stitching.",
        "Pleating: Lay deep 1\" to 1.5\" pleats facing forward from side hips towards the centre front seam.",
        "Place 2 small box pleats at the centre back for sitting comfort.",
        "Join the pleated leg circumference to the prepared belt.",
        "Inseam Stitch: Close leg inseam from left ankle up through crotch and down to right ankle.",
        "Prepare ankle cuffs (Paincha) with canvas insert and decorate with 5 to 7 rows of parallel topstitching."
      ],
      te: [
        "కుందా పీస్ కు ఇరువైపులా కలిలను జత చేయండి (రెండు కాళ్లకు వేరువేరుగా).",
        "రెండు కాళ్ల కిస్తీ (Crotch) కుట్లను డబుల్ కుట్టుతో గట్టిగా కలపండి.",
        "కుచ్చులు పెట్టడం: సైడ్స్ నుండి ముందు వైపుకు 1.5 అంగుళాల లోతైన కుచ్చులు వరుసగా పెట్టండి.",
        "కూర్చోవడానికి సౌకర్యంగా ఉండేందుకు వెనుక భాగంలో 2 చిన్న బాక్స్ ప్లీట్స్ వేయండి.",
        "కుచ్చులు పూర్తయిన గేరాను బెల్ట్ కు సమానంగా జత చేయండి.",
        "లోపలి సైడ్ కుట్టు (Inseam) ఒక చీలమండ నుండి కిస్తీ మీదుగా రెండో చీలమండ వరకు వేయండి.",
        "కింద పాంచా లో కాన్వాస్ పెట్టి, పైన 5 నుండి 7 వరుసల సమాంతర అలంకరణ కుట్లు వేయండి."
      ]
    },
    mentorTip: {
      en: "Pro Tip: For a true rich Patiala drape, ensure at least 80% of all pleats converge at the front 6 inches of the belt. This creates the cascade of waterfall folds!",
      te: "మాస్టర్ జీ సలహా: నిజమైన పాటియాలా లుక్ రావాలంటే, 80% కుచ్చులు ముందు 6 అంగుళాల బెల్ట్ పరిధిలోనే కేంద్రీకృతమయ్యేలా అమర్చాలి. అప్పుడు ముడతలు అందంగా పడతాయి!"
    },
    svgType: "salwar"
  },

  // ==========================================
  // TRACK 2: WESTERN CASUAL WEAR
  // ==========================================
  {
    id: "panel-top-chinese-collar",
    track: "western",
    category: "top",
    book: "Western Casual Wear Course Book (Ch. 28, P. 82)",
    icon: "fa-vest-patches",
    difficulty: "Intermediate",
    duration: "3 Days / 6 Hours",
    title: {
      en: "Contoured Panel Top with Chinese Mandarin Collar",
      te: "చైనీస్ మాండరిన్ కాలర్ ప్యానెల్ టాప్"
    },
    subtitle: {
      en: "Sleek casual silhouette featuring structured front panels, cuff sleeves, and crisp stand collar.",
      te: "స్టైలిష్ క్యాజువల్ వెస్ట్రన్ టాప్ - ఫ్రంట్ ప్యానెల్స్, కఫ్ స్లీవ్స్ మరియు నిలబడే చైనీస్ కాలర్."
    },
    fabricRequirement: {
      en: "1.75 to 2 meters (Linen / Poplin / Denim chambray / Rayon twill)",
      te: "1.75 నుండి 2 మీటర్లు (లినెన్ / పాప్లిన్ / కాటన్ ట్విల్ / సాఫ్ట్ డెనిమ్)"
    },
    measurementsNeeded: [
      { key: "bust", en: "Bust Measurement + 3\" Ease", te: "బస్ట్ కొలత + 3\" లూజ్" },
      { key: "waist", en: "Waist Measurement + 2\" Ease", te: "నడుము కొలత + 2\" లూజ్" },
      { key: "neck", en: "Neck Circumference", te: "మెడ చుట్టుకొలత" },
      { key: "hip", en: "Hip Measurement", te: "హిప్ చుట్టుకొలత" }
    ],
    formulas: [
      { label: "Chinese Collar Length", formula: "Total Neck Measurement + 0.5\" Overlap", note: "Measure finished neckline curve" },
      { label: "Collar Height", formula: "1\" to 1.25\" Uniform Stand", note: "Fusible canvas backing required" },
      { label: "Princess Panel Seam", formula: "Apex line running straight to bottom curved hem", note: "Slimming vertical line" }
    ],
    draftingSteps: {
      en: [
        "Draft front bodice with 3 vertical panels: Centre front + 2 side panels.",
        "Add front button placket extension of 0.75\" for buttonhole stand.",
        "Back pattern cut on fold with gentle waist contouring.",
        "Draft Chinese stand collar as a 1\" wide band curved slightly upward 0.5\" at front ends for snug throat fit.",
        "Sleeve drafting with 1.5\" cuff band and sleeve placket slit."
      ],
      te: [
        "ముందు బాడీస్ ను 3 నిలువు ప్యానెల్స్ గా విభజించండి: సెంటర్ ఫ్రంట్ + ఇరువైపులా రెండు సైడ్ ప్యానెల్స్.",
        "ముందు బటన్స్ కోసం 0.75 అంగుళాల ఎక్స్‌టెన్షన్ పట్టీ మార్క్ చేయండి.",
        "వెనుక భాగం మడతపై కట్ చేయండి; నడుము వద్ద స్వల్ప షేప్ ఇవ్వండి.",
        "చైనీస్ స్టాండ్ కాలర్ ను 1\" వెడల్పుతో, ముందు అంచులు మెడకు సరిగ్గా కూర్చునేలా 0.5\" కర్వ్ చేయండి.",
        "స్లీవ్స్ కు 1.5\" వెడల్పు కఫ్ పట్టీ మరియు స్లీవ్ స్లిట్ డ్రాఫ్ట్ చేయండి."
      ]
    },
    stitchingSteps: {
      en: [
        "Join front vertical panels to centre front with neat flat-felled or mock-French seams.",
        "Interface Chinese collar with medium-weight fusible canvas for structure.",
        "Attach shoulder seams and press open flat.",
        "Sandwich neckline into Chinese collar band, topstitching precisely along lower collar fold.",
        "Prepare sleeve pleats, attach cuff bands, and set sleeves into armholes flat.",
        "Close side seams and finish curved shirt-tail hem with narrow double roll."
      ],
      te: [
        "ముందు నిలువు ప్యానెల్స్ ను సెంటర్ కు జత చేసి ఫ్లాట్ కుట్లు వేయండి.",
        "చైనీస్ కాలర్ కు స్టిఫ్ కాన్వాస్ ను ఐరన్ తో అంటించండి.",
        "భుజాలు జత చేసి ప్రెస్ చేయండి.",
        "కాలర్ పట్టీ మధ్యలో నెక్ అంచును ఉంచి, అంచు వెంబడి సన్నని టాప్‌స్టిచ్ వేయండి.",
        "చేతుల చివర కుచ్చులు పెట్టి కఫ్ పట్టీ జత చేయండి, ఆపై చంకకు కుట్టండి.",
        "సైడ్ కుట్లు వేసి, కింద కర్వ్ అంచును సన్నగా రెండు మడతలు పెట్టి కుట్టండి."
      ]
    },
    mentorTip: {
      en: "Pro Tip: Always pre-shrink fusible collar canvas before ironing onto collar fabric, otherwise bubbles and wrinkles appear after the first wash!",
      te: "మాస్టర్ జీ సలహా: కాలర్ కాన్వాస్ ను అంటించే ముందు ఒకసారి వేడి ఐరన్ తో డ్రై ప్రెస్ చేయండి; లేదంటే మొదటి వాష్ లో కాలర్ పై ముడతలు వస్తాయి!"
    },
    svgType: "westernTop"
  },
  {
    id: "umbrella-skirt",
    track: "western",
    category: "bottom",
    book: "Western Casual Wear Course Book (Ch. 34, P. 94)",
    icon: "fa-fan",
    difficulty: "Beginner",
    duration: "1 Day / 3 Hours",
    title: {
      en: "Full Circular Umbrella Skirt",
      te: "పూర్తి సర్క్యులర్ అంబ్రెల్లా స్కర్ట్"
    },
    subtitle: {
      en: "Dramatic 360-degree flowing flare cut from a circular geometry with contour waistband.",
      te: "360 డిగ్రీల అద్భుతమైన రౌండ్ ఫ్లేర్ తో, నడుము బెల్ట్ మరియు జిప్ తో కూడిన వెస్ట్రన్ స్కర్ట్."
    },
    fabricRequirement: {
      en: "3 to 3.5 meters (Crepe / Satin / Chiffon / Rayon, 44\" or 54\" width)",
      te: "3 నుండి 3.5 మీటర్లు (క్రేప్ / సాటిన్ / రేయాన్ / జార్జెట్, 44\" వెడల్పు)"
    },
    measurementsNeeded: [
      { key: "waist", en: "Waist Round", te: "నడుము చుట్టుకొలత" },
      { key: "length", en: "Skirt Length from Waist to Knee/Calf", te: "స్కర్ట్ పొడవు (మోకాలు లేదా చీలమండల వరకు)" }
    ],
    formulas: [
      { label: "Waist Radius (r)", formula: "Waist Round / (2 * π) = Waist / 6.28", note: "e.g. 28\" / 6.28 = 4.45\" radius" },
      { label: "Hem Radius (R)", formula: "Waist Radius (r) + Skirt Length", note: "e.g. 4.45\" + 24\" = 28.45\" from fold corner" }
    ],
    draftingSteps: {
      en: [
        "Fold 44\" fabric square into four quarters (diagonal handkerchief fold).",
        "From the top corner point, measure radius r = Waist / 6.28 in an arc using tape as compass.",
        "From the same top corner, measure outer radius R = r + Skirt Length in an arc.",
        "Cut along both inner and outer arcs. Cut one side seam open for zipper installation.",
        "Cut a curved waistband strip of 3\" width (finished 1.25\") with fusible interfacing."
      ],
      te: [
        "క్లాత్ ను నాలుగు మడతలుగా (రుమాలు మడత తరహాలో) చతురస్రాకారంలో వేయండి.",
        "పై కార్నర్ పాయింట్ నుండి నడుము వ్యాసార్థం r = Waist / 6.28 కొలతతో ఆర్క్ గీయండి.",
        "అదే కార్నర్ నుండి కింద అంచు వ్యాసార్థం R = r + స్కర్ట్ పొడవు కొలతతో పెద్ద ఆర్క్ గీయండి.",
        "రెండు కర్వ్ లను కట్ చేయండి. ఒక వైపు జిప్ వేయడానికి ఓపెన్ చేయండి.",
        "నడుము బెల్ట్ కోసం 3\" వెడల్పుతో కాన్వాస్ పట్టీని సిద్ధం చేయండి."
      ]
    },
    stitchingSteps: {
      en: [
        "Hang the cut circle for 24 hours so bias edges stretch out before final hemming.",
        "Install concealed invisible zipper into the side seam opening.",
        "Attach interfaced waistband to the circular waistline.",
        "Close remaining side seam below zipper stop.",
        "Trim any uneven stretched bias hem using a hem-marker ruler.",
        "Finish hemline with a delicate rolled hem (baby hem) or horsehair braid for dramatic wavy flare."
      ],
      te: [
        "కట్ చేసిన రౌండ్ క్లాత్ ను ఒక రోజంతా వేలాడదీయండి; క్రాస్ అంచులు ముందుగానే సాగుతాయి.",
        "సైడ్ ఓపెనింగ్ వద్ద ఇన్విజిబుల్ జిప్ ను కుట్టండి.",
        "నడుము బెల్ట్ ను రౌండ్ నడుము అంచుకు జత చేయండి.",
        "జిప్ కింద ఉన్న మిగతా సైడ్ కుట్టును వేయండి.",
        "సాగిన కింద అంచును సమంగా లెవెల్ చేయండి.",
        "కింద అంచును సన్నని బేబీ రోల్డ్ హెమ్ లేదా పీకో చేయండి."
      ]
    },
    mentorTip: {
      en: "Pro Tip: Full circle skirts are 100% on the true bias at side seams. Never hem immediately after cutting; let it rest overnight or the hemline will become zigzagged!",
      te: "మాస్టర్ జీ సలహా: సర్క్యులర్ స్కర్ట్ లో సైడ్స్ పూర్తి క్రాస్ గా ఉంటాయి. కట్ చేసిన వెంటనే కింద కుట్టకూడదు; ఒక రోజు వేలాడదీసి తర్వాతే హెమ్మింగ్ చేయాలి!"
    },
    svgType: "umbrellaSkirt"
  },

  // ==========================================
  // TRACK 3: LITTLE GIRLS DRESSMAKING
  // ==========================================
  {
    id: "waist-cut-frock",
    track: "kids",
    category: "frock",
    book: "Little Girls Dress Making Course Book (Ch. 28, P. 82)",
    icon: "fa-child-dress",
    difficulty: "Beginner",
    duration: "2 Days / 4 Hours",
    title: {
      en: "Little Princess Waist-Cut Party Frock",
      te: "చిన్న పిల్లల వేస్ట్-కట్ ఫ్రాక్ (పార్టీ గౌను)"
    },
    subtitle: {
      en: "Classic fit-and-flare silhouette with lined bodice, pleated skirt, back zipper, and sash tie bow.",
      te: "లైనింగ్ బాడీస్, కుచ్చుల స్కర్ట్, వెనుక జిప్ మరియు నడుము రిబ్బన్ బో తో కూడిన అందమైన ఫ్రాక్."
    },
    fabricRequirement: {
      en: "1.5 to 2 meters main fabric + 1 meter soft cotton lining (Organza / Net / Cotton print)",
      te: "1.5 నుండి 2 మీటర్లు మెయిన్ క్లాత్ + 1 మీటర్ సాఫ్ట్ కాటన్ లైనింగ్"
    },
    measurementsNeeded: [
      { key: "chest", en: "Chest (20\" - 26\" for ages 2-8)", te: "ఛాతీ కొలత (2-8 ఏళ్ల పిల్లలకు)" },
      { key: "waistLength", en: "Shoulder to Waist Length (8\" - 11\")", te: "భుజం నుండి నడుము పొడవు" },
      { key: "skirtLength", en: "Waist to Knee Skirt Length (12\" - 16\")", te: "నడుము నుండి మోకాలు వరకు పొడవు" },
      { key: "acrossShoulder", en: "Across Shoulder", te: "భుజం కొలత" }
    ],
    formulas: [
      { label: "Bodice Width", formula: "Chest / 4 + 1.5\" ease", note: "Children require generous comfort ease" },
      { label: "Skirt Width for Gathers", formula: "Waist Round * 2.5 to 3 times", note: "Creates fluffy ballroom fullness" },
      { label: "Neck Width & Depth", formula: "Chest / 12 for neck width; 2.5\" front depth, 1.5\" back depth", note: "Kid-friendly comfort neckline" }
    ],
    draftingSteps: {
      en: [
        "Upper Bodice: Length = Shoulder to waist + 0.5\" seam allowance. Width = Chest/4 + 1.5\".",
        "Armhole curve = Chest/6 + 0.5\". Scoop front armhole by 1/4\".",
        "Back bodice has centre back split for zipper opening.",
        "Lower Skirt: Cut rectangular panel with width = 3 times waist measurement, length = Skirt Length + 2\" hem.",
        "Sash Belts: Cut two strips 3\" wide by 18\" long for the back tie bow."
      ],
      te: [
        "పై బాడీస్: పొడవు = భుజం నుండి నడుము + 0.5\". వెడల్పు = ఛాతీ/4 + 1.5\".",
        "చంక కర్వ్ = ఛాతీ/6 + 0.5\".",
        "వెనుక భాగంలో జిప్ కోసం సెంటర్ బ్యాక్ ఓపెనింగ్ ఇవ్వండి.",
        "కింద స్కర్ట్: నడుము కన్నా 3 రెట్ల వెడల్పుతో పెద్ద దీర్ఘచతురస్ర క్లాత్ కట్ చేయండి; పొడవు = స్కర్ట్ పొడవు + 2\".",
        "నడుము రిబ్బన్ (Sash Tie): వెనుక ముడి వేయడానికి 3\" వెడల్పు, 18\" పొడవుతో రెండు పట్టీలు కట్ చేయండి."
      ]
    },
    stitchingSteps: {
      en: [
        "Assemble bodice with soft cotton lining using burrito clean-finish method for armholes and neck.",
        "Install back concealed zipper running from neckline down into upper skirt.",
        "Run two parallel gathering basting threads along top skirt edge and pull evenly to fit bodice waist.",
        "Sandwich the back sash belts into side seams pointing toward back.",
        "Join gathered skirt to bodice waistline, encasing raw seams in lining.",
        "Close side seams and finish skirt bottom hem with delicate lace or horsehair braid."
      ],
      te: [
        "పిల్లల చర్మానికి గుచ్చుకోకుండా లైనింగ్ తో మెడ మరియు చంక అంచులను క్లీన్ గా తిప్పి కుట్టండి.",
        "వెనుక వైపు మెడ నుండి నడుము వరకు జిప్ ను జత చేయండి.",
        "స్కర్ట్ పైభాగంలో రెండు వరుసల లూజ్ కుట్లు వేసి, సమానంగా చిన్న కుచ్చులుగా లాగండి.",
        "సైడ్ కుట్లలో నడుము రిబ్బన్లను (Tie bows) లోపల పెట్టి కుట్టండి.",
        "బాడీస్ నడుముకు కుచ్చుల స్కర్ట్ ను జత చేయండి.",
        "సైడ్ కుట్లు వేసి, కింద అంచుకు లేస్ లేదా సన్నని మడత కుట్టు వేయండి."
      ]
    },
    mentorTip: {
      en: "Pro Tip: Always line children's garments completely in 100% pre-washed cambric cotton so that synthetic fabrics or sequins never touch delicate skin!",
      te: "మాస్టర్ జీ సలహా: పిల్లల డ్రెస్సులకు లోపల 100% ప్యూర్ కాటన్ లైనింగ్ తప్పనిసరిగా వాడాలి. సీక్విన్స్ లేదా సింథటిక్ క్లాత్ పిల్లల సున్నితమైన చర్మానికి గుచ్చుకోకుండా ఉండాలి!"
    },
    svgType: "kidsFrock"
  },

  // ==========================================
  // TRACK 4: SEWING MACHINE MASTERY & TROUBLESHOOTING
  // ==========================================
  {
    id: "machine-troubleshooting-mastery",
    track: "machine",
    category: "maintenance",
    book: "Sewing and Design Book (Ch. 7, P. 21) & Creative Design Book (Ch. 6, P. 9)",
    icon: "fa-screwdriver-wrench",
    difficulty: "Essential for All Levels",
    duration: "Continuous Diagnostic Guide",
    title: {
      en: "Sewing Machine Doctor & Diagnostic Guide",
      te: "కుట్టు మిషన్ డాక్టర్ & సమస్యల పరిష్కార గైడ్"
    },
    subtitle: {
      en: "Troubleshoot thread breaking, bobbin looping, skipped stitches, needle snapping, and fabric puckering.",
      te: "దారం తెగిపోవడం, కింది దారం ముద్దపడటం, కుట్టు తప్పిపోవడం, సూది విరగడం వంటి 10 ప్రధాన సమస్యల పరిష్కారం."
    },
    fabricRequirement: {
      en: "Test fabric scraps and proper machine oil",
      te: "టెస్టింగ్ క్లాత్ ముక్కలు మరియు మిషన్ ఆయిల్"
    },
    machineProblems: [
      {
        id: "upper-thread-breaks",
        title: { en: "Upper Thread Keeps Breaking Constantly", te: "పై దారం మాటిమాటికి తెగిపోవడం" },
        cause: {
          en: "Upper tension too tight, machine threaded incorrectly, bent/blunt needle, needle inserted backwards, or thread spool caught on notch.",
          te: "టెన్షన్ స్ప్రింగ్ చాలా బిగుతుగా ఉండటం, త్రెడింగ్ సరిగ్గా లేకపోవడం, సూది మొన వంకర కావడం, లేదా సూది ఫ్లాట్ సైడ్ రాంగ్ డైరెక్షన్ లో అమర్చడం."
        },
        solution: {
          en: "Rethread completely with presser foot UP.\n2. Loosen upper tension dial from 5-7 down to 3-4.\n3. Change needle to a fresh, straight needle.\n4. Ensure the flat side of needle shank faces the correct side (away from needle clamp screw).",
          te: "ప్రెషర్ ఫుట్ పైకి ఎత్తి మళ్ళీ మొదటి నుండి దారం ఎక్కించండి.\n2. టెన్షన్ డయల్ ను 3-4 నంబర్ కు వదులు చేయండి.\n3. పాత సూది తీసి కొత్త సూది వేయండి.\n4. సూది ఫ్లాట్ సైడ్ కరెక్ట్ వైపు ఉండేలా బిగించండి."
        }
      },
      {
        id: "lower-bobbin-looping",
        title: { en: "Lower Thread Bird-Nesting / Looping on Underside", te: "కింది దారం లూపులు పడటం / గుడ్డ కింద ముద్ద రావడం" },
        cause: {
          en: "Common misconception: people think bobbin is faulty, but 95% of the time, the UPPER thread has slipped out of the tension disks or take-up lever!",
          te: "చాలామంది ఇది బాబిన్ తప్పు అనుకుంటారు, కానీ 95% సార్లు పై దారం టెన్షన్ డిస్క్‌ల మధ్య నుండి జారిపోవడం లేదా టేక్-అప్ లివర్ లో దారం లేకపోవడం వల్ల జరుగుతుంది!"
        },
        solution: {
          en: "Raise presser foot and re-thread upper thread firmly into tension discs.\n2. Verify thread passes through the take-up lever eyelet.\n3. Check bobbin case tension with the 'yo-yo test' (suspended bobbin drops 1-2 inches when jerked).",
          te: "ప్రెషర్ ఫుట్ ఎత్తి పై దారాన్ని టెన్షన్ ప్లేట్ల మధ్య గట్టిగా కూర్చోబెట్టండి.\n2. టేక్-అప్ లివర్ కన్నంలో దారం ఉందో లేదో చూడండి.\n3. బాబిన్ కేస్ స్క్రూను స్వల్పంగా సరిచేయండి."
        }
      },
      {
        id: "skipped-stitches",
        title: { en: "Skipped Stitches (Missing Stitches on Stretch/Silk)", te: "కుట్టు మధ్యలో తప్పిపోవడం (స్ట్రెచ్ లేదా పట్టు బట్టలపై)" },
        cause: {
          en: "Needle is too thick for delicate cloth, needle point is blunt/hooked, or needle is inserted too low.",
          te: "పల్చటి బట్టపై లావు సూది వాడటం, సూది మొన మొద్దుబారడం, లేదా సూది బార్ లో పూర్తిగా పైకి ఎక్కించకపోవడం."
        },
        solution: {
          en: "Switch to Size 9 or 11 needle for silks, or Ballpoint/Stretch needle for knits.\n2. Push needle all the way up into the needle bar before tightening clamp screw.\n3. Ensure quality mercerised or polyester thread is used.",
          te: "సిల్క్ లేదా జార్జెట్ కు సైజ్ 9 లేదా 11 సూది వాడండి; లైక్రాకు బాల్ పాయింట్ సూది వాడండి.\n2. సూదిని పైకి గట్టిగా నెట్టి స్క్రూ బిగించండి.\n3. నాణ్యమైన పాలిస్టర్ లేదా మెర్సరిజ్డ్ దారం వాడండి."
        }
      },
      {
        id: "fabric-puckering",
        title: { en: "Fabric Puckering & Seam Gathering", te: "కుట్టు వేసినప్పుడు గుడ్డ ముడుచుకుపోవడం" },
        cause: {
          en: "Both upper and lower tensions too tight, stitch length too short for fabric weight, or blunt needle punching fabric fibers.",
          te: "దారం టెన్షన్ చాలా ఎక్కువగా ఉండటం, కుట్టు సైజు చాలా చిన్నగా ఉండటం, లేదా మొద్దు సూది ఫైబర్లను లాగడం."
        },
        solution: {
          en: "Increase stitch length from 2mm to 2.5mm - 3mm.\n2. Loosen upper tension slightly.\n3. Support fabric gently from front and back as it feeds (don't pull hard).\n4. Use tissue paper beneath slippery silks while stitching.",
          te: "కుట్టు సైజును 2.5 నుండి 3కి పెంచండి.\n2. టెన్షన్ కొద్దిగా లూజ్ చేయండి.\n3. బట్టను ముందుకు వెనుకకు సున్నితంగా బ్యాలెన్స్ చేయండి.\n4. జారే పట్టు బట్టల కింద టిష్యూ పేపర్ పెట్టి కుట్టండి."
        }
      }
    ],
    needleFabricChart: [
      { fabric: "Chiffon, Georgette, Organza, Fine Lace", needleSize: "9 / 65 or 11 / 75", thread: "Fine Silk or Synthetic 60", stitchLen: "10-14 per inch" },
      { fabric: "Cotton, Poplin, Voile, Cambric, Gingham", needleSize: "14 / 90", thread: "Mercerised Cotton 50", stitchLen: "12-15 per inch" },
      { fabric: "Raw Silk, Brocade, Taffeta, Linen, Suiting", needleSize: "14 / 90 to 16 / 100", thread: "Synthetic 40 / Mercerised 40", stitchLen: "10-12 per inch" },
      { fabric: "Heavy Denim, Canvas, Upholstery Furnishings", needleSize: "16 / 100 or 18 / 110", thread: "Heavy Duty Polyester / Jeans Thread", stitchLen: "8-10 per inch" },
      { fabric: "Knits, Lycra, Stretch Hosiery, Lingerie", needleSize: "11 / 14 Ballpoint (Golden needle)", thread: "Synthetic Poly-wrapped Stretch Thread", stitchLen: "10-12 per inch" }
    ],
    mentorTip: {
      en: "Master Rule: 1 drop of sewing machine oil every 20 sewing hours on shuttle race and bobbin hook. Never use vegetable oil; only pure white mineral sewing oil!",
      te: "మాస్టర్ సూత్రం: ప్రతి 20 గంటల కుట్టు పని తర్వాత షటిల్ రేస్ మరియు హుక్ వద్ద కేవలం ఒక చుక్క ప్యూర్ వైట్ మిషన్ ఆయిల్ మాత్రమే వేయాలి. వంట నూనెలు ఎప్పుడూ వాడకూడదు!"
    },
    svgType: "machine"
  },

  // ==========================================
  // TRACK 5: SEAM & STITCH ENGINEERING
  // ==========================================
  {
    id: "seam-engineering-guide",
    track: "foundations",
    category: "seams",
    book: "Indian Garment Design Book (Ch. 13, P. 38) & Sewing and Design Book (Ch. 13, P. 35)",
    icon: "fa-scissors",
    difficulty: "Foundational",
    duration: "2 Days / 4 Hours",
    title: {
      en: "Couture Seams Masterclass: French, Flat-Felled & Hong Kong",
      te: "హౌట్ కోచర్ సీమ్స్ మాస్టర్‌క్లాస్: ఫ్రెంచ్, ఫ్లాట్-ఫెల్డ్ & హాంగ్‌కాంగ్ ఫినిషింగ్"
    },
    subtitle: {
      en: "Master self-enclosed luxury seams that eliminate fraying and raw edges without an overlock machine.",
      te: "ఓవర్‌లాక్ మెషీన్ అవసరం లేకుండా పీలికలు రాలిపోకుండా వస్త్రం లోపల అందమైన లగ్జరీ సీమ్స్ వేసే పద్ధతులు."
    },
    fabricRequirement: {
      en: "Muslin or cotton fabric strips for practice",
      te: "ప్రాక్టీస్ కోసం కాటన్ లేదా కాడా క్లాత్ ముక్కలు"
    },
    seamTypes: [
      {
        name: { en: "French Seam (ఫ్రెంచ్ సీమ్)", te: "ఫ్రెంచ్ సీమ్ (రెండు వైపులా దారాలు కనిపించని కుట్టు)" },
        use: { en: "Sheer fabrics, Chiffon, Georgette, Organza, Silk, Baby garments", te: "పల్చటి పట్టు, జార్జెట్, షిఫాన్ మరియు చిన్న పిల్లల దుస్తులకు" },
        steps: {
          en: [
            "Place fabrics WRONG sides together (contrary to normal seams!).",
            "Sew a narrow 1/4\" seam from edge.",
            "Trim seam allowance down to 1/8\" cleanly.",
            "Fold fabrics RIGHT sides together, enclosing the raw edges inside.",
            "Press and sew a 1/4\" seam. The raw edge is completely locked inside forever!"
          ],
          te: [
            "సాధారణ కుట్లకు భిన్నంగా, క్లాత్ ల రాంగ్ సైడ్స్ రెండూ లోపలికి ఉండేలా (రైట్ సైడ్ పైకి) పెట్టండి.",
            "అంచు నుండి 1/4 అంగుళం దూరంలో మొదటి కుట్టు వేయండి.",
            "కుట్టిన మార్జిన్ ను సన్నగా 1/8 అంగుళానికి కత్తిరించండి.",
            "ఇప్పుడు క్లాత్ ను తిప్పి, రైట్ సైడ్స్ రెండూ లోపలికి వచ్చేలా మడత పెట్టండి.",
            "ప్రెస్ చేసి 1/4 అంగుళంతో రెండో కుట్టు వేయండి. కట్ చేసిన అంచులు లోపల బంధించబడి పీలికలు రావు!"
          ]
        }
      },
      {
        name: { en: "Flat-Felled Seam (ఫ్లాట్-ఫెల్డ్ సీమ్ / జీన్స్ సీమ్)", te: "ఫ్లాట్-ఫెల్డ్ సీమ్ (జీన్స్ మరియు షర్ట్స్ కుట్టు)" },
        use: { en: "Denim Jeans, Men's shirts, Pajamas, Reversible jackets", te: "డెనిమ్ జీన్స్, పురుషుల షర్టులు, కుర్తాలు మరియు పైజామాలకు" },
        steps: {
          en: [
            "Sew standard 5/8\" seam right sides together.",
            "Trim one seam allowance in half to 1/4\".",
            "Fold the wider 5/8\" allowance over the trimmed edge.",
            "Press flat against garment body and topstitch near the fold for a double parallel stitch look."
          ],
          te: [
            "మొదట 5/8 అంగుళం మార్జిన్ తో రెండు ముక్కలను కుట్టండి.",
            "ఒక వైపు అంచును సగం దూరం (1/4\") కత్తిరించండి.",
            "పెద్దగా ఉన్న రెండో అంచును ఈ చిన్న అంచుపైకి మడిచి కప్పేయండి.",
            "క్లాత్ పై పడుకోబెట్టి ఐరన్ చేసి, అంచున సమాంతరంగా రెండో కుట్టు వేయండి."
          ]
        }
      }
    ],
    mentorTip: {
      en: "Pro Tip: French seams should never be wider than 1/4\" (6mm) when finished. A wide French seam creates stiff, bulky ridges on delicate garments.",
      te: "మాస్టర్ జీ సలహా: ఫ్రెంచ్ సీమ్ ఎప్పుడూ 1/4 అంగుళం కంటే లావుగా ఉండకూడదు. లావుగా వేస్తే బట్ట మందంగా మారి ముడుచుకుపోతుంది."
    },
    svgType: "seams"
  },

  // ==========================================
  // TRACK 6: CREATIVE UPCYCLING & LIFESTYLE
  // ==========================================
  {
    id: "denim-upcycling-bag",
    track: "creative",
    category: "accessories",
    book: "Creative Design Course Book (Ch. 38, P. 140)",
    icon: "fa-bag-shopping",
    difficulty: "Beginner to Creative",
    duration: "1 Day / 3 Hours",
    title: {
      en: "Upcycled Denim Jeans to Designer Shoulder Tote Bag",
      te: "పాత జీన్స్ తో డిజైనర్ డెనిమ్ షోల్డర్ బ్యాగ్"
    },
    subtitle: {
      en: "Transform discarded jeans into a chic sustainable tote bag using existing back pockets and decorative stitching.",
      te: "పాత జీన్స్ ప్యాంట్ పాకెట్స్ మరియు బెల్ట్ లూప్స్ ను ఉపయోగించి అందమైన, మన్నికైన ఎకో-ఫ్రెండ్లీ హ్యాండ్‌బ్యాగ్ తయారీ."
    },
    fabricRequirement: {
      en: "1 pair of old jeans + 0.5 meter cotton printed lining fabric",
      te: "1 పాత జీన్స్ ప్యాంట్ + 0.5 మీటర్ ప్రింటెడ్ కాటన్ లైనింగ్"
    },
    measurementsNeeded: [
      { key: "bagWidth", en: "Bag Width (14\" - 16\")", te: "బ్యాగ్ వెడల్పు (14\" - 16\")" },
      { key: "bagDepth", en: "Bag Depth (12\" - 14\")", te: "బ్యాగ్ లోతు (12\" - 14\")" },
      { key: "strapLength", en: "Shoulder Strap Length (24\" - 28\")", te: "షోల్డర్ బెల్ట్ పొడవు (24\" - 28\")" }
    ],
    formulas: [
      { label: "Cut Line", formula: "Straight across crotch line below back pockets", note: "Preserves functional denim pockets" },
      { label: "Base Gusset Box", formula: "2.5\" x 2.5\" corner cutout", note: "Creates flat 5\" bottom base for the bag" }
    ],
    draftingSteps: {
      en: [
        "Cut straight across jeans 2\" below the crotch curve, separating the upper shorts portion from legs.",
        "Unpick inner crotch curve seam and lay flat; trim into straight rectangular bottom line.",
        "Cut two 3\" x 26\" strips from the leftover leg fabric for strong shoulder handles.",
        "Cut matching cotton lining with interior pocket for phone and keys."
      ],
      te: [
        "జీన్స్ ప్యాంట్ ను పాకెట్స్ కింద 2 అంగుళాల వద్ద నిలువుగా కట్ చేసి పై భాగాన్ని వేరుచేయండి.",
        "కిస్తీ (Crotch) కుట్టును విప్పి, స్ట్రెయిట్ రెక్టాంగిల్ గా సమం చేయండి.",
        "మిగిలిన కాళ్ల క్లాత్ నుండి హ్యాండిల్స్ కోసం 3\" x 26\" కొలతతో రెండు బెల్టులు కట్ చేయండి.",
        "లోపల లైనింగ్ కోసం కలర్‌ఫుల్ కాటన్ క్లాత్ ను కట్ చేసి మొబైల్ పాకెట్ వేయండి."
      ]
    },
    stitchingSteps: {
      en: [
        "Stitch bottom edge of denim closed with heavy-duty Size 16 needle and golden jeans topstitch thread.",
        "Box the corners: pinch side and bottom seams together, sew across at 2.5\" distance, creating flat bottom base.",
        "Fold handle strips in four layers and stitch down both edges for sturdy shoulder straps.",
        "Baste straps securely to inside top waistline.",
        "Assemble lining bag, drop inside denim shell right sides facing, stitch top rim leaving 3\" turning gap.",
        "Turn right side out, push lining inside, and topstitch crisp edge around waistband."
      ],
      te: [
        "సైజ్ 16 జీన్స్ సూది మరియు గోల్డెన్ త్రెడ్ తో బ్యాగ్ అడుగు భాగాన్ని డబుల్ కుట్టు వేయండి.",
        "బాటమ్ ఫ్లాట్ గా నిలబడటానికి కార్నర్లలో 2.5 అంగుళాల బాక్స్ కుట్టు వేయండి.",
        "హ్యాండిల్స్ ను 4 మడతలుగా మడిచి ఇరువైపులా గట్టి కుట్లు వేయండి.",
        "హ్యాండిల్స్ ను జీన్స్ నడుము లోపలి వైపు గట్టిగా జత చేయండి.",
        "లైనింగ్ బ్యాగ్ ను లోపల పెట్టి నడుము అంచు వెంబడి కుట్టండి (తిప్పడానికి 3 అంగుళాల ఖాళీ వదలండి).",
        "బ్యాగ్ ను మంచివైపుకు తిప్పి, లైనింగ్ లోపలికి సర్ది, నడుము చుట్టూ ఫినిషింగ్ టాప్‌స్టిచ్ వేయండి."
      ]
    },
    mentorTip: {
      en: "Pro Tip: Thread colorful silk scarves through the existing denim belt loops to create a runway designer bohemian flair!",
      te: "మాస్టర్ జీ సలహా: పాత జీన్స్ బెల్ట్ లూప్స్ లో కలర్‌ఫుల్ సిల్క్ స్కార్ఫ్ ని దూర్చి బో కడితే బ్యాగ్ బుటీక్ డిజైనర్ లుక్ తో మెరిసిపోతుంది!"
    },
    svgType: "denimBag"
  }
];
