/**
 * STITCHABLE - Fabric Meterage & Roll Width Estimator
 * Based on the Fabric Requirement & Conversion Chart (Indian Garment Design Book, P. 78-79)
 */

export class FabricEstimator {
  constructor(getLang) {
    this.getLang = getLang;
  }

  estimate({ garmentType, rollWidth, heightCategory, sizeCategory }) {
    const isTe = this.getLang() === "te";
    const width = parseInt(rollWidth) || 44;

    // Base meters on standard 44" fabric width
    const baseEstimates = {
      "plain-blouse": { baseMeters: 0.85, name: { en: "Plain Traditional Blouse", te: "సాధారణ సారీ బ్లౌజ్" } },
      "princess-blouse": { baseMeters: 1.0, name: { en: "Princess Cut Designer Blouse", te: "ప్రిన్సెస్ కట్ బ్లౌజ్" } },
      "plain-kameez": { baseMeters: 2.25, name: { en: "Plain Kameez / Kurti", te: "సాధారణ కమీజ్ / కుర్తీ" } },
      "anarkali-suit": { baseMeters: 5.25, name: { en: "20-Kali Royal Anarkali", te: "20-కలి రాయల్ అనార్కలి" } },
      "patiala-salwar": { baseMeters: 3.75, name: { en: "Shahi Patiala Salwar", te: "షాహీ పాటియాలా సల్వార్" } },
      "churidar": { baseMeters: 2.25, name: { en: "Churidar with Churis", te: "కుచ్చులున్న చురీదార్" } },
      "six-panel-petticoat": { baseMeters: 2.0, name: { en: "6-Panel Saree Petticoat", te: "6-ప్యానెల్ చీర పెట్టీకోట్" } },
      "umbrella-skirt": { baseMeters: 3.25, name: { en: "Full Circular Umbrella Skirt", te: "ఫుల్ సర్క్యులర్ అంబ్రెల్లా స్కర్ట్" } },
      "western-top": { baseMeters: 1.85, name: { en: "Western Panel Shirt/Top", te: "వెస్ట్రన్ ప్యానెల్ టాప్" } },
      "kids-frock": { baseMeters: 1.6, name: { en: "Little Girls Party Frock", te: "చిన్న పిల్లల పార్టీ ఫ్రాక్" } }
    };

    const target = baseEstimates[garmentType] || baseEstimates["plain-kameez"];
    let meters = target.baseMeters;

    // Adjustment for Roll Width based on NIFT Conversion Table
    // Narrower widths (32", 36") require more length; wider (54", 60") require less length
    let widthMultiplier = 1.0;
    if (width <= 32) widthMultiplier = 1.35;
    else if (width <= 36) widthMultiplier = 1.22;
    else if (width <= 44) widthMultiplier = 1.0;
    else if (width <= 54) widthMultiplier = 0.85;
    else if (width >= 60) widthMultiplier = 0.75;

    // Adjustment for customer height
    let heightMultiplier = 1.0;
    if (heightCategory === "tall") heightMultiplier = 1.15;
    else if (heightCategory === "petite") heightMultiplier = 0.92;

    // Adjustment for size
    let sizeMultiplier = 1.0;
    if (sizeCategory === "xl") sizeMultiplier = 1.20;
    else if (sizeCategory === "l") sizeMultiplier = 1.10;
    else if (sizeCategory === "s") sizeMultiplier = 0.95;

    let totalMeters = meters * widthMultiplier * heightMultiplier * sizeMultiplier;
    // Add 25 cm beginner buffer
    totalMeters += 0.25;
    totalMeters = Math.ceil(totalMeters * 4) / 4; // round to nearest 0.25m

    const yards = (totalMeters * 1.09361).toFixed(2);

    let layoutAdvice = "";
    if (width <= 36) {
      layoutAdvice = isTe
        ? "36\" చిన్న పన్నా కావడంతో, ముందు మరియు వెనుక భాగాలను పక్కపక్కన కాకుండా ఒకదాని కింద ఒకటి నిలువుగా పరచాలి (Crosswise folding layout)."
        : "For 36\" narrow width, place front and back panels lengthwise one below the other rather than side-by-side to accommodate full bust width.";
    } else if (width >= 54) {
      layoutAdvice = isTe
        ? "54\" పెద్ద పన్నా కావడంతో, బాడీస్ మరియు చేతుల ముక్కలను పక్కపక్కనే పరిచి సులభంగా క్లాత్ ఆదా చేయవచ్చు."
        : "Wide 54\" fabric allows placing sleeves and bodice panels side-by-side on crosswise fold, saving fabric significantly.";
    } else {
      layoutAdvice = isTe
        ? "ప్రామాణిక 44\" పన్నా - నిలువు అంచులను కలిపి రెండు మడతలు వేసి సెంటర్ ఫోల్డ్ పై కట్ చేయండి."
        : "Standard 44\" width - Fold fabric in half lengthwise with selvages aligned; cut major panels on the centre fold.";
    }

    return {
      garmentName: target.name[this.getLang()],
      rollWidth: `${width}\" (${(width * 2.54).toFixed(0)} cm)`,
      totalMeters: `${totalMeters.toFixed(2)} Meters`,
      totalYards: `${yards} Yards`,
      bufferNote: isTe ? "కటింగ్ మరియు ముడుచుకుపోయే వెసులుబాటు కోసం 25 సెం.మీ చేర్చబడింది." : "Includes 25 cm safety margin for shrinkage and layout adjustments.",
      layoutAdvice
    };
  }
}
