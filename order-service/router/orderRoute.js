import express from 'express'
export const router=express()
import {showAllOrder} from '../controller/orderController.js'
import authMiddleware from '../authmiddleware.js'

router.get('/getAllOrders',authMiddleware,showAllOrder)



