import { Student } from "../models/student.models.js"
import { Response } from "../models/response.models.js" 
import {Quiz} from "../models/quiz.models.js"
import { asyncHandler , ApiError , ApiResponse } from "../utils/index.utils.js"

const registerStudent = asyncHandler(async (req,res)=>{
  const {name , rollNo , email, quiz} = req.body;

  if(!name || !rollNo || !email || !quiz){
    throw new ApiError(400,"Incomplete Student Details");
  }

  let instance = await Student.findOne({
    email
  });
 
  if(!instance){
      instance = await Student.create({
        name,
        rollNo,
        email
      }) 
  }

  const existingResponse =await Response.findOne({
    $and : [{student: instance._id},{quiz}]
  })

  if(existingResponse){
    throw new ApiError(400,"Student not allowed : already given !")
  }

  return res.json(
    new ApiResponse(200,{},"Student registered and saved to DB")
  )

})


const submitResponse = asyncHandler(async (req,res)=>{
  const {quiz,studentName,studentEmail,timeTaken,score} = req.body;

  const instance = await Response.findOne({
    $and: [{quiz: quiz}, {studentEmail: studentEmail}]
  })
  const savedResponse = await Response.create({
    quiz : quiz,
    studentName : studentName,
    studentEmail : studentEmail,
    timeTaken : timeTaken,
    score: score
  })

  if(!savedResponse){
    throw new ApiError(400,"Error in saving response to server");
  }
  if(instance){
    throw new ApiError(400,"Student trying to submit the test again");
  }

  return res.json(
    new ApiResponse(200,{},"Response saved successfully")
  )
})

const getTest = asyncHandler(async (req,res)=>{
  console.log("Hi123");
  const {id} = req.body;
  const test = await Quiz.findById(id);
  if(!test){
    throw new ApiError(400,"Invalid test ID");
  }
  return res.status(200).json(
    new ApiResponse(200,{
      data : test.data
    }),
    "Test sent succesfully !"
  )
})

export {registerStudent,submitResponse , getTest};