import mongoose from 'mongoose' 






const orderSchema = new mongoose.Schema({
    totalPrice:{
        required:true,
        type:Number
    },
    createdOn:{
        required:true, 
        type:Date,
        default:Date.now()
    },
    product:{
        required:true,
        type:Array
    },
    userId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId

    },
    payment:{
        required:true,
        type:String,
    },
    status:{
        required:true,
        type:String
    },
    address:{
        type:Array,
        required:true
    }
    
});






export const Order = mongoose.model("order",orderSchema)
