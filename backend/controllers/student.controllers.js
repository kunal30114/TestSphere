import { Student } from "../models/student.models.js"
import { Response } from "../models/response.models.js" 
import { asyncHandler , ApiError , ApiResponse } from "../utils/index.utils.js"

const registerStudent = asyncHandler(async (req,res)=>{
  const {name , rollNo , email} = req.body;

  if(!name || !rollNo || !email){
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

  return res.json(
    new ApiResponse(200,{},"Student registered and saved to DB")
  )

})



const submitResponse = asyncHandler(async (req,res)=>{
  const {name, rollNo, email , startTime , quiz} = req.body;

  let instance = await Student.findOne({
    email
  });

  const savedResponse = await Response.create({
    quiz,
    instance,
    startTime
  })

  if(!savedResponse){
    return ApiError(400,"Error in saving response to server");
  }

  return res.json(
    new ApiResponse(200,{},"Response saved successfully")
  )
})

export {registerStudent};