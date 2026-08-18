import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiError.js';
import { Token, TokenType } from '../../generated/prisma/client.js';
import prisma from '../client.js';
import { AuthTokenResponse, TokeResponse } from '../types/response.js';
import config from '../config/config.js';
import userService from './user.service.js';



// const generateToken = (
//     userId: number,
//     expires: Moment,
//     type: TokenType,
//     secret = config.JWT.secret,
// ): string => {
//     const payload = {
//         sub: userId,
//         iat: moment().unix(),
//         exp: expires.unix(),
//         type
//     };

//     return jwt.sign(payload, secret)
// }




// const generateToken = (
//   userId: number,
//   expires: Moment,
//   type: TokenType,
//   secret = config.JWT.secret
// ) : string => {
//     const payload = {
//         sub: userId,
//         iat: moment().unix(),
//         exp: expires.unix(),
//         type
//     }

//     return jwt.sign(payload, secret)
// }


const generateToken = (
    userId: number,
    type: TokenType,
    expire: Moment,
    secret = config.JWT.secret
): string => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expire.unix(),
        type
    }

    return jwt.sign(payload, secret)
};

const saveToken = async (
    token: string,
    userId: number,
    type: TokenType,
    expires: Moment,
    blacklisted = false
): Promise<Token> => {
    return await prisma.token.create({
        data: {
            token,
            userId: userId,
            type,
            expires: expires.toDate(),
            blacklisted
        }
    })
}


const verifyToken = async(
    token: string,
    type: TokenType
): Promise<Token> => {
    const payload = jwt.verify(token, config.JWT.secret)
    const userId = Number(payload.sub);
    const tokenData = await prisma.token.findFirst({
        where: {token, type, userId, blacklisted: false}
    })

    if(!tokenData) {
        throw new Error('Token not found')
    }

    return tokenData
}


const generateAuthTokens = async(user: {userId: number}): Promise<TokeResponse> => {
    const accessTokenExpire = moment().add(config.JWT.accesExpirationMinutes, "minutes");
    const accessToken = generateToken(user.userId, TokenType.ACCESS, accessTokenExpire)


    const refreshTokenExpire = moment().add(config.JWT.refreshExpirationDays, 'dayes')
    const refreshToken = generateToken(user.userId, TokenType.REFRESH, refreshTokenExpire)


    return {
        accessToken: {
            token: accessToken,
            expires: accessTokenExpire.toDate()
        },
        refreshToken: {
            token: refreshToken,
            expires: refreshTokenExpire.toDate()
        }
    }
}

export const generateResetPasswordToken = async (email: string): Promise<string> => {
    const user = await userService.getUserbyEmail(email)
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'email is not found')
    const expire = moment().add(config.JWT.resetPasswordExpirationMinutes, 'minute');;
    const token = generateToken(user.id, expire, TokenType.RESET_PASSWORD)
    await saveToken(token, user.id, expire, TokenType.RESET_PASSWORD)
    return token
}


const generateEmailVarificationToken = async (email: string): Promise<string> => {
    const user = await userService.getUserbyEmail(email);
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'email is not found');
    const expire = moment().add(config.JWT.verifyEmailExpirationMinutes, 'minutes');

    const verifyEmailToken = generateToken(user.id, expire, TokenType.VERIFY_EMAIL)
    await saveToken(verifyEmailToken, user.id, expire, TokenType.VERIFY_EMAIL);
    return verifyEmailToken
}



export default {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
    generateResetPasswordToken,
    generateEmailVarificationToken
}