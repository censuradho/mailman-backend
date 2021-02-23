import 'reflect-metadata'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import './database'

import routes from './routes'

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(routes)

export default app
