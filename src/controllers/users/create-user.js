import mongoose from 'mongoose'
import User from '../../entities/user.js'

const UserModel = new mongoose.model("User", User)

export class CreateUser {
  async handle(request, response){

    const form = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password
    }
    try{
      if(form.name == "" || form.email == "" || form.password == ""){
        response.status(400).end()
        return 
      }
      const findUser = await UserModel.findOne({'email': form.email})

      if(findUser != undefined){
        response.status(400).json({error: "E-mail já cadastrado."}).end()
        return
      }
      const newUser = new UserModel(form)
      await newUser.save()
      response.status(200).json({email: request.body.email})

    }catch(e){
      response.status(400).end()
    }
  }
}