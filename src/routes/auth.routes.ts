import { Router } from "express";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { validate } from "../middlewares/validate.js";
import authValidation from "../validations/auth.validation.js";

const router = Router();

router.post('/login',validate(authValidation.login), (req : Request, res : Response) => {
   res.send('hey i am login')
})
router.post('/signup', validate(authValidation.register), (req: Request, res : Response) => res.send('Hey I am signup'))

export default router