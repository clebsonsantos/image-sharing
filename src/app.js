import { Connection } from "./connections/mongoose.js"
import express from 'express'
const app = express()

Connection()
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get("/", (request, response)=> {
  response.json({}).statusCode(200)
})

export default app