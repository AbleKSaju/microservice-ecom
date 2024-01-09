import express from 'express'
export const router=express()

import {
    firstrequest,
    getCart,
    deleteCart,
    deletItemCart,


} from '../controller/cartController.js'
import authMiddleware from '../authmiddleware.js'





router.get('/',firstrequest)
router.get("/getCart",authMiddleware,getCart)
router.get('/deletCart',authMiddleware,deleteCart)
router.post('/deleteSingleItem',authMiddleware,deletItemCart)
