import supertest from 'supertest'
import app from '../src/app.js'
const request = supertest(app)

let mainUser = {
  name: "clebson",
  email:"clebson@email.com",
  password: "123456"
}
beforeAll(async ()=>{
  // Create user on database
  return request.post("/users").send(mainUser)
    .then(()=> {})
    .catch(err => console.log(err))
})

afterAll(async ()=>{
  //Remove user on database
  return request.delete(`/users/${mainUser.email}`)
    .then(()=>{})
    .catch(err=> console.log(err))
})

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
  test("Should prevent the user from using an email already registered", async ()=> {
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

describe('Authentication', () => {
  test('should return token when logged in', async () => {
    return request.post("/auth").send({email: mainUser.email, password: mainUser.password})
      .then(res=>{
        expect(res.status).toEqual(200)
        expect(res.body.token).toBeDefined()
      })
      .catch(err=>{
        fail(err)
      })
  });

  test('should prevent the unregistered user from logging in, using email', async () => {
    return request.post("/auth").send({email: 'teste@email.com', password: "teste123"})
      .then(res=>{
        expect(res.statusCode).toEqual(403)
        expect(res.body.errors.email).toEqual("E-mail não cadastrado")
      })
      .catch(err=>{
        fail(err)
      })
  });
  test('should prevent the unregistered user from logging in, using password', async () => {
    return request.post("/auth").send({email: mainUser.email, password: 'teste123'})
      .then(res=>{
        expect(res.statusCode).toEqual(403)
        expect(res.body.errors.password).toEqual("Senha incorreta")
      })
      .catch(err=>{
        fail(err)
      })
  });
});