import passport from "passport";
import  httpStatus  from "http-status";
import { ApiError } from "../utils/ApiError.js";
import { roleRights } from "../config/roles.js";
import { NextFunction, Request, Response } from "express";
import { User } from "../../generated/prisma/client.js";



const varification = (
    req : any,
    resolve : (value?:unknown) => void,
    reject : (reason? : unknown) => void,
    requiredRights: string[]
) =>
    async(err : unknown, user: User | false, info : unknown) => {
        if(err || !user || info) {
            return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please Authenticate'))
        }
        req.user = user;

        if(requiredRights.length) {
            const userRights = roleRights.get(user.role) ?? []
            console.log(user)
           const isAllowed = requiredRights.every((requiredRight) => (
                userRights.includes(requiredRight)
            ))

            if(!isAllowed) return reject(new ApiError(httpStatus.FORBIDDEN, 'forbidden'))
        }
        resolve()
    }


    const auth = 
        (...requiredRight: string[]) =>
            async(req: Request, res : Response, next : NextFunction) => {
                return new Promise((resolve, reject) => {
                    passport.authenticate(
                        'jwt',
                        {session: false},
                        varification(req, resolve, reject, requiredRight)
                    )(req, res, next)
                })
                .then(() => next())
                .catch((err) => next(err))
            }

            export default auth;