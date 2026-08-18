import { Router } from "express";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { validate } from "../middlewares/validate.js";
import authValidation from "../validations/auth.validation.js";
import authControllers from "../controllers/auth.controllers.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.post('/login',validate(authValidation.login), authControllers.login)
router.post('/signup', validate(authValidation.register), authControllers.register)
router.post('/logout', authControllers.logout);
router.post('/forgot-password',validate(authValidation.forgotPassword), authControllers.forgotPassword)
router.post('/reset-password',validate(authValidation.resetPassword), authControllers.resetPassword)
router.post('/send-verification-email', authControllers.sendVarificationEmail)
router.post('/verify-email',auth("verify-email"), authControllers.verifyEmail)
export default router