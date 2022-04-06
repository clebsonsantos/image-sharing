import supertest from 'supertest'
import app from '../src/app.js'
const request = supertest(app)

test("A aplicação deve responder na porta 3131", async ()=>{
  return request.get("/").then((res)=>{
    const status = res.statusCode
    expect(status).toEqual(200)
  }).catch(err=>{
    fail(err)
  })
})