// import prisma from "../client.js";
// import { Strategy as PassportJwtStrategy, ExtractJwt, VerifyCallback  } from "passport-jwt";
// import config from "./config.js";
// import { TokenType } from "../../generated/prisma/enums.js";


// const jwtOptions = {
//     secretOrKey: config.JWT.secret,
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
// }


// const jwtVerify: VerifyCallback = async (payload, done) => {
//     try{
//         if(payload.type !== TokenType.ACCESS){
//             throw new Error('Invalid token type')
//         }

//         const user = await prisma.user.findUnique({
//             select:{
//                 id: true,
//                 email: true,
//                 name: true
//             },
//             where: {id: payload.sub} 
//         });

//         if(!user) {
//             return done(null, false)
//         }
//         done(null, user)
//     }catch(error){
//         done(error, false)
//     }
// }

// export const JwtStrategy = new PassportJwtStrategy(jwtOptions, jwtVerify)




import prisma from "../client.js";
import { Strategy as PassportJwtStrategy, ExtractJwt, VerifyCallback } from "passport-jwt";
import config from "./config.js";
import { TokenType } from "../../generated/prisma/enums.js";

console.log('Hello I am here')
const jwtOptions = {
    secretOrKey: config.JWT.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}


const jwtVerify : VerifyCallback = async(payload, done) => {
    console.log('Payload reached verfied fucntion', payload)
    try{
        if(payload.type !== TokenType.ACCESS) {
            throw new Error('Invalid token')
        }

        const user= await prisma.user.findUnique({
            select:{
                id: true,
                email: true,
                name: true,
                role: true
            },
            where: {id : payload.sub}
        });

        if(!user) {
            return done(null, false)
        }

        done(null, user)
    }catch(error){
        done(error, false)
    }
}


export const JwtStrategy = new PassportJwtStrategy(jwtOptions, jwtVerify)