import jwt from 'jsonwebtoken';

export const generateToken = (res,user) => {
    const payload={
        id:user._id,
        email:user.email,
        name:user.name,
        mobile:user.mobile
    }
    const token= jwt.sign(payload,"jwtSecret",{
        expiresIn:"30d"
    })

    res.cookie('jwt',token,{
        httpOnly:true,
        secure:'development'!=='development',
        sameSite:"strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return token
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, "jwtSecret");
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

