import mongoose from "mongoose";
import bcrypt from  "bcryptjs";

const UserSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  email: {
    type : String,
    required : true,
    unique : true,
  },
  password: {
    type : String,
    required : true,
    minlength : 6 ,
  },
  profilePhoto: {
    type : Object,
  default : {
    url : "https://res.cloudinary.com/dw1bs1boz/image/upload/v1702487318/Zef-Blog/Default%20images/download_w26sr9.jpg",
    public_id : null
  }
  },
  isAdmin : {
    type : Boolean,
    required : true,
    default : false
    },

},{timestamps : true})


UserSchema.pre("save" , async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password , 8);
  };
  next();
})


const UserModel = mongoose.model("User" , UserSchema);

export default UserModel;