import {ApiResponse, ApiError, asyncHandler} from "../utils/index.utils.js"
import { Teacher } from "../models/teacher.models.js";
import { Quiz } from "../models/quiz.models.js";
import jwt from "jsonwebtoken";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";


//generate auth tokens
const generateRefreshAndAccessToken = async (userId)=>{
  try {

      const instance =await Teacher.findById(userId);
      
      const refreshToken = instance.generateRefreshToken();
      const accessToken = instance.generateAccessToken();

      instance.refreshToken = refreshToken;
      await instance.save({validationBeforeSave : false});

      return {accessToken,refreshToken};
  } catch (error) {
      throw new ApiError(500,"Error while generating access and refresh token.")
  }

}

const registerTeacher = asyncHandler(async (req , res)=>{
    //Process : extract details from req body (frontend)
    //check if all required fields are validated and does it already exist?
    //store in db
    // console.log(req);
    const {name , password , email } = req.body;

    if(!name || !password || !email){
      throw new ApiError(400,"All required details are not entered by user");
    }

    const existTeacher = await Teacher.findOne({email});
    console.log(existTeacher);
    if(existTeacher){
      throw new ApiError(400,"Email-ID already exists");
    }

    const user = await Teacher.create({
      name,
      password,
      email
    })

    const instanceCreated = await Teacher.findOne({email});

    if(!instanceCreated){
      throw new ApiError(400,"Error while registering teacher !")
    }

    return res.status(200).json(
        new ApiResponse(200,instanceCreated,"Teacher registered successfully !")
    )

});

const loginTeacher = asyncHandler( async (req,res)=>{
  //get details : username , password
  //check user in db if exists
  //check password 
  //generate refresh and access tokens and save refreshToken to db
  //send refresh and access token to cookies 

  const {email , password } = req.body;

  const instance = await Teacher.findOne({email});

  if(!instance){
    throw new ApiError(400,"User Not Exists !!");
  }

  const isPasswordValid = await instance.isPasswordCorrect(password);
  console.log(isPasswordValid);
  
  if(!isPasswordValid){
    throw new ApiError(401,"Invalid Credientials");
  }

  const {accessToken , refreshToken} = await generateRefreshAndAccessToken(instance._id);

  const loggedInUser = await Teacher.findById(instance._id).select("-password -refreshToken");

  const options = {
        httpOnly: true,
        secure: true,
        sameSite : 'None'
  };

  return res
  .status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "Teacher logged In Successfully"
        )
  )

})



const logoutTeacher = asyncHandler( async (req,res)=>{
  //check if user is already logged in
  //clear refreshToken value in DB
  //clear token values in cookie

  // console.log("manav");
  
  const instance = await Teacher.findById(req.user._id);

  if(!instance){
    throw new ApiError(400,"User Not Found!");
  }

  instance.refreshToken = "";
  await instance.save({validateBeforeSave: false});
    
  const options = {
        httpOnly: true,
        secure: true,
        
  };

  return res.status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(
      new ApiResponse(
            200, 
            {},
            "Teacher logged Out Successfully"
        )
  )
})


const refreshAccessToken = asyncHandler( async (req,res) =>{
  //extract incoming refresh token
  //decrypt it using jwt.verify
  //check in database 
  //extract user and callgetAccessandRefreshToken
  //save to databse and cookies
  
  const incomingRefreshToken = req.body.refreshToken || req.cookie.refreshToken;

  if(!incomingRefreshToken){
    throw new ApiError(401,"Invalid Incoming Refresh Token : Unautharised Req");
  }

  try {
    const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

    const user = await Teacher.findById(decodedToken?._id);

    if(!user){
      throw new ApiError(401,"No refresh token exists in DB");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used")
    }
    
    const options = {
          httpOnly: true,
          secure: true,
          sameSite : 'None'
    };


    const {accessToken, refreshToken: newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
    
    // Save new refresh token to database
    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {accessToken, refreshToken: newRefreshToken},
            "Access token refreshed"
        )
    )

  } catch (error) {
    throw new ApiError(401,"Error while Refreshing AccessToken");
  }
})

const generateQuiz = asyncHandler(async (req,res)=>{
     try {
        const {topic , noOfQ , difficulty , duration} = req.body;
        console.log("Hi1");
        
        if(!topic || !noOfQ || !difficulty || !duration){
          throw new ApiError(400,"All required details are not mentioned for generating quiz")
        }
        // console.log("Hi2");
        const llm = new ChatGoogleGenerativeAI({
          model: "gemini-2.0-flash",
          temperature: 0,
          maxRetries: 2,
          
        });
        
        
        const aiMsg = await llm.invoke([
          [
            "system", `You are a multiple-choice question generator. Task: Based on the input parameters: difficulty: a string ("easy", "medium", "hard"), topic: a string representing the subject, noOfQ: an integer representing the number of questions, generate exactly noOfQ multiple-choice questions for the given topic and difficulty. Rules: Each question must have exactly 4 options. Only one option should be correct. correct must exactly match one of the strings in options. All questions must match the given difficulty level. Do not provide explanations, notes, or any extra text. Output only valid JSON. Output JSON example: { "topic": "Max Heap", "difficulty": "hard", "questions": [ { "question": "Which of the following arrays represents a valid max-heap?", "options": ["[100, 50, 90, 20, 40, 80, 85]", "[90, 100, 80, 70, 60, 50, 40]", "[50, 60, 55, 65, 70, 75, 80]", "[120, 110, 115, 100, 105, 95, 90]"], "correct": "[100, 50, 90, 20, 40, 80, 85]" }, { "question": "If a max-heap is stored in an array with 1-based indexing, what is the index of the left child of the node at index i?", "options": ["i/2", "2*i", "2*i + 1", "i - 1"], "correct": "2*i" }, { "question": "After inserting an element into a max-heap, which operation is typically used to restore the heap property?", "options": ["Heapify Down", "Bubble Up", "Merge Heap", "Delete Root"], "correct": "Bubble Up" } ] }
            The output should be strictly in JSON , no unnecessary quotes , etc.
        `
          ],
          ["human", `{
            topic: ${topic},
            difficulty: ${difficulty},
            noOfQ : ${noOfQ}
          }`],
        ]);
        // console.log(req.user);
        let temp = JSON.stringify(aiMsg.content);
        temp = temp.replace("```json","");
        temp = temp.replace("```","");
        // temp = JSON.parse(temp);
        // console.log(temp);
        
        const test = await Quiz.create({
          title : topic,
          createdBy : req.user,
          duration,
          data : temp
        })
        
    
        return res.json(
          new ApiResponse(
            200,{
              dataUrl : test._id
            }
            ,
            "Test Generated Successfully"
          )
        )
    
        } catch (error) {
            return new ApiError(400,"Error while generating test response")
        }
})


const getUser = asyncHandler(async (req,res)=>{
    // console.log("Hi1 from getUser");
    // console.log(req.user);
    
    
    return res.status(200).json(
      new ApiResponse(200,req.user,"")
    )
})



export {registerTeacher,loginTeacher,logoutTeacher , refreshAccessToken, generateQuiz , getUser};