import express from 'express'
import cors from 'cors'
import multer from 'multer'
import analyzeRoute from '../routes/analyzeCall.js'
import { createServerlessExpress } from '@vercel/node'
import path from 'path'

const app = express()
app.use(cors())
app.use(express.json())


const upload = multer({ dest: path.join('/tmp', 'uploads/') })


app.post('/api/analyze-call', upload.single('audio'), analyzeRoute)

export default createServerlessExpress(app)