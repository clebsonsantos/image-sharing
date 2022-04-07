import mongoose from 'mongoose'
import User from '../../entities/user.js'


const UserModel = new mongoose.model("User", User)

export class DeleteUser {
  async handle(request, response){

    try{
      const email = request.params.email
      if(email == ""){
        response.status(400).end()
        return 
      }
       await UserModel.deleteOne({'email': email})
       response.status(200).end()

    }catch(e){
      response.status(400).end()
    }
  }
}