import express from "express";
const app = express();
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
const port = 3001;
import { router } from "./router/productRoute.js";
import { route } from "./router/catogaryRoute.js";
import session from "express-session";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { dbConnect, store } from "./config/mongo-connect.js";
import { serviceToConsumer } from "./kafka/serviceToConsumer.js";
//----------

//--------------
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
//----------

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 72 * 60 * 60 * 1000,
      httpOnly: true,
    },
    store: store,
  })
);

//-----------------
//product router
app.use("/product", router);
//catogary router
app.use("/catogary", route);

app.listen(port, () => console.log(`product-server is running ${port}`));
