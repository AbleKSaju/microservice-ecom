import  express from 'express'
const app=express()
import  bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()
const port=3004
import {dbConnect,store} from './config/mongo-connect.js'
import session  from 'express-session';
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { serviceToConsumer } from './kafka/serviceToConsumer.js'
import { router } from './router/orderRoute.js'

//----------


//--------------
dbConnect()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan("dev"))
//----------
app.use(session({
    secret:process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 72 * 60 * 60 * 1000, 
      httpOnly: true,
    },
   store:store
  })
);

await serviceToConsumer('cart-topic')
app.use('/order',router)

//-----------------



   







app.listen(port,()=>console.log(`order-server is running ${port}`))


    


