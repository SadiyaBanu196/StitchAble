/**
 * STITCHABLE - Sewing Machine Troubleshooter Wizard
 * Interactive diagnostic selector for instant mechanical solutions
 */

export class Troubleshooter {
  constructor(getLang) {
    this.getLang = getLang;
    this.issues = [
      {
        id: "thread-snapping",
        icon: "fa-link-slash",
        name: {
          en: "Upper Thread Breaks Repeatedly",
          te: "పై దారం మాటిమాటికి తెగిపోవడం"
        },
        cause: {
          en: "Upper tension too tight, blunt/hooked needle, needle inserted backwards, or thread spool notch catching thread.",
          te: "టెన్షన్ స్ప్రింగ్ చాలా బిగుతుగా ఉండటం, సూది మొన వంకర కావడం, లేదా సూది ఫ్లాట్ సైడ్ రాంగ్ డైరెక్షన్ లో అమర్చడం."
        },
        remedy: {
          en: [
            "Turn upper tension dial down from 6-8 to 3-4.",
            "Replace needle with a new, genuine organ/singer needle (Size 14 for cotton).",
            "Verify flat side of needle shank faces away from you / away from clamp screw.",
            "Rethread machine with presser foot UP so thread settles into tension discs."
          ],
          te: [
            "పై టెన్షన్ డయల్ ను 3 లేదా 4 నంబర్ కు వదులు చేయండి.",
            "పాత సూదిని మార్చి కొత్త సూది వేయండి (కాటన్ కు సైజ్ 14).",
            "సూదిలోని ఫ్లాట్ సైడ్ సరైన వైపు ఉండేలా సరిచూసి బిగించండి.",
            "ప్రెషర్ ఫుట్ పైకి ఎత్తి మళ్ళీ మొదటి నుండి దారం ఎక్కించండి."
          ]
        }
      },
      {
        id: "bobbin-nesting",
        icon: "fa-tornado",
        name: {
          en: "Lower Bobbin Thread Tangling / Birds Nesting",
          te: "కింది దారం లూపులు పడటం / గుడ్డ కింద ముద్ద రావడం"
        },
        cause: {
          en: "95% of cases: Upper thread slipped out of take-up lever or threaded with presser foot down.",
          te: "పై దారం టెన్షన్ ప్లేట్ల మధ్య నుండి జారిపోవడం లేదా టేక్-అప్ లివర్ లో దారం లేకపోవడం."
        },
        remedy: {
          en: [
            "Lift presser foot and re-thread upper thread through the take-up lever.",
            "Check that bobbin rotates in clockwise direction inside the bobbin case.",
            "Ensure bobbin thread is pulled under the tiny tension spring on the bobbin case.",
            "Perform yo-yo drop test: bobbin suspended by thread should drop 1-2 inches only."
          ],
          te: [
            "ప్రెషర్ ఫుట్ ఎత్తి పై దారాన్ని టేక్-అప్ లివర్ కన్నంలో గట్టిగా కూర్చోబెట్టండి.",
            "బాబిన్ కేస్ లో బాబిన్ క్లాక్‌వైజ్ దిశలో తిరుగుతుందో లేదో చూడండి.",
            "బాబిన్ దారం చిన్న టెన్షన్ స్ప్రింగ్ పట్టీ కింద నుండి వచ్చేలా లాగండి.",
            "బాబిన్ దారాన్ని చేత్తో వేలాడదీసి కుదిపితే 1 అంగుళం జారేలా స్క్రూ సరిచేయండి."
          ]
        }
      },
      {
        id: "skipped-stitches",
        icon: "fa-forward-step",
        name: {
          en: "Skipped Stitches (Missing Stitches on Lycra/Silk)",
          te: "కుట్టు మధ్యలో తప్పిపోవడం (సిల్క్ లేదా లైక్రాపై)"
        },
        cause: {
          en: "Wrong needle point style (using sharp needle on stretch knits), bent needle, or needle not pushed all the way up into clamp.",
          te: "స్ట్రెచ్ బట్టలకు సాధారణ సూది వాడటం, సూది మొద్దుబారడం, లేదా సూది బార్ లో పూర్తిగా పైకి ఎక్కించకపోవడం."
        },
        remedy: {
          en: [
            "Switch to a Ballpoint (Golden) Needle for stretch knits / hosiery.",
            "Switch to Size 9 or 11 needle for pure silk and chiffon.",
            "Loosen needle clamp, push needle fully upward until it hits the stopper, retighten firmly.",
            "Place thin tissue paper under slippery fabric and tear away after stitching."
          ],
          te: [
            "స్ట్రెచ్ లేదా లైక్రా బట్టలకు గోల్డెన్ బాల్‌పాయింట్ సూది వాడండి.",
            "సిల్క్ లేదా జార్జెట్ కు సన్నని సైజ్ 9 లేదా 11 సూది వాడండి.",
            "సూదిని బార్ లో పైకి పూర్తిగా నెట్టి స్క్రూ గట్టిగా బిగించండి.",
            "జారే సిల్క్ బట్టల కింద పేపర్ లేదా న్యూస్‌పేపర్ ముక్క పెట్టి కుట్టండి."
          ]
        }
      },
      {
        id: "needle-breaking",
        icon: "fa-burst",
        name: {
          en: "Needle Snaps / Breaks Instantly",
          te: "సూది పదే పదే విరిగిపోవడం"
        },
        cause: {
          en: "Pulling fabric forcefully from behind while sewing, sewing across thick pins or zippers, or needle hitting needle plate/presser foot.",
          te: "కుట్టేటప్పుడు బట్టను చేత్తో వెనుకకు బలంగా లాగడం, జిప్ లేదా పిన్నులపై కుట్టడం, లేదా సూది ప్రెషర్ ఫుట్ కు తగలడం."
        },
        remedy: {
          en: [
            "Never pull or push fabric; let the feed dogs pull the fabric naturally.",
            "Hand-walk the balance wheel when stitching over thick intersecting seams or zippers.",
            "Check that presser foot screw is tight and foot is aligned straight.",
            "Use heavier Size 16 or 18 needle when sewing denim or canvas."
          ],
          te: [
            "బట్టను చేత్తో గట్టిగా లాగవద్దు; మిషన్ దంతాలే (Feed dogs) బట్టను ముందుకు తోయాలి.",
            "మందపాటి జాయింట్లు లేదా జిప్‌ల వద్ద చేత్తో మిషన్ చక్రాన్ని నెమ్మదిగా తిప్పండి.",
            "ప్రెషర్ ఫుట్ లూజ్ గా లేకుండా సూది హోల్ మధ్యలోకి దిగుతుందో లేదో చూడండి.",
            "డెనిమ్ లేదా జీన్స్ కు సైజ్ 16 లేదా 18 హెవీ సూది వాడండి."
          ]
        }
      },
      {
        id: "fabric-puckering",
        icon: "fa-rug",
        name: {
          en: "Fabric Puckering / Seam Gathering Wrinkles",
          te: "కుట్టు వేసినప్పుడు గుడ్డ ముడుచుకుపోవడం"
        },
        cause: {
          en: "Excessive thread tension, blunt needle punching holes, or stitch length too short.",
          te: "దారం టెన్షన్ చాలా ఎక్కువగా ఉండటం లేదా కుట్టు సైజు చాలా చిన్నగా ఉండటం."
        },
        remedy: {
          en: [
            "Increase stitch length setting from 2mm to 2.5mm - 3mm.",
            "Loosen upper thread tension dial slightly.",
            "Hold fabric lightly in front and back of needle to provide gentle taut tension.",
            "Press seam with steam iron on proper fabric heat setting."
          ],
          te: [
            "కుట్టు సైజును 2.5 నుండి 3కి పెంచండి.",
            "పై దారం టెన్షన్ ను కొద్దిగా లూజ్ చేయండి.",
            "బట్టను కుట్టేటప్పుడు రెండు చేతులతో సున్నితంగా పట్టుకోండి.",
            "కుట్టిన తర్వాత స్టీమ్ ఐరన్ తో ప్రెస్ చేయండి."
          ]
        }
      }
    ];
  }

  getIssue(id) {
    return this.issues.find(i => i.id === id) || this.issues[0];
  }
}
