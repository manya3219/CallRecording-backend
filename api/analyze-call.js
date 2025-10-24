import express from 'express'
import cors from 'cors'
import multer from 'multer'
import analyzeRoute from '../routes/analyzeCall.js'
import path from 'path'
import { fileURLToPath } from 'url'
import { createServerlessExpress } from '@vercel/node'

const __filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

const app = express()
app.use(cors())

const upload = multer({ dest: path.join(__dirname, '../uploads/') })

app.post('/api/analyze-call', upload.single('audio'), analyzeRoute)

export default createServerlessExpress(app)