import mongoose from 'mongoose'
import User from '../../entities/user.js'

const user = new mongoose.model("User", User)

export class CreateUser {
  async handle(request, response){

    const form = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password
    }
    try{
      const newUser = new user(form)
      await newUser.save()
      response.status(200).json({email: request.body.email})

    }catch(e){
      response.status(400).end()
    }
  }
}