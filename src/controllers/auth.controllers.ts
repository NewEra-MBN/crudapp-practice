import catchAsync from "../utils/catchAsync.js";
import userService from "../services/user.service.js";
import exclude from "../utils/exclude.js";
import tokenService from "../services/token.service.js";
import emailService from "../services/email.service.js";
import httpStatus from 'http-status'
import { ApiError } from "../utils/ApiError.js";
import { isPasswordMatch } from "../utils/encryption.js";
import authSevice from "../services/auth.sevice.js";
// const register = catchAsync(async(req, res) => {
//     const {email, password} = req.body;
//     const user =await userService.createUser(email,password);
//     const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt']);
//     const tokens = await tokenService.generateAuthTokens(user);
//     res.status(httpStatus.CREATED).send({user: userWithoutPassword, tokens})
// })


const register = catchAsync(async(req, res) => {
    const {email, password} = req.body;
    const user = await userService.createUser(email, password);
    const safeUser = exclude(user, ['password','createdAt','updatedAt']);
    const tokens =await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({user: safeUser, tokens})
})

const login = catchAsync(async(req, res) => {
    const {email, password} = req.body;
    const user = await authSevice.loginUserWithEmailAndPassword(email, password);
    const tokens =await tokenService.generateAuthTokens(user)
    res.send({user, tokens})
})


const logout  = catchAsync(async(req, res) => {
    authSevice.logout(req.body.refreshToken)
    res.send(httpStatus.NO_CONTENT).send();
})

const refreshTokens = catchAsync(async(req, res) => {
    const tokens = await authSevice.refreshAuth(req.body.refreshToken)

    res.send({...tokens})
})


const forgotPassword = catchAsync(async(req, res) => {
    const resetPasswordToken =await tokenService.generateResetPasswordToken(req.body.email);
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.NO_CONTENT).send()
})


const resetPassword = catchAsync(async(req, res) => {
    await authSevice.resetPassword(req.query.token as string, req.body.password);
    res.send(httpStatus.NO_CONTENT).send()
})

const sendVarificationEmail = catchAsync(async(req, res) => {
    await authSevice.sendVarificationEmail(req.body.email)
    res.send(httpStatus.NO_CONTENT).send()
})

const verifyEmail = catchAsync(async(req, res) => {
    const token = req.query.token as string;
    await authSevice.verifyEmail(token)
    res.send(httpStatus.NO_CONTENT).send()
})

export default {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    sendVarificationEmail,
    verifyEmail
}