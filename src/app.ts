import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import compression from 'compression'
import dotenv from 'dotenv'

import createConnection from './database'

import routes from './routes'

dotenv.config()

const app = express()

createConnection()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(compression())

app.use(routes)

export default app
