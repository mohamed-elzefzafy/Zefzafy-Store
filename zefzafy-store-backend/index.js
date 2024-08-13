import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
// dotenv.config({path: process.env.DOTENV_CONFIG_PATH  || path.resolve(__dirname, "./config.env") });
dotenv.config({path : "./config.env"});
import {notFound , errorHandler} from "./middlewares/errorMiddleware.js";
import mountRoutes from "./routes/mountRoutes.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
connectDb();

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
