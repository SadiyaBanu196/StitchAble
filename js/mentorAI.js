/**
 * STITCHABLE - Master Ji AI Tailoring Mentor Engine
 * Provides context-aware doubt clarification in English and Telugu.
 * Supports:
 * 1. Active Garment Project contextual explanations (using real user measurements & formulas)
 * 2. Deterministic tailoring pedagogy ("Why is this step necessary?", "Why ease?")
 * 3. Prevention of common beginner tailoring mistakes
 * 4. Local Expert Knowledge Engine with graceful offline/API failure handling
 * 5. Optional backend proxy (/api/mentor) or user-provided Gemini/Groq API key
 */

export class MentorAI {
  constructor(getLang, getActiveProject = null) {
    this.getLang = getLang;
    this.getActiveProject = getActiveProject;
    this.apiKey = localStorage.getItem("stitchable_api_key") || "";
    this.speechSynth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.currentUtterance = null;
  }

  setApiKey(key) {
    this.apiKey = key.trim();
    localStorage.setItem("stitchable_api_key", this.apiKey);
  }

  getApiKey() {
    return this.apiKey;
  }

  async askQuestion(query) {
    const lang = this.getLang();
    const cleanQuery = query.trim().toLowerCase();
    const project = this.getActiveProject ? this.getActiveProject() : null;

    // 1. First, check if backend API proxy is available (e.g. from server.py with GEMINI_API_KEY)
    try {
      const serverRes = await this.callServerMentorProxy(query, lang, project);
      if (serverRes) return serverRes;
    } catch (e) {
      // Backend not running or endpoint not supported; continue
    }

    // 2. If client-side API key is configured by user, call external API directly
    if (this.apiKey) {
      try {
        const liveResponse = await this.callExternalLLM(query, lang, project);
        if (liveResponse) return liveResponse;
      } catch (err) {
        console.warn("External API call failed, falling back to local expert mentor:", err);
      }
    }

    // 3. Fallback to Local Expert Knowledge Base Engine (Context-Aware)
    return this.generateExpertAnswer(cleanQuery, lang, project);
  }

  async callServerMentorProxy(query, lang, project) {
    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query,
          lang,
          projectContext: project ? {
            garment: project.state?.selectedGarment,
            unit: project.state?.unit,
            measurements: project.getMeasurementsInInches ? project.getMeasurementsInInches() : project.state?.measurements,
            stage: project.state?.stage
          } : null
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.content) {
          return {
            title: data.title || (lang === "te" ? "మాస్టర్ జీ ప్రత్యక్ష సమాధానం" : "Master Ji Tailoring Analysis"),
            content: data.content,
            actionTag: data.actionTag || (lang === "te" ? "లైవ్ AI మెంటర్" : "Live AI Mentor")
          };
        }
      }
    } catch (err) {
      // Server endpoint not reachable, return null to continue to expert engine
    }
    return null;
  }

  generateExpertAnswer(q, lang, project = null) {
    const isTe = lang === "te" || /[\u0C00-\u0C7F]/.test(q);

    // Extract active project details if available
    let projectContextNote = "";
    let activeGarment = null;
    let normMeasurements = null;
    let patternCalc = null;

    if (project && project.getMeasurementsInInches) {
      normMeasurements = project.getMeasurementsInInches();
      activeGarment = project.state?.selectedGarment;
      try {
        patternCalc = project.getPatternCalculations();
      } catch (e) {
        // patternCalc optional
      }
    }

    // Context query: Inquiries about current project or measurements or calculations
    const asksAboutProject = q.includes("my project") || q.includes("my garment") || q.includes("my measurement") ||
      q.includes("my blouse") || q.includes("my kurti") || q.includes("నా ప్రాజెక్ట్") || q.includes("నా కొలత") ||
      q.includes("calculate my") || q.includes("my armhole") || q.includes("my chest") || q.includes("my fabric");

    if (asksAboutProject && project && normMeasurements) {
      const gName = project.supportedGarments[activeGarment]?.title[lang] || activeGarment;
      const c = normMeasurements.chest;
      const w = normMeasurements.waist;
      const s = normMeasurements.shoulder;
      const l = normMeasurements.length;
      const armhole = (c / 6 + 0.5).toFixed(2);
      const bustLine = (c / 4 + 1.5).toFixed(2);
      const neckWidth = (c / 12).toFixed(2);

      return isTe ? {
        title: `మీ ప్రస్తుత ప్రాజెక్ట్: ${gName} విశ్లేషణ`,
        content: `మీరు నమోదు చేసిన కొలతలు: ఛాతీ = ${c}", నడుము = ${w}", భుజం = ${s}", పొడవు = ${l}".
ఈ ప్రాజెక్ట్ కొరకు ఖచ్చితమైన టైలరింగ్ లెక్కలు:
1. **చంక లోతు (Armhole Depth):** ${c} / 6 + 0.5" = **${armhole} అంగుళాలు** (${(armhole * 2.54).toFixed(1)} cm).
   *ఎందుకు ఈ ఫార్ములా?* ఇది చేతి కదలికలకు పూర్తి స్వేచ్ఛను ఇస్తూ, చంక కింద గుడ్డ బిగుతు కాకుండా సౌకర్యంగా ఉండేలా చేస్తుంది.
2. **ఛాతీ లైన్ (+1.5" లూజ్ తో):** ${c} / 4 + 1.5" = **${bustLine} అంగుళాలు** (${(bustLine * 2.54).toFixed(1)} cm).
   *ఎందుకు 1.5" లూజ్ (Ease)?* మానవ శరీరం శ్వాస తీసుకున్నప్పుడు ఛాతీ వ్యాకోచిస్తుంది; లూజ్ ఇవ్వకపోతే సైడ్ కుట్లు తెగిపోతాయి.
3. **మెడ వెడల్పు (Neck Width):** ${c} / 12 = **${neckWidth} అంగుళాలు** (${(neckWidth * 2.54).toFixed(1)} cm).
   *సలహా:* దీనికన్నా ఎక్కువ పెడితే బ్లౌజ్ భుజాలు జారిపోతాయి.`,
        actionTag: "ప్రాజెక్ట్ విశ్లేషణ"
      } : {
        title: `Your Active Project: ${gName} Breakdown`,
        content: `Based on your saved project dimensions (Chest = ${c}\", Waist = ${w}\", Shoulder = ${s}\", Length = ${l}\"):
1. **Armhole Depth:** ${c} / 6 + 0.5\" = **${armhole} inches** (${(armhole * 2.54).toFixed(1)} cm).
   *Why this formula?* It creates a balanced armhole depth allowing full 360° arm reach without pulling the side bodice upward.
2. **Bust Line (+1.5\" Ease):** ${c} / 4 + 1.5\" = **${bustLine} inches** (${(bustLine * 2.54).toFixed(1)} cm).
   *Why ease is essential:* When breathing and moving, the rib cage expands. Adding 1.5\" wearing ease prevents strain on darts and side seams.
3. **Neck Width:** ${c} / 12 = **${neckWidth} inches** (${(neckWidth * 2.54).toFixed(1)} cm).
   *Rule of thumb:* Never exceed Chest / 12 on deep neck blouses to prevent shoulder slippage.`,
        actionTag: "Project Diagnostics"
      };
    }

    // 1. Blouse shoulder falling
    if (q.includes("shoulder") || q.includes("భుజం") || q.includes("జారిపో") || q.includes("falling") || q.includes("slip")) {
      return isTe ? {
        title: "భుజాలు జారిపోకుండా ఉండటానికి 4 గోల్డెన్ టిప్స్",
        content: `బ్లౌజ్ లేదా కుర్తీ భుజాలు జారడానికి ప్రధాన కారణాలు మరియు పరిష్కారాలు:
1. **మెడ వెడల్పు (Neck Width):** ఛాతీ/12 కంటే ఎక్కువ పెట్టకూడదు. ఉదాహరణకు 36" ఛాతీకి మెడ వెడల్పు గరిష్టంగా 2.25" మాత్రమే పెట్టాలి.
2. **షోల్డర్ స్లోప్ (Shoulder Slope):** డీప్ నెక్ (8" కంటే ఎక్కువ) ఉన్నప్పుడు భుజం వైపు కాకుండా మెడ వైపు 1/4" క్రాస్ తీయాలి.
3. **ముందు చంక లోతు (Front Armhole Depth):** ముందు భాగంలో తప్పనిసరిగా 1/2" లోతు తీయాలి. లేదంటే చంక వద్ద బట్ట మిగిలి భుజాలను కిందికి లాగుతుంది.
4. **చేతి అంచు కుట్టు:** స్లీవ్స్ జత చేసేటప్పుడు భుజం కుట్టును కరెక్ట్ గా మధ్యలో ఉంచాలి.`,
        actionTag: "బ్లౌజ్ ఆల్టరేషన్"
      } : {
        title: "4 Golden Rules to Prevent Shoulder Slipping",
        content: `Here is the master tailor solution to fix shoulder drooping on blouses and kurtis:
1. **Neck Width Formula:** Strictly keep neck width to Chest / 12. For 36\" bust, never exceed 2.25\" width.
2. **Reverse Shoulder Slope for Deep Necks:** If back neck depth is > 8\", slope the shoulder 1/4\" *toward the neck* rather than toward the armhole.
3. **Scoop Front Armhole:** Cut the front armhole 0.5\" deeper than the back armhole. Excess fabric around the chest drags shoulders outward.
4. **Snug Back Darts:** Increase back waist dart intake by 0.25\" on both sides to anchor the garment firmly across the upper shoulder blades.`,
        actionTag: "Blouse Alteration"
      };
    }

    // 2. Princess Cut Blouse
    if (q.includes("princess") || q.includes("ప్రిన్సెస్") || q.includes("కప్") || q.includes("cup")) {
      return isTe ? {
        title: "ప్రిన్సెస్ కట్ బ్లౌజ్ పర్ఫెక్ట్ డ్రాఫ్టింగ్ ఫార్ములా",
        content: `ప్రిన్సెస్ కట్ బ్లౌజ్ లో కప్ షేప్ రౌండ్ గా కూర్చోవడానికి సూత్రాలు:
1. **ఎపెక్స్ పాయింట్ (Apex Point):** భుజం పై నుండి కిందకు (ఛాతీ/4 + 1.5\"). సెంటర్ మడత నుండి లోపలికి 3.5\" నుండి 3.75\" మార్క్ చేయండి.
2. **చంక కర్వ్ (Armhole Curve):** ముందు చంక రౌండ్ లో మధ్య భాగం నుండి ఎపెక్స్ కు ఫ్రెంచ్ కర్వ్ తో ఆర్క్ గీయండి.
3. **నడుము డాట్ స్పేస్:** నడుము వద్ద 2 అంగుళాల గ్యాప్ తీసివేయాలి; దీనివల్ల 3D కప్ షేప్ వస్తుంది.
4. **కుట్టే విధానం:** ఎల్లప్పుడూ కింద నడుము నుంచే పైకి చంక వైపుకు కుట్టాలి. సాగదీయకుండా కుడితే రెండు వైపులా సమానంగా వస్తుంది.`,
        actionTag: "ప్రిన్సెస్ కట్ గైడ్"
      } : {
        title: "Precision Princess Cut Blouse Drafting Formula",
        content: `Here are the exact drafting rules from Chapter 29 of the Indian Garment Course:
1. **Apex Coordinates:** Vertical distance = Chest / 4 + 1.5\" (typically 9.5\" - 10.5\"). Horizontal distance from centre front = 3.5\" for size 34-36, 3.75\" for size 38-40.
2. **Armhole Curve Intersection:** Connect apex point smoothly to the front armhole at exactly 1/3 to 1/2 of its total height using a French curve.
3. **Waist Dart Intake:** Remove 2\" to 2.5\" of width between apex and waist to create full conical volume.
4. **Sewing Sequence:** Always sew the princess seam from waist upward to armhole without stretching the curved seam edge.`,
        actionTag: "Princess Cut Guide"
      };
    }

    // 3. Why ease / seam allowance is necessary
    if (q.includes("ease") || q.includes("లూజ్") || q.includes("margin") || q.includes("allowance") || q.includes("ఎందుకు")) {
      return isTe ? {
        title: "టైలరింగ్ లో ఈజ్ (Ease) మరియు కుట్టు మార్జిన్ ఎందుకు అవసరం?",
        content: `కొలతలకు అదనంగా బట్ట ఎందుకు కలుపుతామో అర్థం చేసుకోవడం చాలా ముఖ్యం:
1. **బాడీ కొలతలు vs గార్మెంట్ కొలతలు:** శరీరం కొలత (Pure Body) కంటే బట్ట కనీసం 1.5" నుండి 2.5" పెద్దదిగా ఉండాలి. దీనిని **వేరింగ్ ఈజ్ (Wearing Ease)** అంటారు. ఇది కూర్చోవడానికి, శ్వాస తీసుకోవడానికి అవసరం.
2. **సైడ్ సీమ్ మార్జిన్ (1.5\"):** సాధారణంగా సైడ్స్ లో 1.5 అంగుళాలు వదులుతారు. దీనివల్ల భవిష్యత్తులో బరువు పెరిగినా కుట్లు విప్పి సులభంగా లూజ్ చేసుకోవచ్చు.
3. **చంక & భుజం మార్జిన్ (0.5\"):** ఇక్కడ 1/2 అంగుళం కంటే ఎక్కువ ఉంచకూడదు; ఎక్కువ గుడ్డ ఉంచితే చంక వద్ద పోగుపడి అసౌకర్యంగా ఉంటుంది.`,
        actionTag: "ఈజ్ & మార్జిన్ వివరణ"
      } : {
        title: "Why Ease & Seam Allowances are Critical in Pattern Making",
        content: `Understanding the difference between raw body dimensions and finished garment dimensions:
1. **Wearing Ease (+1.5\" to +2.5\"):** Skin-tight garments split under dynamic movement. Ease accommodates lung inhalation and shoulder rotation.
   - Traditional Blouse: +1.5\" ease
   - Kurti / Kameez: +2.0\" ease
   - Western Top: +2.5\" ease
2. **Side Seam Allowance (1.5\"):** Generous 1.5\" side margins provide safety insurance for future alterations.
3. **Armhole & Shoulder Allowance (0.5\"):** Keep precisely to 0.5\". Too much seam allowance inside the curved armhole creates uncomfortable bulky ridges.`,
        actionTag: "Pattern Science"
      };
    }

    // 4. Common beginner tailoring mistakes
    if (q.includes("mistake") || q.includes("తప్పు") || q.includes("beginner") || q.includes("problem") || q.includes("జాగ్రత్త")) {
      return isTe ? {
        title: "కొత్తగా కుట్టేవారు చేసే 5 సాధారణ తప్పులు & పరిష్కారాలు",
        content: `ప్రారంభకులు ఎక్కువగా చేసే తప్పులు మరియు వాటి నివారణ:
1. **బట్టను ఉతకకుండా కట్ చేయడం:** కాటన్ మరియు రేయాన్ బట్టలు ఉతికినప్పుడు 3-5% ముడుచుకుంటాయి (Shrinkage). కుట్టకముందే చల్లటి నీటిలో నానబెట్టి, ఆరబెట్టి, ఐరన్ చేయాలి.
2. **క్రాస్ గ్రెయిన్ పై కట్ చేయడం:** ప్యాటర్న్ పీసులను ఎల్లప్పుడూ నిలువు దారాల (Warp) వెంబడే పరచాలి. క్రాస్ గా కట్ చేస్తే తొడుక్కున్నప్పుడు డ్రెస్ ఒకవైపుకు మెలితిరుగుతుంది.
3. **కర్వ్స్ వద్ద కట్స్ (Notches) ఇవ్వకపోవడం:** మెడ మరియు చంక కుట్టిన తర్వాత మార్జిన్ లో చిన్న చిన్న కట్స్ ఇవ్వకపోతే గుడ్డ సాఫీగా తిరగక ముడతలు పడుతుంది.
4. **ఐరన్ ను ముందుకు వెనుకకు రుద్దడం:** కుట్టిన తర్వాత ఐరన్ ను పై నుండి కిందకు అదిమి పట్టాలి (Pressing), బట్టను అటూ ఇటూ రుద్దకూడదు (రుద్దితే బట్ట సాగిపోతుంది).
5. **తప్పుడు సూది వాడటం:** సిల్క్ కు సైజ్ 9 లేదా 11, కాటన్ కు సైజ్ 14, జీన్స్ కు సైజ్ 16 వాడాలి.`,
        actionTag: "బిగినర్స్ గైడ్"
      } : {
        title: "5 Most Common Beginner Tailoring Mistakes to Avoid",
        content: `Here are the top pitfalls beginners face and how to steer clear of them:
1. **Skipping Pre-Washing:** Cotton, linen, and rayon shrink 3% to 6% on first wash. Always pre-wash, dry, and steam press before placing your shears on the fabric!
2. **Disregarding the Grainline:** Always align pattern pieces parallel to the lengthwise selvage (warp). Cutting off-grain causes dresses and trousers to twist around the body.
3. **Neglecting Curved Seam Notching:** Concave curves (necklines and armholes) need 1/8\" snips; convex curves require small V-notches. Without notching, seams bunch and pull awkwardly.
4. **Ironing instead of Pressing:** Never drag your hot iron back and forth across cut bias seams; lift and press down firmly to lock seams without stretching them out of shape.
5. **Using the Wrong Needle:** Universal needles punch holes in delicate silk or snap on denim. Always match fabric weight to needle size (Size 11 for silk, 14 for cotton, 16 for denim).`,
        actionTag: "Tailoring Mistakes"
      };
    }

    // 5. Machine: Thread Breaking
    if (q.includes("break") || q.includes("దారం తెగి") || q.includes("thread") || q.includes("snapping")) {
      return isTe ? {
        title: "పై దారం లేదా కింది దారం తెగిపోవడానికి పరిష్కారం",
        content: `దారం తెగిపోతుంటే ఈ 5 స్టెప్పులు చేయండి:
1. **టెన్షన్ డయల్ సరిచూడండి:** టెన్షన్ చాలా టైట్ గా ఉంటే నంబర్ 5 నుండి 3 లేదా 4 కి తగ్గించండి.
2. **సూది మొన పరిశీలించండి:** సూది కొన వంకరగా ఉన్నా లేదా మొద్దుబారినా దారాన్ని తెంచుతుంది. వెంటనే కొత్త సూది మార్చండి.
3. **సూది అమరిక:** సూదిలోని ఫ్లాట్ సైడ్ కరెక్ట్ వైపు ఉండేలా బిగించారా చూడండి.
4. **త్రెడింగ్ తప్పులు:** ప్రెషర్ ఫుట్ పైకి ఎత్తి మళ్ళీ మొదటి నుండి దారం ఎక్కించండి. టేక్-అప్ లివర్ లో దారం ఉండాలి.
5. **బాబిన్ కేస్:** బాబిన్ లోపల చిక్కుబడ్డ నూలు దారాలను క్లీన్ చేయండి.`,
        actionTag: "మిషన్ రిపేర్"
      } : {
        title: "Instant Diagnostic: Why Upper Thread Breaks",
        content: `Troubleshoot thread snapping in 5 quick checkpoints:
1. **Upper Tension Too Tight:** Turn the tension dial counter-clockwise from 5-7 down to standard 3.5 - 4.
2. **Damaged Needle:** A microscopic burr or bent needle eye cuts thread instantly at high RPM. Swap in a new needle.
3. **Incorrect Needle Orientation:** The flat side of the needle shank must face away from the needle clamp screw.
4. **Missed Thread Guides:** Raise the presser foot completely to open the tension discs, and rethread through the take-up lever.
5. **Bobbin Shuttle Lint:** Remove the throat plate and brush out lint balls trapped behind the rotating hook.`,
        actionTag: "Machine Doctor"
      };
    }

    // 6. Bobbin Bunching / Looping
    if (q.includes("bobbin") || q.includes("loop") || q.includes("బాబిన్") || q.includes("ముద్ద") || q.includes("nest")) {
      return isTe ? {
        title: "కింది దారం ముద్దపడటం (Bird Nesting) నివారణ",
        content: `బట్ట కింద దారాలు చిక్కుబడి ముద్ద పడటానికి కారణం:
*ఆశ్చర్యకరమైన విషయం ఏమిటంటే, కింది దారం ముద్ద పడుతుంటే 95% సందర్భాల్లో తప్పు **పై దారంలోనే** ఉంటుంది!*
1. **ప్రెషర్ ఫుట్ ఎత్తి త్రెడ్ చేయండి:** ప్రెషర్ ఫుట్ కింద ఉన్నప్పుడు దారం టెన్షన్ ప్లేట్ల మధ్యలోకి దిగదు.
2. **టేక్-అప్ లివర్:** పై దారం టేక్-అప్ లివర్ నుండి జారిపోతే కింద ముద్దపడుతుంది.
3. **బాబిన్ టెన్షన్ టెస్ట్:** బాబిన్ కేస్ దారాన్ని పట్టుకుని చేత్తో వేలాడదీయండి. కొద్దిగా కుదిపితే 1 అంగుళం జారాలి (Yo-Yo Test). అతిగా లూజ్ ఉంటే చిన్న స్క్రూను స్వల్పంగా టైట్ చేయండి.`,
        actionTag: "బాబిన్ టెన్షన్"
      } : {
        title: "Resolving Bobbin Looping & Bird-Nesting",
        content: `Tailor Secret: When thread loops and nests on the underside of fabric, the fault is almost always in the **UPPER THREAD**, not the bobbin!
1. **Rethread with Presser Foot UP:** If you thread with the presser foot down, the tension discs are clamped shut and the thread floats loose with zero tension.
2. **Verify Take-Up Lever:** Ensure the thread is securely hooked into the hole of the take-up lever arm.
3. **Perform the Yo-Yo Drop Test:** Hold the bobbin case suspended by its thread. A quick flick of your wrist should let it drop 1 to 2 inches and stop. If it runs to the floor, tighten the tiny tension screw 1/8th of a turn clockwise.`,
        actionTag: "Bobbin Solution"
      };
    }

    // 7. Needles for Silk vs Denim
    if (q.includes("needle") || q.includes("సూది") || q.includes("denim") || q.includes("silk") || q.includes("సైజు")) {
      return isTe ? {
        title: "సిల్క్, కాటన్ మరియు డెనిమ్ కు ఏ సైజు సూది వాడాలి?",
        content: `వస్త్రానికి సరైన సూది సైజు పట్టిక:
• **షిఫాన్, జార్జెట్, పట్టు (Silk/Georgette):** సైజ్ **9 (65) లేదా 11 (75)** సూది + సన్నని పాలిస్టర్/సిల్క్ దారం.
• **కాటన్, పాప్లిన్, లినెన్ (Cotton/Linen):** సైజ్ **14 (90)** సూది + నంబర్ 50 మెర్సరిజ్డ్ దారం.
• **రా సిల్క్, బ్రొకేడ్, సూటింగ్ (Brocade/Suiting):** సైజ్ **14 నుండి 16 (100)** సూది.
• **జీన్స్, డెనిమ్, కాన్వాస్ (Denim/Jeans):** సైజ్ **16 లేదా 18 (110)** హెవీ డ్యూటీ సూది + గోల్డెన్ జీన్స్ దారం.
• **లైక్రా, స్ట్రెచ్ బట్టలు (Knits/Lycra):** **బాల్ పాయింట్ (Ballpoint / Golden)** సూది (సాధారణ సూది వాడితే కుట్టు తప్పిపోతుంది).`,
        actionTag: "సూదుల గైడ్"
      } : {
        title: "Master Needle & Fabric Selection Guide",
        content: `Matching the right needle number prevents skipped stitches and fiber damage:
• **Silk, Chiffon, Georgette, Organza:** Size **9/65 or 11/75** (Fine sharp needle).
• **Cotton, Poplin, Voile, Cambric:** Size **14/90** (Universal needle, all-round Indian tailoring).
• **Raw Silk, Brocade, Taffeta, Suiting:** Size **14/90 to 16/100**.
• **Denim Jeans, Canvas, Heavy Upholstery:** Size **16/100 or 18/110** (Jeans/Denim reinforced point).
• **Knits, Stretch Lycra, Hosiery:** Size **11/75 or 14/90 Ball Point** (Golden needle that parts elastic fibers without piercing them).`,
        actionTag: "Needle Guide"
      };
    }

    // 8. Fabric needed
    if (q.includes("cloth") || q.includes("fabric") || q.includes("meter") || q.includes("ఎన్ని మీటర్ల") || q.includes("క్లాత్") || q.includes("meters") || q.includes("yard")) {
      return isTe ? {
        title: "అనార్కలి, పాటియాలా మరియు బ్లౌజ్ కు క్లాత్ లెక్కలు",
        content: `ఖచ్చితమైన క్లాత్ అవసరాలు (44" పన్నా క్లాత్ కు):
• **సాధారణ సారీ బ్లౌజ్:** 80 సెం.మీ (ఛాతీ 38" లోపు), 1 మీటర్ (ఛాతీ 40" పైన లేదా పొడవు చేతులకు).
• **ప్రిన్సెస్ కట్ బ్లౌజ్:** 1.0 నుండి 1.25 మీటర్లు.
• **సాధారణ కుర్తీ / కమీజ్:** 2.0 నుండి 2.25 మీటర్లు.
• **20-కలి గ్రాండ్ అనార్కలి:** 5 నుండి 6 మీటర్లు (+ 3.5 మీటర్ల లైనింగ్).
• **షాహీ పాటియాలా సల్వార్:** 3.5 నుండి 4 మీటర్లు.
• **360° అంబ్రెల్లా స్కర్ట్:** 3.0 నుండి 3.5 మీటర్లు.
*సలహా: కొత్తవారు కటింగ్ లో మార్జిన్లు మరియు ముడుచుకుపోయే వెసులుబాటు కోసం ఎప్పుడూ 25 సెం.మీ అదనంగా తీసుకోవాలి.*`,
        actionTag: "క్లాత్ కాలిక్యులేషన్"
      } : {
        title: "Fabric Estimation Breakdown for Indian Silhouettes",
        content: `Standard yardage calculations on 44\" fabric roll:
• **Traditional Saree Blouse:** 80 cm for bust < 38\"; 1.0 meter for bust ≥ 40\" or elbow sleeves.
• **Princess Cut Designer Blouse:** 1.0 to 1.25 meters.
• **Plain Kameez / Kurti:** 2.0 to 2.25 meters.
• **20-Kali Majestic Anarkali:** 5.0 to 6.0 meters (+ 3.5 meters lining).
• **Authentic Shahi Patiala Salwar:** 3.5 to 4.0 meters for dense cascading pleats.
• **360° Circular Umbrella Skirt:** 3.0 to 3.5 meters depending on floor length.
*Rule of thumb: Always add 25 cm safety margin for pre-wash shrinkage and pattern layout adjustments.*`,
        actionTag: "Fabric Yardage"
      };
    }

    // 9. Seam comparison
    if (q.includes("seam") || q.includes("french") || q.includes("కుట్టు") || q.includes("సీమ్") || q.includes("flat fell")) {
      return isTe ? {
        title: "ఫ్రెంచ్ సీమ్ మరియు ఫ్లాట్-ఫెల్డ్ సీమ్ మధ్య తేడా",
        content: `ఈ రెండు ప్రసిద్ధ లగ్జరీ సీమ్స్ తేడాలు:
1. **ఫ్రెంచ్ సీమ్ (French Seam):**
   - బట్ట రాంగ్ సైడ్స్ కలిపి మొదట 1/4" కుట్టి, కత్తిరించి, రైట్ సైడ్స్ తిప్పి లోపలికి మడిచి రెండో కుట్టు వేస్తారు.
   - ఇది సన్నని గొట్టంలా లోపలికి పీలికలను బంధిస్తుంది.
   - ఉపయోగం: జార్జెట్, షిఫాన్, పట్టు బట్టలు మరియు చిన్న పిల్లల డ్రెస్సులకు.
2. **ఫ్లాట్-ఫెల్డ్ సీమ్ (Flat-Felled Seam):**
   - మొదట సాధారణ కుట్టు వేసి, ఒక అంచును కత్తిరించి, రెండో అంచుతో దానిని కప్పేసి బట్టపై పడుకోబెట్టి రెండో కుట్టు వేస్తారు.
   - బయటకు రెండు సమాంతర కుట్లు కనిపిస్తాయి.
   - ఉపయోగం: జీన్స్ ప్యాంట్లు, జెంట్ల షర్టులు మరియు కుర్తాలు.`,
        actionTag: "సీమ్స్ మాస్టర్‌క్లాస్"
      } : {
        title: "French Seam vs Flat-Felled Seam Comparison",
        content: `Two elite couture self-enclosed seams explained:
1. **French Seam:**
   - Sewn in 2 passes: first wrong-sides-together (1/4\"), trimmed, then turned right-sides-together (1/4\") to completely encase raw fabric edges.
   - Looks like a neat enclosed cord on the inside, single stitch on outside.
   - Ideal for: Chiffon, organza, silks, blouses, and soft baby frocks.
2. **Flat-Felled Seam (Jeans Seam):**
   - Sewn right-sides-together, one allowance trimmed to 1/4\", the other wrapped over it and pressed flat against garment body, then topstitched.
   - Shows distinctive double parallel railroad tracks on the outside. Extremely durable.
   - Ideal for: Denim jeans, western shirts, side seams of trousers and sportswear.`,
        actionTag: "Seam Engineering"
      };
    }

    // Default intelligent tailoring answer
    return isTe ? {
      title: "మాస్టర్ జీ సలహా & మార్గదర్శకత్వం",
      content: `నమస్కారం! మీరు అడిగిన "${q}" విషయమై నా అనుభవపూర్వక సలహా:
టైలరింగ్ లో ఖచ్చితమైన ఫలితం రావడానికి ఈ క్రింది 3 ప్రాథమిక సూత్రాలు పాటించాలి:
1. **కొలతలు:** కస్టమర్ నిటారుగా నిలబడినప్పుడు శరీరాన్ని బిగించకుండా టేపును ఫ్రీగా ఉంచి కొలవాలి.
2. **గ్రెయిన్‌లైన్ (Grainline):** బట్ట యొక్క నిలువు దారాల (Warp) వెంబడే ప్యాటర్న్ పీసులను పరచాలి. క్రాస్ గా పరిస్తే దుస్తులు పక్కకు తిరుగుతాయి.
3. **ఐరన్ ప్రెస్సింగ్:** ప్రతి కుట్టు వేసిన వెంటనే ప్రెస్ చేయడం వల్ల ఫినిషింగ్ ప్రొఫెషనల్ బోటిక్ లుక్ లో వస్తుంది.

మీరు బ్లౌజ్ డ్రాఫ్టింగ్, మిషన్ సమస్యలు, క్లాత్ ఎస్టిమేషన్ లేదా మీ ప్రస్తుత ప్రాజెక్ట్ గురించి ఏదైనా అడగవచ్చు!`,
      actionTag: "టైలరింగ్ మార్గదర్శి"
    } : {
      title: "Master Ji's Couture Tailoring Guidance",
      content: `Welcome to the Atelier! Regarding your inquiry on "${q}":
In haute couture garment construction, achieving a flawless finish rests on three cardinal principles:
1. **Accurate Body Measuring:** Always measure over well-fitting undergarments, keeping the measuring tape comfortably level without digging into flesh.
2. **True Grainline Orientation:** Align all pattern pieces strictly with the lengthwise warp grain to ensure the garment hangs straight without twisting.
3. **Press As You Sew:** Iron every single dart and seam immediately after stitching before crossing it with another seam.

Feel free to ask specifically about Blouse drafting formulas, Machine troubleshooting, Patiala pleating, French seams, or your active garment project!`,
      actionTag: "Tailoring Guidance"
    };
  }

  async callExternalLLM(prompt, lang, project = null) {
    const isTe = lang === "te";
    let contextSnippet = "";
    if (project && project.getMeasurementsInInches) {
      const m = project.getMeasurementsInInches();
      const g = project.state?.selectedGarment;
      contextSnippet = `\nActive Garment Project Context: Garment = ${g}, Chest = ${m.chest}", Waist = ${m.waist}", Shoulder = ${m.shoulder}", Length = ${m.length}". Reference these exact numbers if the user asks about their project.`;
    }

    const systemPrompt = `You are "Master Ji", a world-renowned master tailor, NIFT fashion designer, and patient mentor in Indian and Western garment drafting, sewing machine mechanics, and haute couture finishing. 
Respond in ${isTe ? "pure Telugu (తెలుగు) with standard tailoring terminology" : "English with clear tailoring terminology"}.
Keep advice structured with clear numbered steps, formulas, and practical pro tips. Never fabricate measurements or present unverified claims as guarantees.${contextSnippet}`;

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: ${prompt}` }] }
          ]
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            title: isTe ? "మాస్టర్ జీ ప్రత్యక్ష సమాధానం" : "Master Ji Live AI Analysis",
            content: text,
            actionTag: isTe ? "లైవ్ AI" : "Live AI"
          };
        }
      }
    } catch (e) {
      console.warn("Gemini call error:", e);
    }
    return null;
  }

  speakAnswer(text, lang) {
    if (!this.speechSynth) return false;
    this.speechSynth.cancel();

    // Clean markdown symbols for natural speech
    const cleanSpeech = text
      .replace(/[*#_`]/g, "")
      .replace(/\n+/g, ". ");

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const isTe = lang === "te" || /[\u0C00-\u0C7F]/.test(cleanSpeech);
    if (isTe) {
      utterance.lang = "te-IN";
    } else {
      utterance.lang = "en-IN";
    }

    this.currentUtterance = utterance;
    this.speechSynth.speak(utterance);
    return true;
  }

  stopSpeaking() {
    if (this.speechSynth) {
      this.speechSynth.cancel();
    }
  }
}
