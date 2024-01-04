import mongoose from 'mongoose'
const productSchema= new mongoose.Schema({
   title:{
    type:String,
    unique:true
   },
   catogary:{
    type:mongoose.Schema.Types.ObjectId,
   },
   description:{
    type:String
   },
   price:{
    type:Number
   },
   offerPrice:{
    type:Number,
    default:0
   },
   stoke:{
    type:Number,
    default:0
   },
   status:{
    type:Boolean,
    default:true
   },
   createdAt:{
    type:Date,
    default:Date.now()
   }
})


export const Product=mongoose.model('Product',productSchema)