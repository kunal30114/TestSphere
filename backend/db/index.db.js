import mongoose from "mongoose";


const dbConnnect = async ()=>{
  try {
    await mongoose.connect(`${process.env.DB_URI}/quizzer`);
    console.log("DB Connected Successfully !!");
  } catch (error) {
      console.log("Error while Connecting DB");
      throw error;
      
  }
}

export {dbConnnect};