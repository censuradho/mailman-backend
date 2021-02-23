import 'reflect-metadata'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import './database'

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())

app.get(`/teste`, (req,res) => {
  res.json(process.env.BASE_URL)
})

export default app
