
import { ApiError } from "../utils/ApiError.js";
import httpStatus from 'http-status'
import { Request, Response, NextFunction } from "express";

export const validate = (schema : any) => (req : Request, res : Response, next : NextFunction) => {
    console.log(req.body)
    const {error} = schema.body.validate(req.body)
    
    if(error) throw new ApiError(httpStatus.BAD_REQUEST, error.message)

    next() 
}