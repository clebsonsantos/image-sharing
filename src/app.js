import express from 'express'
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get("/", (request, response)=> {
  response.json({}).statusCode(200)
})

export default app