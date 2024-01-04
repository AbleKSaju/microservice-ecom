import express from 'express'
export const route=express()
import {
fisrtRequest,
createCatogary,
editCatogary,
getAllcatogary,
listUnistCat,
} from '../controller/catogaryController.js'

route.get('/',fisrtRequest)
route.get('/getAllcatogary',getAllcatogary)
route.post('/createCatogary',createCatogary)
route.post("/editCatogary",editCatogary)
route.post('/listUnistCat',listUnistCat)

