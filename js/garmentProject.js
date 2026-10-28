/**
 * STITCHABLE - Guided Garment Project Workspace Engine
 * Manages the 7-stage guided tailoring workflow:
 * Stage 1: Choose Garment
 * Stage 2: Enter Measurements & Validation
 * Stage 3: Prepare Pattern (Deterministic Drafting Math & SVG)
 * Stage 4: Estimate Fabric (Yardage & Roll Width)
 * Stage 5: Cutting Guidance (Preparation, Marking, Cutting, Checking & Safety)
 * Stage 6: Stitching Guidance (Step-by-step checklist & Terminology)
 * Stage 7: Progress Tracking & Export
 */

export class GarmentProject {
  constructor(getLang, calculator, fabricEstimator) {
    this.getLang = getLang;
    this.calculator = calculator;
    this.fabricEstimator = fabricEstimator;

    // Supported garments with verified mathematical drafting & construction instructions
    this.supportedGarments = {
      blouse: {
        id: "blouse",
        fabGarmentKey: "plain-blouse",
        title: {
          en: "Traditional Saree Blouse (4-Dart)",
          te: "సాధారణ చీర బ్లౌజ్ (4-డాట్ బ్లౌజ్)"
        },
        subtitle: {
          en: "The classic foundation of Indian tailoring with 4-dart cup shaping and front plackets.",
          te: "భారతీయ టైలరింగ్ ప్రాథమిక మోడల్ - 4 డాట్స్ కప్ షేప్ మరియు ఫ్రంట్ ఉక్సుల పట్టీ."
        },
        curriculumRef: "Indian Garment Design Course Book (Ch. 28, P. 82)",
        difficulty: { en: "Beginner", te: "బిగినర్" },
        duration: { en: "3 Days / 6 Hours", te: "3 రోజులు / 6 గంటలు" },
        toolsNeeded: {
          en: [
            "Tailor's measuring tape (inches/cm)",
            "Tailor's chalk or disappearing fabric pen",
            "Sharp 8\" to 10\" fabric shears (never paper scissors)",
            "Brown drafting paper or pattern grid sheet",
            "Rust-proof glass-head dressmaker pins",
            "Steam iron and pressing cloth",
            "Sewing machine with size 14/90 universal needle",
            "Matching polyester or cotton thread (#50)",
            "Hand sewing needle for hemming, hooks & eyes"
          ],
          te: [
            "టైలరింగ్ కొలత టేప్ (అంగుళాలు/సెం.మీ)",
            "టైలర్స్ చాక్ లేదా మార్కింగ్ పెన్సిల్",
            "పదునైన 8\" నుండి 10\" క్లాత్ కత్తెర (పేపర్ కట్ చేయనిది)",
            "బ్రౌన్ డ్రాఫ్టింగ్ పేపర్ లేదా ప్యాటర్న్ షీట్",
            "డ్రెస్ మేకర్ పిన్నులు (రస్ట్-ఫ్రీ)",
            "స్టీమ్ ఐరన్ బాక్స్ & ప్రెస్సింగ్ క్లాత్",
            "సైజ్ 14/90 సూదితో కూడిన కుట్టు మిషన్",
            "వస్త్రానికి సరిపోయే మ్యాచింగ్ దారం (#50)",
            "చేతి కుట్టు సూది, ఉక్సులు మరియు కాజాల కోసం"
          ]
        },
        fabricRecommendation: {
          en: "80 cm (for bust < 38\") to 1.0 meter (for bust ≥ 38\" or elbow sleeves). Best fabrics: 2x2 Rubia, 100% Cotton, or Raw Silk.",
          te: "80 సెం.మీ (ఛాతీ < 38\") నుండి 1.0 మీటర్ (ఛాతీ ≥ 38\" లేదా పొడవు చేతులకు). అనువైన వస్త్రాలు: 2x2 రూబియా, కాటన్, లేదా రా సిల్క్."
        },
        notions: {
          en: "Hook and eye sets (6 pairs), matching bias piping strip (0.5 meter), lightweight canvas or fusing paper for neck/placket if desired.",
          te: "ఉక్సులు-కాజాల సెట్ (6 జతలు), 0.5 మీటర్ నెక్ పైపింగ్ క్రాస్ పీస్, మెడ బలం కోసం అవసరమైతే ఫ్యూజింగ్ పేపర్."
        },
        defaultMeasurements: {
          chest: 36,
          waist: 30,
          shoulder: 14,
          length: 14.5,
          hip: 38
        },
        measurementRanges: {
          chest: { min: 24, max: 56, recommended: "30\" - 44\"" },
          waist: { min: 20, max: 52, recommended: "24\" - 38\"" },
          shoulder: { min: 10, max: 20, recommended: "12\" - 16\"" },
          length: { min: 11, max: 20, recommended: "13\" - 16\"" },
          hip: { min: 26, max: 60, recommended: "32\" - 46\"" }
        },
        stitchingSteps: {
          en: [
            "Step 1: Stay-stitch front and back necklines 1/4\" inside the cut edge to prevent stretching.",
            "Step 2: Sew all 4 front darts on both right and left bodice panels, starting from the outside edge and tapering gently to the apex without backstitching.",
            "Step 3: Press all darts downward (waist dart) and toward center; press gently over a tailor's ham.",
            "Step 4: Attach the front plackets: 1.5\" extended eye placket on right side and 2.25\" turned-inside hook placket on left side.",
            "Step 5: Stitch front and back bodice together at the shoulders using a 1/2\" seam allowance; press seam allowances open or toward the back.",
            "Step 6: Finish the neckline using true 45° bias piping or shaped facing; turn and stitch neatly.",
            "Step 7: Hem the sleeve cuffs (1\" hem), align sleeve center notch with shoulder seam, and stitch sleeves into armholes.",
            "Step 8: Stitch the side seams with a generous 1.5\" margin for future body adjustments.",
            "Step 9: Turn up and hem the bottom edge (1.5\" margin) using blind hemming stitches; hand-sew hooks and thread eyes."
          ],
          te: [
            "స్టెప్ 1: ముందు మరియు వెనుక మెడ అంచులు సాగకుండా 1/4\" లోపలికి స్టే-స్టిచ్ వేయండి.",
            "స్టెప్ 2: ముందు రెండు భాగాల్లో 4 డాట్లను అంచు నుండి ప్రారంభించి ఎపెక్స్ వద్ద సన్నగా తేల్చి కుట్టండి.",
            "స్టెప్ 3: కుట్టిన డాట్లను ఐరన్ బాక్స్ తో మృదువుగా ప్రెస్ చేసి కప్ షేప్ సరిచూసుకోండి.",
            "స్టెప్ 4: ఉక్సుల పట్టీలు జత చేయండి: కుడివైపు 1.5\" కాజా పట్టీ, ఎడమవైపు 2.25\" లోపలికి మడిచే ఉక్సుల పట్టీ.",
            "స్టెప్ 5: ముందు మరియు వెనుక భుజాలను 1/2 అంగుళం కుట్టు మార్జిన్ తో గట్టిగా జత చేయండి.",
            "స్టెప్ 6: 45 డిగ్రీల క్రాస్ పీస్ తో మెడకు పైపింగ్ లేదా హెమ్మింగ్ పట్టీని కుట్టి నీట్ గా మలవండి.",
            "స్టెప్ 7: చేతుల కింద అంచులను మడిచి కుట్టి, భుజం సెంటర్ కు చేతి సెంటర్ సరిపోల్చి చంకలో చేతులు జత చేయండి.",
            "స్టెప్ 8: రెండు వైపులా సైడ్ కుట్లు వేయండి (భవిష్యత్తు లూజ్ కోసం 1.5 అంగుళాల మార్జిన్ వదలండి).",
            "స్టెప్ 9: కింద నడుము అంచును చేతితో హెమ్మింగ్ చేసి, చేతి సూదితో ఉక్సులు మరియు కాజాలు వేయండి."
          ]
        }
      },

      princess: {
        id: "princess",
        fabGarmentKey: "princess-blouse",
        title: {
          en: "Princess Cut Designer Blouse",
          te: "ప్రిన్సెస్ కట్ డిజైనర్ బ్లౌజ్"
        },
        subtitle: {
          en: "Sleek sculptural seam curving gracefully from the armhole through the bust apex to the waist.",
          te: "చంక నుండి ఎపెక్స్ మీదుగా నడుముకు అందంగా వంపు తిరిగే ప్రిన్సెస్ సీమ్ తో కూడిన బ్లౌజ్."
        },
        curriculumRef: "Indian Garment Design Course Book (Ch. 29, P. 84)",
        difficulty: { en: "Intermediate", te: "మధ్యస్థ స్థాయి" },
        duration: { en: "3 to 4 Days / 7 Hours", te: "3 నుండి 4 రోజులు / 7 గంటలు" },
        toolsNeeded: {
          en: [
            "Tailor's measuring tape",
            "Tailor's chalk or water-soluble marker",
            "Sharp fabric shears",
            "French curve ruler (essential for smooth princess arch)",
            "Pattern drafting paper",
            "Dressmaker pins",
            "Steam iron & tailor's pressing ham",
            "Sewing machine with size 14/90 needle",
            "Matching thread & hand sewing needle"
          ],
          te: [
            "టైలరింగ్ కొలత టేప్",
            "టైలర్స్ చాక్ లేదా వాటర్-సాల్యుబుల్ మార్కర్",
            "పదునైన ఫ్యాబ్రిక్ కత్తెర",
            "ఫ్రెంచ్ కర్వ్ స్కేల్ (ప్రిన్సెస్ కర్వ్ గీయడానికి తప్పనిసరి)",
            "ప్యాటర్న్ డ్రాఫ్టింగ్ పేపర్",
            "డ్రెస్ మేకర్ పిన్నులు",
            "స్టీమ్ ఐరన్ & ప్రెస్సింగ్ ప్యాడ్",
            "సైజ్ 14/90 సూదితో కూడిన కుట్టు మిషన్",
            "మ్యాచింగ్ దారం & చేతి సూది"
          ]
        },
        fabricRecommendation: {
          en: "1.0 to 1.25 meters. Suitable fabrics: Cotton silk, Chanderi, Brocade, or Satin with pure cotton lining.",
          te: "1.0 నుండి 1.25 మీటర్లు. అనువైన వస్త్రాలు: కాటన్ సిల్క్, చందేరి, బ్రొకేడ్, లేదా సాటిన్ (కాటన్ లైనింగ్ తో)."
        },
        notions: {
          en: "Back or front hooks (6 pairs) or invisible side zipper (7\"), matching piping cord (0.75 meter), soft bust cups/padding (optional).",
          te: "వెనుక లేదా ముందు ఉక్సులు (6 జతలు) లేదా 7\" సైడ్ ఇన్విజిబుల్ జిప్, పైపింగ్ తాడు (0.75 మీటర్), కప్ ప్యాడ్స్ (ఐచ్ఛికం)."
        },
        defaultMeasurements: {
          chest: 36,
          waist: 30,
          shoulder: 14,
          length: 14.5,
          hip: 38
        },
        measurementRanges: {
          chest: { min: 26, max: 54, recommended: "30\" - 44\"" },
          waist: { min: 20, max: 48, recommended: "24\" - 38\"" },
          shoulder: { min: 11, max: 19, recommended: "12\" - 16\"" },
          length: { min: 12, max: 18, recommended: "13\" - 16\"" },
          hip: { min: 28, max: 58, recommended: "32\" - 46\"" }
        },
        stitchingSteps: {
          en: [
            "Step 1: If using lining, baste the main fabric and lining together along all edges.",
            "Step 2: Pin the center front panel to the curved side cup panels, matching the apex balance notches first.",
            "Step 3: Stitch the princess curve seam starting from the waist upward to the armhole on both sides without stretching the curved bias edge.",
            "Step 4: Clip small V-notches into the curved seam allowance every 1 inch to release seam tension.",
            "Step 5: Press the princess seam over a tailor's pressing ham, pressing seam allowances toward the center.",
            "Step 6: Stitch back darts and join front and back shoulder seams (1/2\" seam allowance).",
            "Step 7: Finish neckline with bias corded piping or shaped facing.",
            "Step 8: Attach sleeves into armholes with gentle ease across the upper sleeve cap.",
            "Step 9: Stitch side seams (or insert invisible zipper if side-opening) with 1.5\" alterations margin; hem bottom edge."
          ],
          te: [
            "స్టెప్ 1: లైనింగ్ వాడితే, మెయిన్ క్లాత్ మరియు లైనింగ్ లను కలిపి అంచుల వెంబడి తాత్కాలిక కుట్టు (Basting) వేయండి.",
            "స్టెప్ 2: సెంటర్ ప్యానెల్ మరియు సైడ్ కప్ పీసులను ఎపెక్స్ నాచ్ వద్ద పిన్నులతో సరిగ్గా కలపండి.",
            "స్టెప్ 3: ప్రిన్సెస్ కర్వ్ కుట్టును ఎల్లప్పుడూ కింద నడుము నుంచే పైకి చంక వైపుకు కుట్టండి (బట్టను సాగదీయవద్దు).",
            "స్టెప్ 4: కర్వ్ కుట్టు లూజ్ గా సాఫీగా కూర్చోవడానికి కుట్టు మార్జిన్ లో చిన్న చిన్న కట్స్ (Notches) పెట్టండి.",
            "స్టెప్ 5: ప్రెస్సింగ్ ప్యాడ్ పై ఉంచి ఐరన్ బాక్స్ తో కర్వ్ ను మృదువుగా ప్రెస్ చేయండి.",
            "స్టెప్ 6: వెనుక భాగంలో డాట్స్ వేసి, ముందు మరియు వెనుక భుజాలను జత చేయండి.",
            "స్టెప్ 7: మెడకు పైపింగ్ లేదా ఫేసింగ్ వేసి అందంగా పూర్తి చేయండి.",
            "స్టెప్ 8: చేతులను చంకలో జత చేయండి.",
            "స్టెప్ 9: సైడ్ కుట్లు వేసి (లేదా సైడ్ జిప్ అమర్చి) కింద అంచును ఎమ్మింగ్ చేయండి."
          ]
        }
      },

      kameez: {
        id: "kameez",
        fabGarmentKey: "plain-kameez",
        title: {
          en: "Plain Kameez / Kurti with Side Slits",
          te: "సాధారణ కమీజ్ / కుర్తీ (సైడ్ స్లిట్స్ తో)"
        },
        subtitle: {
          en: "Classic Indian tunic silhouette with bust/waist shaping, hip flare, and reinforced chaak side slits.",
          te: "ఛాతీ, నడుము షేపింగ్, హిప్ ఫ్లేర్ మరియు సైడ్ చాక్ స్లిట్స్ తో కూడిన ప్రామాణిక కుర్తీ."
        },
        curriculumRef: "Indian Garment Design Course Book (Ch. 35, P. 94)",
        difficulty: { en: "Beginner to Intermediate", te: "బిగినర్ నుండి మధ్యస్థం" },
        duration: { en: "3 Days / 6 Hours", te: "3 రోజులు / 6 గంటలు" },
        toolsNeeded: {
          en: [
            "Tailor's measuring tape",
            "Tailor's chalk",
            "Long fabric cutting shears",
            "L-square / long tailoring ruler",
            "Dressmaker pins",
            "Steam iron",
            "Sewing machine with size 14/90 needle",
            "Matching thread & buckram / fusing paper for neckline design"
          ],
          te: [
            "టైలరింగ్ కొలత టేప్",
            "టైలర్స్ చాక్",
            "పొడవైన ఫ్యాబ్రిక్ కత్తెర",
            "ఎల్-స్క్వేర్ లేదా పొడవైన స్కేల్",
            "డ్రెస్ మేకర్ పిన్నులు",
            "స్టీమ్ ఐరన్",
            "సైజ్ 14/90 సూదితో కూడిన కుట్టు మిషన్",
            "మ్యాచింగ్ దారం & నెక్ డిజైన్ కోసం కాన్వాస్ / బక్రమ్ పేపర్"
          ]
        },
        fabricRecommendation: {
          en: "2.0 to 2.5 meters (for 44\" roll width). Best fabrics: Pure Cotton, Linen, Cambric, Khadi, or Georgette.",
          te: "2.0 నుండి 2.5 మీటర్లు (44\" పన్నాకు). అనువైన వస్త్రాలు: కాటన్, లినెన్, ఖాదీ, లేదా జార్జెట్."
        },
        notions: {
          en: "Buckram / iron-on canvas for front neck shape (0.25m), buttons or tassels for front slit, matching hemming thread.",
          te: "నెక్ డిజైన్ కోసం బక్రమ్ / కాన్వాస్ (0.25 మీటర్), ఫ్రంట్ షో బటన్లు, మ్యాచింగ్ దారం."
        },
        defaultMeasurements: {
          chest: 36,
          waist: 30,
          shoulder: 14,
          length: 38,
          hip: 38
        },
        measurementRanges: {
          chest: { min: 26, max: 56, recommended: "30\" - 46\"" },
          waist: { min: 22, max: 50, recommended: "26\" - 42\"" },
          shoulder: { min: 11, max: 19, recommended: "12\" - 16\"" },
          length: { min: 28, max: 50, recommended: "34\" - 44\"" },
          hip: { min: 28, max: 60, recommended: "34\" - 48\"" }
        },
        stitchingSteps: {
          en: [
            "Step 1: Cut front neck pattern on buckram/fusing, press onto facing fabric, and stitch neckline cleanly to front bodice; turn inside and topstitch.",
            "Step 2: Finish back neckline with bias strip facing.",
            "Step 3: Join front and back shoulder seams (1/2\" seam allowance); reinforce with double stitching.",
            "Step 4: Prepare sleeves: hem lower cuffs (1.5\" hem), match center notch to shoulder, and stitch sleeves into open armholes.",
            "Step 5: Stitch side seams starting from sleeve cuff, down through chest and waist, stopping exactly at the hip slit notch (chaak).",
            "Step 6: Backstitch securely at the slit turning point to reinforce this high-stress zone.",
            "Step 7: Fold and press side slits (chaak) twice (1/2\" fold); edgestitch neatly down one side, across the top pivot, and down the other side.",
            "Step 8: Turn up and stitch bottom front and back hems (1.5\" hem allowance); press entire garment thoroughly."
          ],
          te: [
            "స్టెప్ 1: బక్రమ్ పై ముందు మెడ డిజైన్ కట్ చేసి, క్లాత్ కు ఐరన్ చేసి, ముందు భాగానికి కుట్టి లోపలికి తిప్పి నెక్ పూర్తి చేయండి.",
            "స్టెప్ 2: వెనుక మెడకు క్రాస్ పీస్ తో ఫేసింగ్ వేసి తిప్పండి.",
            "స్టెప్ 3: ముందు మరియు వెనుక భుజాలను జత చేసి డబుల్ కుట్టు వేయండి.",
            "స్టెప్ 4: చేతుల కింద అంచులను మడిచి కుట్టి, చంక రౌండ్ కు చేతులను జత చేయండి.",
            "స్టెప్ 5: చేతి చివర నుండి ప్రారంభించి ఛాతీ, నడుము మీదుగా హిప్ స్లిట్ (చాక్) మార్క్ వద్దకు సైడ్ కుట్టు వేయండి.",
            "స్టెప్ 6: సైడ్ స్లిట్ మొదలయ్యే చోట కుట్టు ఊడకుండా గట్టిగా రివర్స్ కుట్టు (Backstitch) వేయండి.",
            "స్టెప్ 7: సైడ్ స్లిట్స్ (చాక్ పట్టీలు) రెండు మడతలుగా మడిచి చివరన సన్నని ఎడ్జ్ స్టిచ్ వేయండి.",
            "స్టెప్ 8: కింద బాటమ్ గేరా అంచును 1.5\" మడిచి కుట్టి, డ్రెస్ మొత్తాన్ని స్టీమ్ ఐరన్ తో ప్రెస్ చేయండి."
          ]
        }
      },

      top: {
        id: "top",
        fabGarmentKey: "western-top",
        title: {
          en: "Western Panel Shirt/Top with Mandarin Collar",
          te: "వెస్ట్రన్ ప్యానెల్ షర్ట్/టాప్ (మాండరిన్ కాలర్ తో)"
        },
        subtitle: {
          en: "Modern casual silhouette with button placket, curved shirt hemline, and stand-up Mandarin collar.",
          te: "ఫ్రంట్ బటన్ పట్టీ, కర్వ్డ్ హెమ్‌లైన్ మరియు చైనీస్ మాండరిన్ కాలర్ తో కూడిన క్యాజువల్ టాప్."
        },
        curriculumRef: "Western Casual Wear Course Book (Ch. 14, P. 48)",
        difficulty: { en: "Intermediate", te: "మధ్యస్థ స్థాయి" },
        duration: { en: "3 to 4 Days / 7 Hours", te: "3 నుండి 4 రోజులు / 7 గంటలు" },
        toolsNeeded: {
          en: [
            "Tailor's measuring tape",
            "Tailor's chalk or disappearing pen",
            "Fabric cutting shears",
            "Curved hip styling ruler for hemline arch",
            "Dressmaker pins",
            "Steam iron",
            "Sewing machine with size 11/75 or 14/90 needle",
            "Matching thread, iron-on shirt collar fusing, buttons"
          ],
          te: [
            "టైలరింగ్ కొలత టేప్",
            "టైలర్స్ చాక్ లేదా మార్కర్",
            "క్లాత్ కత్తెర",
            "కర్వ్డ్ హెమ్‌లైన్ గీయడానికి ఆర్చ్ స్కేల్",
            "డ్రెస్ మేకర్ పిన్నులు",
            "స్టీమ్ ఐరన్",
            "కుట్టు మిషన్ (సైజ్ 11/75 లేదా 14/90 సూది)",
            "మ్యాచింగ్ దారం, కాలర్ ఫ్యూజింగ్ కాన్వాస్, షర్ట్ బటన్లు"
          ]
        },
        fabricRecommendation: {
          en: "1.75 to 2.0 meters (for 44\" roll width). Best fabrics: Poplin, Chambray, Oxford Cotton, Viscose Rayon, or Soft Linen.",
          te: "1.75 నుండి 2.0 మీటర్లు (44\" పన్నాకు). అనువైన వస్త్రాలు: పాప్లిన్, ఛాంబ్రే, ఆక్స్‌ఫర్డ్ కాటన్, లేదా విస్కోస్ రేయాన్."
        },
        notions: {
          en: "Iron-on collar interfacing (0.25 meter), 5 to 7 shirt buttons (1/2\" diameter), matching thread.",
          te: "కాలర్ కోసం ఐరన్-ఆన్ ఇంటర్‌ఫేసింగ్ (0.25 మీటర్), 5 నుండి 7 బటన్లు (1/2\" సైజ్), మ్యాచింగ్ దారం."
        },
        defaultMeasurements: {
          chest: 36,
          waist: 30,
          shoulder: 14,
          length: 25,
          hip: 38
        },
        measurementRanges: {
          chest: { min: 26, max: 54, recommended: "30\" - 44\"" },
          waist: { min: 22, max: 48, recommended: "24\" - 40\"" },
          shoulder: { min: 11, max: 19, recommended: "12\" - 16\"" },
          length: { min: 20, max: 32, recommended: "23\" - 28\"" },
          hip: { min: 28, max: 58, recommended: "32\" - 46\"" }
        },
        stitchingSteps: {
          en: [
            "Step 1: Fold and press front button plackets: 1\" fold on right side (buttonhole band) and left side (button band); interface if lightweight.",
            "Step 2: Sew back yoke (if using panel design) to back body panel; topstitch seam neatly.",
            "Step 3: Join front and back shoulder seams (1/2\" seam allowance); press allowances toward back.",
            "Step 4: Prepare Mandarin collar: fuse interfacing to outer collar stand, stitch around curved ends with right sides together, clip curves, turn right side out, and press.",
            "Step 5: Attach outer collar stand to shirt neckline starting from center back out to placket edges; fold inner collar allowance inside and topstitch closed.",
            "Step 6: Attach sleeves with gentle ease into armholes.",
            "Step 7: Stitch side seams from sleeve cuff down to curved hem.",
            "Step 8: Hem the curved shirt-tail hemline using a narrow 1/4\" double-rolled hem.",
            "Step 9: Mark buttonhole positions evenly down front placket, stitch buttonholes on right placket, and sew buttons on left placket."
          ],
          te: [
            "స్టెప్ 1: ముందు బటన్ పట్టీలను 1 అంగుళం మడిచి ఐరన్ చేయండి (కుడివైపు కాజాల పట్టీ, ఎడమవైపు బటన్ల పట్టీ).",
            "స్టెప్ 2: వెనుక యోక్ ప్యానెల్ ను వెనుక బాడీ పీస్ కు జత చేసి పైన టాప్‌స్టిచ్ వేయండి.",
            "స్టెప్ 3: ముందు మరియు వెనుక భుజాలను జత చేసి వెనుక వైపుకు ప్రెస్ చేయండి.",
            "స్టెప్ 4: మాండరిన్ కాలర్ తయారు చేయండి: ఫ్యూజింగ్ కాన్వాస్ అంటించి, రెండు పీసులను కలిపి చివర్ల కర్వ్స్ కుట్టి, తిప్పి ఐరన్ చేయండి.",
            "స్టెప్ 5: కాలర్ ను షర్ట్ నెక్ రౌండ్ కు సెంటర్ నుండి సమానంగా జత చేసి ఎడ్జ్ స్టిచ్ వేయండి.",
            "స్టెప్ 6: చేతులను చంకలో జత చేయండి.",
            "స్టెప్ 7: చేతి చివర నుండి కర్వ్డ్ హెమ్ వరకు సైడ్ కుట్లు వేయండి.",
            "స్టెప్ 8: కింద కర్వ్డ్ హెమ్‌లైన్ ను సన్నగా 1/4 అంగుళం డబుల్ ఫోల్డ్ చేసి కుట్టండి.",
            "స్టెప్ 9: ఫ్రంట్ పట్టీపై బటన్ హోల్స్ మార్క్ చేసి కుట్టి, ఎదురుగా బటన్లు కుట్టండి."
          ]
        }
      }
    };

    // Initial state
    this.state = this.loadState();
  }

  getDefaultState() {
    return {
      stage: 1,
      selectedGarment: "blouse",
      unit: "inches", // 'inches' or 'cm'
      measurements: {
        chest: 36,
        waist: 30,
        shoulder: 14,
        length: 14.5,
        hip: 38
      },
      fabricWidth: 44,
      stitchingProgress: {}, // { blouse: [0, 1], princess: [] }
      notes: "",
      lastSaved: Date.now()
    };
  }

  loadState() {
    try {
      const saved = localStorage.getItem("stitchable_project");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults in case of missing keys
        return {
          ...this.getDefaultState(),
          ...parsed,
          measurements: {
            ...this.getDefaultState().measurements,
            ...(parsed.measurements || {})
          },
          stitchingProgress: parsed.stitchingProgress || {}
        };
      }
    } catch (e) {
      console.warn("Could not load saved project from localStorage:", e);
    }
    return this.getDefaultState();
  }

  saveState() {
    try {
      this.state.lastSaved = Date.now();
      localStorage.setItem("stitchable_project", JSON.stringify(this.state));
      return true;
    } catch (e) {
      console.warn("Failed to persist project in localStorage:", e);
      return false;
    }
  }

  resetProject() {
    this.state = this.getDefaultState();
    this.saveState();
  }

  setGarment(garmentId) {
    if (this.supportedGarments[garmentId]) {
      this.state.selectedGarment = garmentId;
      const def = this.supportedGarments[garmentId].defaultMeasurements;
      // Update length to garment-specific default if currently using previous garment's default
      if (def) {
        this.state.measurements.length = def.length;
      }
      this.saveState();
    }
  }

  setStage(stageNum) {
    if (stageNum >= 1 && stageNum <= 7) {
      this.state.stage = stageNum;
      this.saveState();
    }
  }

  setUnit(unit) {
    if (unit === "inches" || unit === "cm") {
      if (this.state.unit !== unit) {
        // Convert current measurements
        const factor = unit === "cm" ? 2.54 : 1 / 2.54;
        const newMeasurements = {};
        for (const [k, v] of Object.entries(this.state.measurements)) {
          newMeasurements[k] = parseFloat((v * factor).toFixed(1));
        }
        this.state.measurements = newMeasurements;
        this.state.unit = unit;
        this.saveState();
      }
    }
  }

  updateMeasurements(newVals) {
    this.state.measurements = {
      ...this.state.measurements,
      ...newVals
    };
    this.saveState();
  }

  setFabricWidth(width) {
    this.state.fabricWidth = parseInt(width) || 44;
    this.saveState();
  }

  toggleStitchingStep(stepIndex) {
    const garment = this.state.selectedGarment;
    if (!this.state.stitchingProgress[garment]) {
      this.state.stitchingProgress[garment] = [];
    }
    const list = this.state.stitchingProgress[garment];
    const idx = list.indexOf(stepIndex);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(stepIndex);
    }
    this.saveState();
  }

  isStepCompleted(stepIndex) {
    const garment = this.state.selectedGarment;
    const list = this.state.stitchingProgress[garment] || [];
    return list.includes(stepIndex);
  }

  getCompletedStepsCount() {
    const garment = this.state.selectedGarment;
    const list = this.state.stitchingProgress[garment] || [];
    return list.length;
  }

  getTotalStepsCount() {
    const garment = this.supportedGarments[this.state.selectedGarment];
    return garment ? garment.stitchingSteps.en.length : 0;
  }

  setNotes(notes) {
    this.state.notes = notes;
    this.saveState();
  }

  /**
   * Validate measurements for missing, zero, negative or implausible values.
   * Returns { isValid: boolean, errors: { [field]: string }, normalizedInches: { ... } }
   */
  validateMeasurements(measurements, unit = this.state.unit) {
    const errors = {};
    const isTe = this.getLang() === "te";
    const garmentInfo = this.supportedGarments[this.state.selectedGarment];
    const ranges = garmentInfo ? garmentInfo.measurementRanges : {};

    const fields = [
      { key: "chest", label: isTe ? "ఛాతీ చుట్టుకొలత (Chest)" : "Chest / Bust Round" },
      { key: "waist", label: isTe ? "నడుము చుట్టుకొలత (Waist)" : "Waist Round" },
      { key: "shoulder", label: isTe ? "భుజం వెడల్పు (Shoulder)" : "Across Shoulder" },
      { key: "length", label: isTe ? "దుస్తుల పొడవు (Length)" : "Garment Length" },
      { key: "hip", label: isTe ? "హిప్ చుట్టుకొలత (Hip)" : "Hip Round" }
    ];

    const normalizedInches = {};

    fields.forEach(({ key, label }) => {
      const rawVal = measurements[key];
      const num = parseFloat(rawVal);

      if (rawVal === undefined || rawVal === null || rawVal === "" || isNaN(num)) {
        errors[key] = isTe ? `${label} కొలత నమోదు చేయాలి.` : `${label} is required.`;
        return;
      }

      if (num <= 0) {
        errors[key] = isTe ? `${label} కొలత 0 కంటే ఎక్కువ ఉండాలి.` : `${label} must be greater than zero.`;
        return;
      }

      // Convert to inches for standard anatomical validation
      const inInches = unit === "cm" ? num / 2.54 : num;
      normalizedInches[key] = inInches;

      const r = ranges[key];
      if (r) {
        if (inInches < r.min || inInches > r.max) {
          const minDisplay = unit === "cm" ? (r.min * 2.54).toFixed(0) : r.min;
          const maxDisplay = unit === "cm" ? (r.max * 2.54).toFixed(0) : r.max;
          errors[key] = isTe
            ? `${label} కొలత చాలా అసహజంగా ఉంది (${minDisplay} నుండి ${maxDisplay} ${unit} మధ్య ఉండాలి).`
            : `${label} appears implausible (${minDisplay} - ${maxDisplay} ${unit} expected).`;
        }
      }
    });

    // Anatomical relational checks
    if (!errors.waist && !errors.chest && normalizedInches.waist && normalizedInches.chest) {
      if (normalizedInches.waist > normalizedInches.chest + 14) {
        errors.waist = isTe
          ? "నడుము కొలత ఛాతీ కన్నా చాలా ఎక్కువగా ఉంది. దయచేసి సరిచూసుకోండి."
          : "Waist measurement significantly exceeds chest; please re-verify.";
      }
    }

    if (!errors.shoulder && !errors.chest && normalizedInches.shoulder && normalizedInches.chest) {
      if (normalizedInches.shoulder > normalizedInches.chest * 0.75) {
        errors.shoulder = isTe
          ? "భుజం వెడల్పు ఛాతీతో పోలిస్తే అసాధారణంగా ఎక్కువగా ఉంది."
          : "Shoulder measurement appears unusually wide relative to chest.";
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      normalizedInches
    };
  }

  /**
   * Get current project's pattern calculations using DraftingCalculator
   */
  getPatternCalculations() {
    const norm = this.getMeasurementsInInches();
    return this.calculator.calculate({
      chest: norm.chest,
      waist: norm.waist,
      hip: norm.hip,
      shoulder: norm.shoulder,
      length: norm.length,
      garmentType: this.state.selectedGarment
    });
  }

  /**
   * Get current project's fabric estimate using FabricEstimator
   */
  getFabricEstimate() {
    const garmentKey = this.supportedGarments[this.state.selectedGarment].fabGarmentKey;
    const norm = this.getMeasurementsInInches();

    // Map chest to size category
    let sizeCat = "m";
    if (norm.chest < 34) sizeCat = "s";
    else if (norm.chest > 42) sizeCat = "xl";
    else if (norm.chest > 38) sizeCat = "l";

    // Map height based on length
    let heightCat = "medium";
    if (this.state.selectedGarment === "kameez") {
      if (norm.length > 42) heightCat = "tall";
      else if (norm.length < 36) heightCat = "petite";
    }

    return this.fabricEstimator.estimate({
      garmentType: garmentKey,
      rollWidth: this.state.fabricWidth,
      heightCategory: heightCat,
      sizeCategory: sizeCat
    });
  }

  getMeasurementsInInches() {
    const { unit, measurements } = this.state;
    if (unit === "inches") {
      return {
        chest: parseFloat(measurements.chest) || 36,
        waist: parseFloat(measurements.waist) || 30,
        shoulder: parseFloat(measurements.shoulder) || 14,
        length: parseFloat(measurements.length) || 14.5,
        hip: parseFloat(measurements.hip) || 38
      };
    } else {
      return {
        chest: parseFloat((measurements.chest / 2.54).toFixed(2)) || 36,
        waist: parseFloat((measurements.waist / 2.54).toFixed(2)) || 30,
        shoulder: parseFloat((measurements.shoulder / 2.54).toFixed(2)) || 14,
        length: parseFloat((measurements.length / 2.54).toFixed(2)) || 14.5,
        hip: parseFloat((measurements.hip / 2.54).toFixed(2)) || 38
      };
    }
  }
}
