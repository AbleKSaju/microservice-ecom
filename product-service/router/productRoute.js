import express from 'express'

export const router=express()

import {
    firstRequest,
    aProduct,
    createProduct,
    editProduct,
    filterCatogaryProduct,
    getAllProduct,
    listUnlistProduct,
    sortPriceProduct,
    filterNameProduct,
  addTocart
} from '../controller/productController.js'
import authMiddleware from '../authmiddleware.js'

router.get('/firstrequest',firstRequest)
router.get('/getAllProduct',getAllProduct)
router.post('/aProduct',aProduct)
router.post('/createProduct',authMiddleware,createProduct)
router.post("/editProduct",authMiddleware,editProduct)
router.post('/filterCatogaryProduct',filterCatogaryProduct)
router.post('/listUnlistProduct',authMiddleware,listUnlistProduct)
router.post('/sortPriceProduct',sortPriceProduct)
router.post('/filterNameProduct',filterNameProduct)
router.post("/addToCart",authMiddleware,addTocart)