import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
dotenv.config({path : "./config.env"});
import {notFound , errorHandler} from "./middlewares/errorMiddleware.js";
import mountRoutes from "./routes/mountRoutes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
connectDb();


app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_URL,
    // origin: 'http://localhost:3000'
    // origin: 'https://zef-proshop.web.app'
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',  process.env.FRONT_URL,);
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // res.setHeader('Access-Control-Allow-Origin', 'https://zef-proshop.web.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});




const port= process.env.PORT || 5000;

if (process.env.NODE_ENV === "development")
  {
    app.use(morgan("dev"));
    console.log(`mode : ${process.env.NODE_ENV}`);
  }
  

mountRoutes(app);

app.get("/" , (req, res) => {
  res.json("hello world");
});

app.use(notFound);
app.use(errorHandler);


app.listen(port , () => {
  console.log(`app running on port ${port}`);
  
})
