import express from "express";
import authMiddleware from "../authmiddleware.js";
export const router=express()
import {
    fistrequest,
    createAddress,
    editAddress,
    editProdfile,
    loginUser,
    logoutUser,
    newPassword,
    requestForchangePassword,
    signUpUser,
    verifyUser,
    verifyotpChagePAssword,
    createOrder
} from '../controller/userCtrl.js'

router.get('/',fistrequest)
router.post('/signUp',signUpUser)
router.post('/veirfyOtp',verifyUser)
router.post('/requestForForgetPassoword',requestForchangePassword)
router.post('/veriyOtpForgetPassword',verifyotpChagePAssword)
router.post('/newPassword',newPassword)
router.post('/login',loginUser)
router.post('/createAdress',authMiddleware,createAddress)
router.post('/editAdress',authMiddleware,editAddress)
router.post('/editProfile',authMiddleware,editProdfile)
router.get('/logout',logoutUser)
router.post('/create-order',authMiddleware,createOrder)




