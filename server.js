import express from 'express'
import cors from 'cors'
import multer from 'multer'
import analyzeRoute from './routes/analyzeCall.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())

const upload = multer({ dest: path.join(__dirname, 'uploads/') })

app.post('/api/analyze-call', upload.single('audio'), analyzeRoute)
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
