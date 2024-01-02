import  mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    pinCode: {
        type: Number,
        required: true,
    },
    areaStreet: {
        type: String,
        required: true,
    },
    ladmark: {
        type: String,
        required: true,
    },
    townCity: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    adressType: {
        type: String,
        default:"Home"
    }
});


const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number
    },
    isAdmin:{
        type:Boolean,
        default:false
      },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    address: [addressSchema]
})


export const User=mongoose.model('User',userSchema)