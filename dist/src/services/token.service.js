import jwt from 'jsonwebtoken';
import moment from 'moment';
import { TokenType } from '../../generated/prisma/client.js';
import prisma from '../client.js';
import config from '../config/config.js';
const generateToken = (userId, expires, type, secret = config.JWT.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type
    };
    return jwt.sign(payload, secret);
};
// save token
const saveToken = (token, userId, expires, type, blacklisted = false) => {
    const createdToken = prisma.token.create({
        data: {
            token,
            userId: userId,
            expires: expires.toDate(),
            type,
            blacklisted
        }
    });
    return createdToken;
};
const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, config.JWT.secret);
    const userId = Number(payload.sub);
    const tokenData = await prisma.token.findFirst({
        where: { token, type, userId, blacklisted: false }
    });
    if (!tokenData) {
        throw new Error('Token not found');
    }
    return tokenData;
};
const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.JWT.accesExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires, TokenType.ACCESS);
    const refreshTokenExpires = moment().add(config.JWT.refreshExpirationDays, "days");
    const refreshToken = generateToken(user.id, refreshTokenExpires, TokenType.REFRESH);
    await saveToken(refreshToken, user.id, refreshTokenExpires, TokenType.REFRESH);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate()
        }
    };
};
export default {
    saveToken,
    generateAuthTokens,
    verifyToken
};
//# sourceMappingURL=token.service.js.map