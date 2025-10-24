import { analyzeController } from '../controllers/analyzeController.js'

export default function (req, res) {
  // req.file is added by multer in server.js
  return analyzeController(req, res)
}
