import jwt from  "jsonwebtoken";
import path from "path";
import dotenv from "dotenv";
dotenv.config({path : "../config.env"});

export const generateToken = (res , userId) => {
  const token = jwt.sign({userId : userId} , process.env.JWT_SECRET , {expiresIn : "30d"});

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true, // Ensure it's true for production
    sameSite: 'none', // Allow cross-origin cookies
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
}


// // export default generateToken;

// res.cookie("jwt", token, {
//   httpOnly: true,
//   secure: true, // Ensure it's true for production
//   sameSite: 'none', // Allow cross-origin cookies
//   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
// });
