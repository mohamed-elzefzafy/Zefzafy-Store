import mongoose from "mongoose"


const connectDb = async() => {
try {
  await mongoose.connect(process.env.DB_URL);
  console.log("connected to mongoDB Successfully");
} catch (error) {
  console.log(`connection failed to mongoDB : ${error}`);
  process.exit(1);
}
  
}


export default connectDb;