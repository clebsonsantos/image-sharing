import jsonwebtoken from 'jsonwebtoken'
const jwt_secret = `hdhdhddbdjdksbskjbssssbhfdwuwiwururuehskdkdldccd` || process.env.JWT_SECRET
import User from '../../entities/user.js'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const UserModel = new mongoose.model("User", User)
class AuthUser {

  async handle(request, response){
    const { email, password } = request.body

    const user = await UserModel.findOne({"email": email})
    if(user == undefined){
      response.status(403).json({errors: {email: "E-mail não cadastrado"}})
      return
    }
    const isPassword = await bcrypt.compare(password, user.password)
    if(!isPassword){
      response.status(403).json({errors: {password: "Senha incorreta"}})
      return 
    }

    jsonwebtoken.sign({email, name: user.name, id: user._id}, jwt_secret, {expiresIn: "48h"}, (err, token)=>{
      if(err){
        response.status(500).end()
      }else{
        response.status(200).json({token})
      }
    })
  }
}

export default AuthUser