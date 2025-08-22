import { Router } from "express";
import { registerStudent , submitResponse,getTest} from "../controllers/student.controllers.js";

const router = Router();

router.route("/registerStudent").post(registerStudent);
router.route("/submitTest").post(submitResponse);
router.route("/getTest").post(getTest);

export default router;