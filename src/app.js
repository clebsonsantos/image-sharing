import { Connection } from "./connections/mongoose.js"
import express from 'express'
import routes from './routes.js'
const app = express()

Connection()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(routes)

export default app