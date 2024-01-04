import mongoose from 'mongoose'
const catogarySchema= new mongoose.Schema({
   name:{
    type:String,
    unique:true
   },
   description:{
    type:String
   },
   status:{
    type:Boolean,
    default:true
   }
})


export const Catogary=mongoose.model('Catogary',catogarySchema)