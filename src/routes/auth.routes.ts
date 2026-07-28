import { Router } from "express";
import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError.js";

const router = Router();

router.post('/login', (req : Request, res : Response) => {
    throw new ApiError(403, 'forbidden')
})
router.post('/signup', (req: Request, res : Response) => res.send('Hey I am signup'))

export default router