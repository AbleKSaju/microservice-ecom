import jwt from 'jsonwebtoken';

const generateToken=(res,user)=>{
    const payload={
        id:user._id,
        email:user.email,
        name:user.name,
        mobile:user.mobile
    }
    const token= jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"30d"
    })

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !=='development',
        sameSite:"strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return token
}




export default generateToken