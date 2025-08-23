import {Router} from "express";

import { registerTeacher , loginTeacher ,logoutTeacher, generateQuiz , getUser , getTestList , getResponses , getQuizName} from "../controllers/teacher.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/registerTeacher").post(registerTeacher);
router.route("/loginTeacher").post(loginTeacher);
router.route("/logoutTeacher").post(verifyJWT,logoutTeacher);
router.route("/generateTest").post(verifyJWT,generateQuiz);
router.route("/getUser").post(verifyJWT,getUser);
router.route("/getTest").post(verifyJWT,getTestList);
router.route("/getResponses").post(verifyJWT,getResponses);
router.route("/getQuizName").post(verifyJWT,getQuizName);

export default router;