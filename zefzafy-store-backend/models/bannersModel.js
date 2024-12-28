import mongoose from "mongoose";


const Bannerschema = new mongoose.Schema({
text : {type : String , required : true },
discount : {type : Number },
image : {type : Object },
},{timestamps: true});

const BannersModel = mongoose.model("HeroBanner" , Bannerschema);

export default BannersModel;


