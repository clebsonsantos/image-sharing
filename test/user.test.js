import supertest from 'supertest'
import app from '../src/app.js'
const request = supertest(app)

describe("User Registration", ()=> {

  test("Should registration user with success", async ()=> {
    const time = Date.now()
    const email = `${time}@email.com`
    const user = {
      name: "clebson",
      email,
      password: "123456"
    }

    return request.post("/users")
      .send(user)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.email).toEqual(email)
      })
      .catch(err => {
        fail(err)
      })
  })
  test("Should prevent empty data entry", async ()=>{

    const user = {
      name: "",
      email: "",
      password: ""
    }

    return request.post("/users")
      .send(user)
      .then(res => {
        expect(res.statusCode).toEqual(400)
      })
      .catch(err => {
        fail(err)
      })
  })
  test("Should prevent the user from using an email already registered", ()=> {
    const time = Date.now()
    const email = `${time}@email.com`
    const user = {
      name: "clebson",
      email,
      password: "123456"
    }

    return request.post("/users")
      .send(user)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.email).toEqual(email)

        return request.post("/users").send(user)
          .then(res=>{
            expect(res.statusCode).toEqual(400)
            expect(res.body.error).toEqual("E-mail já cadastrado.")
          })
          .catch(err=>{
            fail(err)
          })
      })
      .catch(err => {
        fail(err)
      })
  })

})