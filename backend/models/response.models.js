import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  quiz :{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Quiz"
  },
  studentName :{
    type:String,
    ref:"Quiz"
  },
  studentEmail :{
    type : String,
    required : true
  },
  timeTaken :{
    type : Number,
    required:true
  },
  score : {
    type: Number,
    required : true
  }
},{
  timestamps: true
})


export const Response = mongoose.model("Response" , responseSchema);