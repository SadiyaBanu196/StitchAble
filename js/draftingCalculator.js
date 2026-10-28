/**
 * STITCHABLE - Interactive Pattern Drafting Calculator & Live SVG Schematic
 * Supports distinct dynamic SVG pattern blocks for:
 * 1. Traditional 4-Dart Saree Blouse (blouse)
 * 2. Princess Cut Designer Blouse (princess)
 * 3. Plain Kameez / Kurti with Side Slits (kameez)
 * 4. Western Panel Top with Mandarin Collar & Curved Hem (top)
 */

export class DraftingCalculator {
  constructor(getLang) {
    this.getLang = getLang;
  }

  calculate({ chest, waist, hip, shoulder, length, garmentType }) {
    const c = parseFloat(chest) || 36;
    const w = parseFloat(waist) || 30;
    const h = parseFloat(hip) || 38;
    const s = parseFloat(shoulder) || 14;
    const l = parseFloat(length) || (garmentType === 'kameez' ? 38 : (garmentType === 'top' ? 25 : 14.5));
    const gType = garmentType || 'blouse';

    // Tailoring formulas
    const armholeDepth = (c / 6 + 0.5).toFixed(2);
    const neckWidth = (c / 12).toFixed(2);
    const bustApexHeight = (c / 4 + 1.5).toFixed(2);
    const apexDistanceHalf = (c / 10 + 0.25).toFixed(2);
    const shoulderHalf = (s / 2).toFixed(2);

    let specificOutputs = [];

    if (gType === 'blouse') {
      const chestLine = (c / 4 + 1.5).toFixed(2);
      const waistQuarter = (w / 4 + 1.0).toFixed(2);
      specificOutputs = [
        { label: { en: "Armhole Depth", te: "చంక లోతు (Armhole Depth)" }, val: `${armholeDepth}\" (${(armholeDepth * 2.54).toFixed(1)} cm)` },
        { label: { en: "Neck Width", te: "మెడ వెడల్పు (Neck Width)" }, val: `${neckWidth}\" (${(neckWidth * 2.54).toFixed(1)} cm)` },
        { label: { en: "Bust Apex Point", te: "ఎపెక్స్ బిందువు ఎత్తు (Apex Height)" }, val: `${bustApexHeight}\" (${(bustApexHeight * 2.54).toFixed(1)} cm)` },
        { label: { en: "Bust Line (+1.5\" ease)", te: "ఛాతీ లైన్ (+1.5\" లూజ్ తో)" }, val: `${chestLine}\" (${(chestLine * 2.54).toFixed(1)} cm)` },
        { label: { en: "Waist (1/4th + Dart)", te: "నడుము (1/4వ భాగం + డాట్)" }, val: `${waistQuarter}\" (${(waistQuarter * 2.54).toFixed(1)} cm)` },
        { label: { en: "Side Seam Margin", te: "సైడ్ కుట్టు మార్జిన్" }, val: "1.50\" (3.8 cm)" }
      ];
    } else if (gType === 'princess') {
      const centerWidth = (parseFloat(apexDistanceHalf) + 0.5).toFixed(2);
      const dartCupIntake = ((c - w) / 2 + 0.5).toFixed(2);
      const chestLine = (c / 4 + 1.5).toFixed(2);
      specificOutputs = [
        { label: { en: "Armhole Depth", te: "చంక లోతు (Armhole Depth)" }, val: `${armholeDepth}\" (${(armholeDepth * 2.54).toFixed(1)} cm)` },
        { label: { en: "Neck Width", te: "మెడ వెడల్పు (Neck Width)" }, val: `${neckWidth}\" (${(neckWidth * 2.54).toFixed(1)} cm)` },
        { label: { en: "Apex Distance from Fold", te: "ఎపెక్స్ దూరం (Center to Apex)" }, val: `${apexDistanceHalf}\" (${(apexDistanceHalf * 2.54).toFixed(1)} cm)` },
        { label: { en: "Center Front Panel Width", te: "సెంటర్ ప్యానెల్ వెడల్పు" }, val: `${centerWidth}\" (${(centerWidth * 2.54).toFixed(1)} cm)` },
        { label: { en: "Side Cup Dart Cutout", te: "సైడ్ కప్ కర్వ్ కట్-అవుట్" }, val: `${dartCupIntake}\" (${(dartCupIntake * 2.54).toFixed(1)} cm)` },
        { label: { en: "Princess Curve Seam Margin", te: "ప్రిన్సెస్ కర్వ్ కుట్టు మార్జిన్" }, val: "0.50\" (1.2 cm)" }
      ];
    } else if (gType === 'kameez') {
      const chestLine = (c / 4 + 2.0).toFixed(2);
      const waistLine = (w / 4 + 1.5).toFixed(2);
      const hipLine = (h / 4 + 2.0).toFixed(2);
      const slitLevel = (s * 1.5).toFixed(1);
      specificOutputs = [
        { label: { en: "Armhole Depth", te: "చంక లోతు (Armhole Depth)" }, val: `${armholeDepth}\" (${(armholeDepth * 2.54).toFixed(1)} cm)` },
        { label: { en: "Chest Line (+2.0\" ease)", te: "ఛాతీ లైన్ (+2.0\" లూజ్ తో)" }, val: `${chestLine}\" (${(chestLine * 2.54).toFixed(1)} cm)` },
        { label: { en: "Waist Line (+1.5\" ease)", te: "నడుము లైన్ (+1.5\" లూజ్ తో)" }, val: `${waistLine}\" (${(waistLine * 2.54).toFixed(1)} cm)` },
        { label: { en: "Hip Line (+2.0\" ease)", te: "హిప్ లైన్ (+2.0\" లూజ్ తో)" }, val: `${hipLine}\" (${(hipLine * 2.54).toFixed(1)} cm)` },
        { label: { en: "Side Slit / Chaak Level", te: "సైడ్ స్లిట్ / చాక్ ఓపెనింగ్ ఎత్తు" }, val: `${slitLevel}\" from shoulder` },
        { label: { en: "Bottom Flare / Ghera", te: "కింద బాటమ్ గేరా" }, val: `${(parseFloat(hipLine) + 2.0).toFixed(2)}\"` }
      ];
    } else if (gType === 'top') {
      const chestLine = (c / 4 + 2.5).toFixed(2);
      const waistLine = (w / 4 + 2.0).toFixed(2);
      const collarLength = (parseFloat(neckWidth) * 6.28 / 2 + 1.0).toFixed(2);
      specificOutputs = [
        { label: { en: "Mandarin Collar Length", te: "చైనీస్ మాండరిన్ కాలర్ పొడవు" }, val: `${collarLength}\" (${(collarLength * 2.54).toFixed(1)} cm)` },
        { label: { en: "Mandarin Collar Stand Height", te: "కాలర్ స్టాండ్ ఎత్తు" }, val: "1.25\" (3.2 cm)" },
        { label: { en: "Front Button Placket Extension", te: "ఫ్రంట్ బటన్ పట్టీ ఎక్స్‌టెన్షన్" }, val: "0.75\" (1.9 cm)" },
        { label: { en: "Bust Line (+2.5\" ease)", te: "ఛాతీ లైన్ (+2.5\" లూజ్ తో)" }, val: `${chestLine}\" (${(chestLine * 2.54).toFixed(1)} cm)` },
        { label: { en: "Curved Hemline Side Rise", te: "కర్వ్డ్ హెమ్‌లైన్ సైడ్ ఆర్చ్" }, val: "2.50\" (6.3 cm)" },
        { label: { en: "Side Seam Margin", te: "సైడ్ కుట్టు మార్జిన్" }, val: "1.00\" (2.5 cm)" }
      ];
    }

    return {
      inputs: { chest: c, waist: w, hip: h, shoulder: s, length: l, garmentType: gType },
      outputsList: specificOutputs,
      raw: {
        c, w, h, s, l, gType,
        armholeDepth: parseFloat(armholeDepth),
        neckWidth: parseFloat(neckWidth),
        bustApexHeight: parseFloat(bustApexHeight),
        apexDistanceHalf: parseFloat(apexDistanceHalf),
        shoulderHalf: parseFloat(shoulderHalf)
      }
    };
  }

  generateSvgSchematic(data) {
    const isTe = this.getLang() === "te";
    const gType = data.inputs.garmentType || 'blouse';

    if (gType === 'princess') {
      return this.renderPrincessCutSvg(data, isTe);
    } else if (gType === 'kameez') {
      return this.renderKameezSvg(data, isTe);
    } else if (gType === 'top') {
      return this.renderWesternTopSvg(data, isTe);
    } else {
      return this.renderTraditionalBlouseSvg(data, isTe);
    }
  }

  // ==========================================
  // MODEL 1: TRADITIONAL 4-DART BLOUSE
  // ==========================================
  renderTraditionalBlouseSvg(data, isTe) {
    const { c, w, l, armholeDepth, neckWidth, bustApexHeight, apexDistanceHalf, shoulderHalf } = data.raw;
    const scaleX = 22;
    const scaleY = 24;
    const originX = 85;
    const originY = 55;

    const neckW_px = neckWidth * scaleX;
    const shoulder_px = shoulderHalf * scaleX;
    const armholeD_px = armholeDepth * scaleY;
    const chestW_px = (c / 4 + 1.5) * scaleX;
    const waistW_px = (w / 4 + 1.0) * scaleX;
    const length_px = Math.min(l, 17) * scaleY;
    const apexY_px = bustApexHeight * scaleY;
    const apexX_px = apexDistanceHalf * scaleX;

    const pNape = { x: originX, y: originY };
    const pNeckCurveEnd = { x: originX + neckW_px, y: originY };
    const pFrontNeckDepth = { x: originX, y: originY + 5.5 * scaleY * 0.7 };
    const pShoulderEnd = { x: originX + shoulder_px, y: originY + 0.5 * scaleY };
    const pArmholeArm = { x: originX + shoulder_px, y: originY + armholeD_px };
    const pChestPoint = { x: originX + chestW_px, y: originY + armholeD_px };
    const pWaistPoint = { x: originX + waistW_px, y: originY + length_px };
    const pFoldBottom = { x: originX, y: originY + length_px };
    const pApex = { x: originX + apexX_px, y: originY + apexY_px };
    const pWaistDart = { x: originX + apexX_px, y: originY + length_px };

    return `
      <svg viewBox="0 0 620 520" class="pattern-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fff1f2" />
            <stop offset="100%" stop-color="#ffe4e6" />
          </linearGradient>
          <pattern id="grid1" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="0.75" />
          </pattern>
          <marker id="arrow1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 9 5 L 0 9 z" fill="#b45309" />
          </marker>
        </defs>

        <rect width="620" height="520" fill="url(#grid1)" />

        <!-- Title Badge -->
        <rect x="20" y="15" width="280" height="26" rx="13" fill="#be185d" fill-opacity="0.15" stroke="#be185d" stroke-width="1"/>
        <text x="35" y="32" font-size="11" font-weight="700" fill="#be185d">
          ${isTe ? "సాధారణ 4-డాట్స్ బ్లౌజ్ ప్యాటర్న్ బ్లాక్" : "TRADITIONAL 4-DART BLOUSE PATTERN"}
        </text>

        <!-- Main Pattern Outline -->
        <path d="
          M ${pNape.x} ${pNape.y}
          L ${pNeckCurveEnd.x} ${pNeckCurveEnd.y}
          L ${pShoulderEnd.x} ${pShoulderEnd.y}
          Q ${pArmholeArm.x - 18} ${pArmholeArm.y - 15}, ${pChestPoint.x} ${pChestPoint.y}
          L ${pWaistPoint.x} ${pWaistPoint.y}
          L ${pFoldBottom.x} ${pFoldBottom.y}
          Z
        " fill="url(#blouseGrad)" stroke="#9d174d" stroke-width="2.5" stroke-linejoin="round" />

        <!-- Front Neckline Arc -->
        <path d="M ${pNeckCurveEnd.x} ${pNeckCurveEnd.y} Q ${pNeckCurveEnd.x} ${pFrontNeckDepth.y}, ${pFrontNeckDepth.x} ${pFrontNeckDepth.y}" 
              fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="4,4" />
        <text x="${(pNape.x + pNeckCurveEnd.x)/2}" y="${pFrontNeckDepth.y * 0.7}" font-size="9.5" fill="#dc2626" font-weight="600">
          ${isTe ? "డీప్ నెక్ లైన్" : "Front Neck"}
        </text>

        <!-- Centre Fold Line (Grainline) -->
        <line x1="${originX - 15}" y1="${originY}" x2="${originX - 15}" y2="${originY + length_px}" 
              stroke="#b45309" stroke-width="2" marker-start="url(#arrow1)" marker-end="url(#arrow1)" />
        <text x="${originX - 22}" y="${originY + length_px / 2}" font-size="10.5" font-weight="700" fill="#b45309" 
              transform="rotate(-90 ${originX - 22} ${originY + length_px / 2})" text-anchor="middle">
          ${isTe ? "మడత / గ్రెయిన్‌లైన్ (CENTRE FOLD)" : "CENTRE FOLD / GRAINLINE"}
        </text>

        <!-- Bust Apex Point -->
        <circle cx="${pApex.x}" cy="${pApex.y}" r="5" fill="#be185d" />
        <text x="${pApex.x + 8}" y="${pApex.y - 4}" font-size="10.5" font-weight="700" fill="#be185d">
          ${isTe ? `ఎపెక్స్ బిందువు (${bustApexHeight}")` : `Apex Point (${bustApexHeight}")`}
        </text>

        <!-- 1. Waist Dart -->
        <path d="M ${pApex.x} ${pApex.y + 16} L ${pWaistDart.x - 12} ${pWaistDart.y} L ${pWaistDart.x + 12} ${pWaistDart.y} Z" 
              fill="#f43f5e" fill-opacity="0.45" stroke="#be185d" stroke-width="1.5" />
        <text x="${pWaistDart.x}" y="${pWaistDart.y + 16}" font-size="9.5" font-weight="600" fill="#9d174d" text-anchor="middle">
          1. ${isTe ? "నడుము డాట్ (1\" Intake)" : "Waist Dart (1\")"}
        </text>

        <!-- 2. Centre Front Placket Dart -->
        <path d="M ${originX} ${pApex.y - 6} L ${pApex.x - 16} ${pApex.y} L ${originX} ${pApex.y + 6} Z" 
              fill="#f43f5e" fill-opacity="0.45" stroke="#be185d" stroke-width="1.5" />
        <text x="${originX + 18}" y="${pApex.y + 18}" font-size="9" font-weight="600" fill="#9d174d">
          2. ${isTe ? "హుక్స్ పట్టీ డాట్" : "Center Dart"}
        </text>

        <!-- 3. Side Seam Dart -->
        <path d="M ${pApex.x + 18} ${pApex.y + 4} L ${pChestPoint.x - 2} ${pChestPoint.y + 35} L ${pChestPoint.x - 2} ${pChestPoint.y + 48} Z" 
              fill="#f43f5e" fill-opacity="0.45" stroke="#be185d" stroke-width="1.5" />
        <text x="${pChestPoint.x + 8}" y="${pChestPoint.y + 42}" font-size="9" font-weight="600" fill="#9d174d">
          3. ${isTe ? "సైడ్ డాట్" : "Side Dart"}
        </text>

        <!-- 4. Armhole Dart -->
        <path d="M ${pApex.x + 14} ${pApex.y - 12} L ${pChestPoint.x - 22} ${pArmholeArm.y - 16} L ${pChestPoint.x - 14} ${pArmholeArm.y - 24} Z" 
              fill="#f43f5e" fill-opacity="0.45" stroke="#be185d" stroke-width="1.5" />
        <text x="${pChestPoint.x - 30}" y="${pArmholeArm.y - 28}" font-size="9" font-weight="600" fill="#9d174d">
          4. ${isTe ? "చంక డాట్" : "Armhole Dart"}
        </text>

        <!-- Dimension Callouts -->
        <text x="${pChestPoint.x + 8}" y="${pChestPoint.y + 4}" font-size="10.5" font-weight="600" fill="#0f172a">
          ${isTe ? `ఛాతీ: ${(c/4 + 1.5).toFixed(1)}"` : `Bust: ${(c/4 + 1.5).toFixed(1)}"`}
        </text>
        <text x="${pWaistPoint.x + 8}" y="${pWaistPoint.y + 4}" font-size="10.5" font-weight="600" fill="#0f172a">
          ${isTe ? `నడుము: ${(w/4 + 1.0).toFixed(1)}"` : `Waist: ${(w/4 + 1.0).toFixed(1)}"`}
        </text>

        <!-- Side Seam Margin -->
        <path d="M ${pChestPoint.x} ${pChestPoint.y} L ${pChestPoint.x + 22} ${pChestPoint.y} L ${pWaistPoint.x + 22} ${pWaistPoint.y} L ${pWaistPoint.x} ${pWaistPoint.y}" 
              fill="#fef08a" fill-opacity="0.4" stroke="#ca8a04" stroke-width="1" stroke-dasharray="2,2" />
        <text x="${pWaistPoint.x + 28}" y="${(pChestPoint.y + pWaistPoint.y)/2}" font-size="9.5" font-weight="700" fill="#b45309">
          +1.5" ${isTe ? "మార్జిన్" : "Margin"}
        </text>
      </svg>
    `;
  }

  // ==========================================
  // MODEL 2: PRINCESS CUT DESIGNER BLOUSE
  // ==========================================
  renderPrincessCutSvg(data, isTe) {
    const { c, w, l, armholeDepth, neckWidth, bustApexHeight, apexDistanceHalf, shoulderHalf } = data.raw;
    const originY = 55;
    const length_px = Math.min(l, 17) * 23;

    // Piece 1: Center Front Panel
    const p1_x = 65;
    const p1_neckW = neckWidth * 20;
    const p1_apexX = p1_x + apexDistanceHalf * 20;
    const p1_apexY = originY + bustApexHeight * 21;
    const p1_waistX = p1_x + (apexDistanceHalf * 20 - 6);

    // Piece 2: Side Cup Panel
    const p2_x = 310;
    const p2_armholeX = p2_x + (shoulderHalf * 18 - neckWidth * 18);
    const p2_armholeY = originY + armholeDepth * 21;
    const p2_chestX = p2_x + (c / 4 + 1.5 - apexDistanceHalf) * 20;
    const p2_waistX = p2_x + (w / 4 + 1.0 - apexDistanceHalf) * 20;

    return `
      <svg viewBox="0 0 620 520" class="pattern-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pCenterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#faf5ff" />
            <stop offset="100%" stop-color="#f3e8ff" />
          </linearGradient>
          <linearGradient id="pSideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fdf2f8" />
            <stop offset="100%" stop-color="#fce7f3" />
          </linearGradient>
          <pattern id="grid2" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="0.75" />
          </pattern>
        </defs>

        <rect width="620" height="520" fill="url(#grid2)" />

        <!-- Title Badge -->
        <rect x="20" y="15" width="310" height="26" rx="13" fill="#701a75" fill-opacity="0.15" stroke="#701a75" stroke-width="1"/>
        <text x="35" y="32" font-size="11" font-weight="700" fill="#701a75">
          ${isTe ? "ప్రిన్సెస్ కట్ 2-పీస్ డ్రాఫ్టింగ్ (సెంటర్ & సైడ్ కప్)" : "PRINCESS CUT 2-PIECE SYSTEM (CENTER & SIDE)"}
        </text>

        <!-- PIECE 1: CENTER FRONT PANEL -->
        <g id="piece1-center">
          <path d="
            M ${p1_x} ${originY}
            L ${p1_x + p1_neckW} ${originY}
            L ${p1_x + p1_neckW + 18} ${originY + 12}
            Q ${p1_apexX + 12} ${p1_apexY - 35}, ${p1_apexX} ${p1_apexY}
            Q ${p1_apexX - 5} ${p1_apexY + 45}, ${p1_waistX} ${originY + length_px}
            L ${p1_x} ${originY + length_px}
            Z
          " fill="url(#pCenterGrad)" stroke="#701a75" stroke-width="2.5" />

          <!-- Front Neck Arc -->
          <path d="M ${p1_x + p1_neckW} ${originY} Q ${p1_x + p1_neckW} ${originY + 75}, ${p1_x} ${originY + 75}" 
                fill="none" stroke="#9333ea" stroke-width="2" stroke-dasharray="3,3" />

          <!-- Fold line -->
          <line x1="${p1_x - 10}" y1="${originY}" x2="${p1_x - 10}" y2="${originY + length_px}" stroke="#701a75" stroke-width="2" />
          <text x="${p1_x - 16}" y="${originY + length_px / 2}" font-size="9.5" font-weight="700" fill="#701a75" 
                transform="rotate(-90 ${p1_x - 16} ${originY + length_px / 2})" text-anchor="middle">
            ${isTe ? "సెంటర్ మడత (ON FOLD)" : "CENTRE FRONT (FOLD)"}
          </text>

          <!-- Label -->
          <rect x="${p1_x + 15}" y="${originY + 130}" width="105" height="42" rx="6" fill="#fff" fill-opacity="0.85" stroke="#701a75" stroke-width="1"/>
          <text x="${p1_x + 67}" y="${originY + 148}" font-size="10" font-weight="800" fill="#701a75" text-anchor="middle">
            PIECE 1: CENTER
          </text>
          <text x="${p1_x + 67}" y="${originY + 162}" font-size="9" fill="#9333ea" text-anchor="middle">
            ${isTe ? "సెంటర్ ప్యానెల్" : "Center Bodice"}
          </text>

          <!-- Apex Alignment Notch -->
          <circle cx="${p1_apexX}" cy="${p1_apexY}" r="4" fill="#be185d" />
          <text x="${p1_apexX - 8}" y="${p1_apexY - 8}" font-size="9" font-weight="700" fill="#be185d" text-anchor="end">
            ${isTe ? "నాచ్ 1 (Apex)" : "Notch 1 (Apex)"}
          </text>
        </g>

        <!-- PIECE 2: SIDE CUP PANEL -->
        <g id="piece2-side">
          <path d="
            M ${p2_x + 20} ${originY + 25}
            L ${p2_armholeX} ${originY + 30}
            Q ${p2_armholeX - 12} ${p2_armholeY - 10}, ${p2_chestX} ${p2_armholeY + 15}
            L ${p2_waistX} ${originY + length_px}
            L ${p2_x + 5} ${originY + length_px}
            Q ${p2_x + 35} ${p1_apexY + 45}, ${p2_x + 25} ${p1_apexY}
            Q ${p2_x + 10} ${p1_apexY - 35}, ${p2_x + 20} ${originY + 25}
            Z
          " fill="url(#pSideGrad)" stroke="#be185d" stroke-width="2.5" />

          <!-- Matching Apex Notch -->
          <circle cx="${p2_x + 25}" cy="${p1_apexY}" r="4" fill="#be185d" />
          <text x="${p2_x + 35}" y="${p1_apexY - 5}" font-size="9" font-weight="700" fill="#be185d">
            ${isTe ? "నాచ్ 1 మ్యాచ్" : "Notch 1 Match"}
          </text>

          <!-- Label -->
          <rect x="${p2_x + 55}" y="${originY + 130}" width="115" height="42" rx="6" fill="#fff" fill-opacity="0.85" stroke="#be185d" stroke-width="1"/>
          <text x="${p2_x + 112}" y="${originY + 148}" font-size="10" font-weight="800" fill="#be185d" text-anchor="middle">
            PIECE 2: SIDE CUP
          </text>
          <text x="${p2_x + 112}" y="${originY + 162}" font-size="9" fill="#9d174d" text-anchor="middle">
            ${isTe ? "సైడ్ కప్ (Cut 2)" : "Side Cup (Cut 2)"}
          </text>

          <!-- 3D Cup Volume Indicator Arrow -->
          <path d="M ${p1_apexX + 25} ${p1_apexY} L ${p2_x + 5} ${p1_apexY}" stroke="#dc2626" stroke-width="1.8" stroke-dasharray="3,3" />
          <text x="${(p1_apexX + p2_x) / 2 + 15}" y="${p1_apexY - 8}" font-size="9" font-weight="700" fill="#dc2626" text-anchor="middle">
            ${isTe ? "కర్వ్ కుట్టు దిశ ⬆" : "Sew Curve ⬆"}
          </text>
        </g>

        <!-- Technical Annotation Footer -->
        <rect x="50" y="460" width="520" height="36" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
        <text x="310" y="482" font-size="10" font-weight="600" fill="#334155" text-anchor="middle">
          ${isTe ? "💡 సూత్రం: కింద నడుము నుంచే పైకి చంక వైపుకు సాగదీయకుండా కుట్టాలి (+0.5\" కుట్టు అలవెన్స్)." : "💡 Pro Rule: Stitch princess curve strictly from waist upward to armhole with 0.5\" seam allowance."}
        </text>
      </svg>
    `;
  }

  // ==========================================
  // MODEL 3: PLAIN KAMEEZ / KURTI
  // ==========================================
  renderKameezSvg(data, isTe) {
    const { c, w, h, s, armholeDepth, neckWidth, shoulderHalf } = data.raw;
    const originX = 90;
    const originY = 55;

    const shoulder_px = shoulderHalf * 21;
    const neckW_px = neckWidth * 21;
    const chestW_px = (c / 4 + 2.0) * 20;
    const waistW_px = (w / 4 + 1.5) * 20;
    const hipW_px = (h / 4 + 2.0) * 20;
    const flareW_px = hipW_px + 25;

    // Y positions scaled to fit long tunic
    const chestY = originY + armholeDepth * 16;
    const waistY = originY + 14 * 11;
    const hipY = originY + 21 * 11;
    const bottomY = originY + 38 * 10;

    const pNape = { x: originX, y: originY };
    const pNeckEnd = { x: originX + neckW_px, y: originY };
    const pShoulderEnd = { x: originX + shoulder_px, y: originY + 12 };
    const pArmholePoint = { x: originX + chestW_px, y: chestY };
    const pWaistPoint = { x: originX + waistW_px, y: waistY };
    const pHipPoint = { x: originX + hipW_px, y: hipY };
    const pFlarePoint = { x: originX + flareW_px, y: bottomY };
    const pBottomFold = { x: originX, y: bottomY };

    return `
      <svg viewBox="0 0 620 520" class="pattern-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="kameezGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fffbeb" />
            <stop offset="100%" stop-color="#fef3c7" />
          </linearGradient>
          <pattern id="grid3" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="0.75" />
          </pattern>
        </defs>

        <rect width="620" height="520" fill="url(#grid3)" />

        <!-- Title Badge -->
        <rect x="20" y="15" width="280" height="26" rx="13" fill="#d97706" fill-opacity="0.15" stroke="#d97706" stroke-width="1"/>
        <text x="35" y="32" font-size="11" font-weight="700" fill="#b45309">
          ${isTe ? "సాధారణ కమీజ్ / కుర్తీ ప్యాటర్న్ బ్లాక్" : "PLAIN KAMEEZ / KURTI PATTERN BLOCK"}
        </text>

        <!-- Main Kameez Outline -->
        <path d="
          M ${pNape.x} ${pNape.y}
          L ${pNeckEnd.x} ${pNeckEnd.y}
          L ${pShoulderEnd.x} ${pShoulderEnd.y}
          Q ${originX + shoulder_px - 15} ${chestY - 15}, ${pArmholePoint.x} ${pArmholePoint.y}
          Q ${pArmholePoint.x - 5} ${(chestY + waistY)/2}, ${pWaistPoint.x} ${pWaistPoint.y}
          Q ${pWaistPoint.x + 10} ${(waistY + hipY)/2}, ${pHipPoint.x} ${pHipPoint.y}
          L ${pFlarePoint.x} ${pFlarePoint.y}
          L ${pBottomFold.x} ${pBottomFold.y}
          Z
        " fill="url(#kameezGrad)" stroke="#b45309" stroke-width="2.5" stroke-linejoin="round" />

        <!-- Neckline Curve -->
        <path d="M ${pNeckEnd.x} ${originY} Q ${pNeckEnd.x} ${originY + 60}, ${originX} ${originY + 60}" 
              fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="3,3" />

        <!-- Centre Fold Line -->
        <line x1="${originX - 15}" y1="${originY}" x2="${originX - 15}" y2="${bottomY}" stroke="#b45309" stroke-width="2" />
        <text x="${originX - 22}" y="${(originY + bottomY) / 2}" font-size="10" font-weight="700" fill="#b45309" 
              transform="rotate(-90 ${originX - 22} ${(originY + bottomY) / 2})" text-anchor="middle">
          ${isTe ? "సెంటర్ మడత (CENTRE FOLD)" : "CENTRE FOLD / LENGTHWISE GRAIN"}
        </text>

        <!-- Bust Line -->
        <line x1="${originX}" y1="${chestY}" x2="${pArmholePoint.x}" stroke="#64748b" stroke-dasharray="2,2" stroke-width="1"/>
        <text x="${pArmholePoint.x + 8}" y="${chestY + 4}" font-size="10" font-weight="700" fill="#0f172a">
          ${isTe ? `ఛాతీ: ${(c/4 + 2).toFixed(1)}"` : `Bust Line: ${(c/4 + 2).toFixed(1)}"`}
        </text>

        <!-- Waist Line -->
        <line x1="${originX}" y1="${waistY}" x2="${pWaistPoint.x}" stroke="#64748b" stroke-dasharray="2,2" stroke-width="1"/>
        <text x="${pWaistPoint.x + 8}" y="${waistY + 4}" font-size="10" font-weight="700" fill="#0f172a">
          ${isTe ? `నడుము కర్వ్: ${(w/4 + 1.5).toFixed(1)}"` : `Waist: ${(w/4 + 1.5).toFixed(1)}"`}
        </text>

        <!-- Hip Line -->
        <line x1="${originX}" y1="${hipY}" x2="${pHipPoint.x}" stroke="#64748b" stroke-dasharray="2,2" stroke-width="1"/>
        <text x="${pHipPoint.x + 8}" y="${hipY + 4}" font-size="10" font-weight="700" fill="#0f172a">
          ${isTe ? `హిప్ లైన్: ${(h/4 + 2).toFixed(1)}"` : `Hip Line: ${(h/4 + 2).toFixed(1)}"`}
        </text>

        <!-- SIDE SLIT / CHAAK HIGHLIGHT -->
        <line x1="${pHipPoint.x}" y1="${hipY}" x2="${pFlarePoint.x}" y2="${bottomY}" stroke="#dc2626" stroke-width="2.5" />
        <circle cx="${pHipPoint.x}" cy="${hipY}" r="5" fill="#dc2626" />
        <rect x="${pHipPoint.x + 12}" y="${hipY + 30}" width="125" height="36" rx="6" fill="#fff" stroke="#dc2626" stroke-width="1"/>
        <text x="${pHipPoint.x + 74}" y="${hipY + 46}" font-size="9" font-weight="800" fill="#dc2626" text-anchor="middle">
          ${isTe ? "✂ సైడ్ చాక్ ఓపెనింగ్" : "✂ SIDE SLIT / CHAAK"}
        </text>
        <text x="${pHipPoint.x + 74}" y="${hipY + 58}" font-size="8.5" fill="#64748b" text-anchor="middle">
          ${isTe ? "21\" వద్ద ప్రారంభం" : "Open from 21\" Level"}
        </text>

        <!-- Bottom Hem Allowance -->
        <line x1="${originX}" y1="${bottomY - 14}" x2="${pFlarePoint.x}" y2="${bottomY - 14}" stroke="#b45309" stroke-dasharray="3,3" stroke-width="1"/>
        <text x="${(originX + pFlarePoint.x)/2}" y="${bottomY + 16}" font-size="10" font-weight="600" fill="#b45309" text-anchor="middle">
          ${isTe ? "కింద మడత కుట్టు అలవెన్స్: 2.0\"" : "Bottom Hem Turning Allowance: 2.0\""}
        </text>
      </svg>
    `;
  }

  // ==========================================
  // MODEL 4: WESTERN PANEL TOP WITH MANDARIN COLLAR
  // ==========================================
  renderWesternTopSvg(data, isTe) {
    const { c, w, armholeDepth, neckWidth, shoulderHalf } = data.raw;
    const originX = 105;
    const originY = 85;

    const shoulder_px = shoulderHalf * 21;
    const neckW_px = neckWidth * 20;
    const chestW_px = (c / 4 + 2.5) * 19;
    const waistW_px = (w / 4 + 2.0) * 19;
    const topLength_px = 320;
    const panelCutX = originX + (chestW_px * 0.42);

    const pNape = { x: originX, y: originY };
    const pNeckEnd = { x: originX + neckW_px, y: originY };
    const pShoulderEnd = { x: originX + shoulder_px, y: originY + 14 };
    const pChestPoint = { x: originX + chestW_px, y: originY + armholeDepth * 21 };
    const pWaistPoint = { x: originX + waistW_px, y: originY + 175 };
    const pHemSide = { x: originX + waistW_px + 8, y: originY + topLength_px - 35 };
    const pHemCenter = { x: originX, y: originY + topLength_px };

    return `
      <svg viewBox="0 0 620 520" class="pattern-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f0fdf4" />
            <stop offset="100%" stop-color="#dcfce7" />
          </linearGradient>
          <pattern id="grid4" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" stroke-width="0.75" />
          </pattern>
        </defs>

        <rect width="620" height="520" fill="url(#grid4)" />

        <!-- Title Badge -->
        <rect x="20" y="15" width="320" height="26" rx="13" fill="#15803d" fill-opacity="0.15" stroke="#15803d" stroke-width="1"/>
        <text x="35" y="32" font-size="11" font-weight="700" fill="#15803d">
          ${isTe ? "వెస్ట్రన్ ప్యానెల్ టాప్ & చైనీస్ కాలర్" : "WESTERN PANEL TOP & MANDARIN COLLAR"}
        </text>

        <!-- MANDARIN STAND COLLAR BAND (Illustrated Above Neckline) -->
        <g id="mandarin-collar">
          <path d="
            M ${originX - 18} ${originY - 32}
            L ${originX + neckW_px + 25} ${originY - 32}
            Q ${originX + neckW_px + 32} ${originY - 45}, ${originX + neckW_px + 25} ${originY - 50}
            L ${originX - 18} ${originY - 50}
            Z
          " fill="#fef08a" stroke="#ca8a04" stroke-width="1.8" />
          <text x="${originX + (neckW_px + 25)/2}" y="${originY - 37}" font-size="8.5" font-weight="700" fill="#854d0e" text-anchor="middle">
            ${isTe ? "చైనీస్ స్టాండ్ కాలర్ (1.25\" Stand)" : "MANDARIN COLLAR BAND (1.25\")"}
          </text>
        </g>

        <!-- FRONT BUTTON PLACKET EXTENSION -->
        <rect x="${originX - 18}" y="${originY}" width="18" height="${topLength_px}" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5" />
        <circle cx="${originX - 9}" cy="${originY + 45}" r="3" fill="#475569" />
        <circle cx="${originX - 9}" cy="${originY + 95}" r="3" fill="#475569" />
        <circle cx="${originX - 9}" cy="${originY + 145}" r="3" fill="#475569" />
        <circle cx="${originX - 9}" cy="${originY + 195}" r="3" fill="#475569" />
        <circle cx="${originX - 9}" cy="${originY + 245}" r="3" fill="#475569" />
        <text x="${originX - 25}" y="${originY + 120}" font-size="8.5" font-weight="700" fill="#475569" 
              transform="rotate(-90 ${originX - 25} ${originY + 120})" text-anchor="middle">
          +0.75" ${isTe ? "బటన్ పట్టీ" : "PLACKET"}
        </text>

        <!-- Main Body with Curved Shirt-tail Hem -->
        <path d="
          M ${pNape.x} ${pNape.y}
          L ${pNeckEnd.x} ${pNeckEnd.y}
          L ${pShoulderEnd.x} ${pShoulderEnd.y}
          Q ${originX + shoulder_px - 14} ${pChestPoint.y - 15}, ${pChestPoint.x} ${pChestPoint.y}
          Q ${pChestPoint.x - 4} ${(pChestPoint.y + pWaistPoint.y)/2}, ${pWaistPoint.x} ${pWaistPoint.y}
          L ${pHemSide.x} ${pHemSide.y}
          Q ${originX + (waistW_px / 2)} ${pHemCenter.y + 10}, ${pHemCenter.x} ${pHemCenter.y}
          Z
        " fill="url(#topGrad)" stroke="#15803d" stroke-width="2.5" stroke-linejoin="round" />

        <!-- VERTICAL PRINCESS PANEL SEAM -->
        <path d="M ${pShoulderEnd.x - 22} ${pShoulderEnd.y + 2} Q ${panelCutX + 8} ${(originY + pChestPoint.y)/2}, ${panelCutX} ${pHemCenter.y - 12}" 
              fill="none" stroke="#16a34a" stroke-width="2" stroke-dasharray="4,4" />
        <text x="${panelCutX + 10}" y="${originY + 160}" font-size="9" font-weight="700" fill="#15803d">
          ${isTe ? "వర్టికల్ ప్యానెల్ కుట్టు" : "Vertical Panel Seam"}
        </text>

        <!-- Curved Hemline Callout -->
        <path d="M ${pHemSide.x + 8} ${pHemSide.y} L ${pHemSide.x + 8} ${pHemCenter.y}" stroke="#dc2626" stroke-width="1.5" marker-start="url(#arrow1)" marker-end="url(#arrow1)" />
        <text x="${pHemSide.x + 14}" y="${(pHemSide.y + pHemCenter.y)/2 + 4}" font-size="9" font-weight="700" fill="#dc2626">
          2.5" ${isTe ? "కర్వ్డ్ హెమ్ ఆర్చ్" : "Shirt-tail Curve"}
        </text>

        <!-- Dimension Labels -->
        <text x="${pChestPoint.x + 8}" y="${pChestPoint.y + 4}" font-size="10" font-weight="700" fill="#0f172a">
          ${isTe ? `ఛాతీ: ${(c/4 + 2.5).toFixed(1)}"` : `Bust (+2.5\"): ${(c/4 + 2.5).toFixed(1)}"`}
        </text>
        <text x="${pWaistPoint.x + 8}" y="${pWaistPoint.y + 4}" font-size="10" font-weight="700" fill="#0f172a">
          ${isTe ? `నడుము: ${(w/4 + 2.0).toFixed(1)}"` : `Waist: ${(w/4 + 2.0).toFixed(1)}"`}
        </text>
      </svg>
    `;
  }
}
