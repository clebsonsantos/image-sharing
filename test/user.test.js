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

})