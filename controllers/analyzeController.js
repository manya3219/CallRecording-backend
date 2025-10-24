import fs from 'fs'
import path from 'path'

const PARAMS = [
{ key: "greeting", name: "Greeting", weight: 5, desc: "Call opening within 5 seconds", inputType: "PASS_FAIL" },
{ key: "collectionUrgency", name: "Collection Urgency", weight: 15, desc: "Create urgency, cross-questioning", inputType: "SCORE" },
{ key: "rebuttalCustomerHandling", name: "Rebuttal Handling", weight: 15, desc: "Address penalties, objections", inputType: "SCORE" },
{ key: "callEtiquette", name: "Call Etiquette", weight: 15, desc: "Tone, empathy, clear speech", inputType: "SCORE" },
{ key: "callDisclaimer", name: "Call Disclaimer", weight: 5, desc: "Take permission before ending", inputType: "PASS_FAIL" },
{ key: "correctDisposition", name: "Correct Disposition", weight: 10, desc: "Use correct category with remark", inputType: "PASS_FAIL" },
{ key: "callClosing", name: "Call Closing", weight: 5, desc: "Thank the customer properly", inputType: "PASS_FAIL" },
{ key: "fatalIdentification", name: "Identification", weight: 5, desc: "Missing agent/customer info", inputType: "PASS_FAIL" },
{ key: "fatalTapeDiscloser", name: "Tape Disclosure", weight: 10, desc: "Inform customer about recording", inputType: "PASS_FAIL" },
{ key: "fatalToneLanguage", name: "Tone & Language", weight: 15, desc: "No abusive or threatening speech", inputType: "PASS_FAIL" }
]

export const analyzeController = async (req, res) => {
  try {
    const audioFile = req.file
    if (!audioFile) return res.status(400).json({ error: 'No audio uploaded' })

    const scores = {}
    for (const p of PARAMS) {
      if (p.type === 'PASS_FAIL') {
        scores[p.key] = Math.random() > 0.3 ? p.weight : 0
      } else {
        scores[p.key] = Math.floor(Math.random() * (p.weight + 1))
      }
    }

    const overallFeedback = 'Agent performed decently. Some mandatory disclosures were missed.'
    const observation = 'Customer raised a question about charges; agent provided clarity.'

    try { fs.unlinkSync(audioFile.path) } catch (e) {  }

    return res.json({ scores, overallFeedback, observation })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Server error during analysis' })
  }
}

export default analyzeController
