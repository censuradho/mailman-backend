import 'reflect-metadata'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import createConnection from './database'

import routes from './routes'

dotenv.config()

const app = express()

createConnection()

app.use(cors())
app.use(express.json())
app.use(routes)

export default app
