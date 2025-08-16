import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({

  title :{
    type:String,
    required:true,
    trim:true
  },
  createdBy :{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Teacher"
    },
  duration :{
    type:String,
    required:true
  },
  data :{
    type : String,
    required:true,
  }
})


export const Quiz = mongoose.model("Quiz" , quizSchema);