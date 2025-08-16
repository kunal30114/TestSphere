import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  quiz :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Quiz"
  },
  student :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Quiz"
  },
  startTime :{
    type : Date,
    required:true,
  }
},{
  timestamps: true
})


export const Response = mongoose.model("Response" , responseSchema);