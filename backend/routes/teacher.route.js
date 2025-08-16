import {Router} from "express";

import { registerTeacher , loginTeacher ,logoutTeacher, generateQuiz} from "../controllers/teacher.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/registerTeacher").post(registerTeacher);
router.route("/loginTeacher").post(loginTeacher);
router.route("/logoutTeacher").post(verifyJWT,logoutTeacher);
router.route("/generateTest").post(verifyJWT,generateQuiz);


export default router;