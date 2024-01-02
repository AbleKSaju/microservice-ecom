import express from "express";
const app = express();
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
const port = 3000;
import { router } from "./router/userRoute.js";
import { dbConnect, store } from "./config/mongo-connect.js";
import session from "express-session";
import morgan from "morgan";
import cookieParser from "cookie-parser";
//----------

//--------------
dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
//----------

//-----------------
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

app.use("/user", router);

app.listen(port, () => console.log(`useer-service is running ${port}`));
