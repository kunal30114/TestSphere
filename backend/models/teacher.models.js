import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const teacherSchema = new mongoose.Schema({
  name :{
    type:String,
    required:true,
    trim:true
  },
  password :{
    type:String,
    required:true,
  },
  email :{
    type:String,
    required:true,
  },
  refreshToken :{
    type:String,
    default:""
  },
  myTest : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Quiz"
  }]

})

teacherSchema.pre("save",async function(next){

  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,10);
  }

  next();

});

teacherSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password);
}

teacherSchema.methods.generateAccessToken =  function(){
  
  return jwt.sign({
    _id : this._id,
    email : this.email,
    name : this.name
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn : process.env.ACCESS_TOKEN_EXPIRY
  })

}

teacherSchema.methods.generateRefreshToken =  function(){
  
  return jwt.sign({
    _id : this._id,
   
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn : process.env.REFRESH_TOKEN_EXPIRY
  })

}

export const Teacher = mongoose.model("Teacher" , teacherSchema);


