import mongoose from 'mongoose'

export const Connection = () => {
  mongoose.connect("mongodb://localhost:27017/image-sharing")
    .then(()=>{
      // console.log("Conecção com banco de dados realizada com sucesso.")
    })
    .catch(err=> {
      console.log(err)
    })
}