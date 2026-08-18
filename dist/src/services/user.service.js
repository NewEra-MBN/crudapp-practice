import { Role } from '../../generated/prisma/client.js';
import httpStatus from 'http-status';
import prisma from '../client.js';
import { ApiError } from '../utils/ApiError.js';
import { encryptPassword } from '../utils/encryption.js';
/// create user 
const createUser = async (email, password, name, role = Role.USER) => {
    if (await getUserbyEmail(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
    }
    return prisma.user.create({
        data: {
            email,
            name,
            password: await encryptPassword(password),
            role
        }
    });
};
const getUserbyId = async (id, keys = [
    'id',
    'email',
    'name',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
]) => {
    return prisma.user.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
};
const getUserbyEmail = async (email, keys = [
    'id',
    'email',
    'name',
    'password',
    'role',
    'isEmailVerified',
    'createdAt',
    'updatedAt'
]) => {
    return prisma.user.findUnique({
        where: { email },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    });
};
export default {
    getUserbyEmail,
    getUserbyId,
    createUser
};
//# sourceMappingURL=user.service.js.map