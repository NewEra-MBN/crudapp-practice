import httpStatus from 'http-status';
import tokenService from './token.service.js';
import userService from './user.service.js';
import { ApiError } from '../utils/ApiError.js';
import { TokenType, User } from '../../generated/prisma/client.js';
import { encryptPassword, encryptPassword, isPasswordMatch } from '../utils/encryption.js';
import { AuthTokenResponse } from '../types/response.js';
import exclude from '../utils/exclude.js';
import prisma from '../client.js';
import emailService from './email.service.js';






const loginUserWithEmailAndPassword = async (
    email: string,
    password: string
): Promise<Omit<User, 'password'>> => {
    const user = await userService.getUserbyEmail(email);

    if (!user || !(await isPasswordMatch(password, user.password as string))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password')
    }

    return exclude(user, ['password'])
}


const logout = async (refreshToken: string): Promise<void> => {
    const refreshTokenData = await prisma.token.findFirst({
        where: {
            token: refreshToken,
            type: TokenType.REFRESH,
            blacklisted: false
        }
    })
    if (!refreshTokenData) {
        throw new ApiError(httpStatus.NOT_FOUND, 'not found')
    }

    await prisma.token.delete({
        where: {
            id: refreshTokenData.id
        }
    })
}


const refreshAuth = async (refreshToken: string): Promise<AuthTokenResponse> => {
    const refreshTokenData = await tokenService.verifyToken(refreshToken, TokenType.REFRESH)

    const { userId } = refreshTokenData;
    await prisma.token.delete({
        where: {
            id: refreshTokenData.id
        }
    })
    return tokenService.generateAuthTokens({ id: userId })
}


const resetPassword = async (resetPasswordToken: string, password: string): Promise<void> => {
    try {
        const tokenData = await tokenService.verifyToken(resetPasswordToken, TokenType.RESET_PASSWORD);
        const user = await userService.getUserbyId(tokenData.userId)
        if (!user) throw new ApiError(httpStatus.BAD_REQUEST, 'you are not user')

        const encryptedPassword = await encryptPassword(password);

          const deletedToken = await prisma.token.deleteMany({
            where: { id: tokenData.userId, type: TokenType.RESET_PASSWORD }
        })
      const updatedUser = await userService.updateUserById(user.id, { password: encryptedPassword })
      console.log(updatedUser)
    console.log(deletedToken)
    } catch {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed')
    }
}

const sendVarificationEmail = async(email : string):Promise<void> => {
    const token =await tokenService.generateEmailVarificationToken(email);
    await emailService.sendVarificationEmail(email, token);
}

const verifyEmail = async(token: string): Promise<void> => {
    try{
        const tokenData = await tokenService.verifyToken(token, 'VERIFY_EMAIL');
        const user = await userService.getUserbyId(tokenData.userId);
        if(!user) throw new ApiError(httpStatus.NOT_FOUND, 'you are not user');
        await prisma.token.deleteMany({
            where: {userId: tokenData.userId, type: 'VERIFY_EMAIL'}
        })
        await userService.updateUserById(tokenData.userId, {isEmailVerified: true})
    }catch(err) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Email varification failed')
    }
}


export default {
    loginUserWithEmailAndPassword,
    logout,
    refreshAuth,
    resetPassword,
    sendVarificationEmail,
    verifyEmail
};