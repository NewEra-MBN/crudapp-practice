import { User, Role, Prisma } from '../../generated/prisma/client.js'
import httpStatus from 'http-status';
import prisma from '../client.js';
import { ApiError } from '../utils/ApiError.js';
import { encryptPassword } from '../utils/encryption.js';




/// create user 

const createUser = async (
    email: string,
    password: string,
    name?: string,
    role: Role = Role.USER
): Promise<User> => {
    if (await getUserbyEmail(email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists')
    }

    return prisma.user.create({
        data: {
            email,
            name,
            password: await encryptPassword(password),
            role
        }
    })
}


const getUserbyId = async<Key extends keyof User>(
    id: number,
    keys: Key[] = [
        'id',
        'email',
        'name',
        'password',
        'role',
        'isEmailVerified',
        'createdAt',
        'updatedAt'
    ] as Key[]
):Promise<Pick<User,Key> | null> => {
    return prisma.user.findUnique({
        where:{id},
        select: keys.reduce((obj, k) => ({...obj, [k] : true}),{})
    }) as Promise <Pick<User, Key>|null>
}




const getUserbyEmail = async <Key extends keyof User>(
    email: string,
    keys: Key[] = [
        'id',
        'email',
        'name',
        'password',
        'role',
        'isEmailVerified',
        'createdAt',
        'updatedAt'
    ] as Key[]
): Promise<Pick<User, Key> | null> => {
    return prisma.user.findUnique({
        where: { email },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<User, Key> | null>
}

const updateUserById = async<Key extends keyof User>(
    userId: number,
    updateBody:Prisma.UserUpdateInput,
    keys: Key[] = ['id','email', 'role'] as Key[]
):Promise<Pick<User,Key>|null> => {
    const user = await getUserbyId(userId);
    if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  console.log(user)

  if(updateBody.email && (await getUserbyEmail(updateBody.email as string))){
    throw new ApiError (httpStatus.BAD_REQUEST, 'the email is already taken')
  }

  const updateUser = await prisma.user.update({
    where:{id: user.id},
    data: updateBody,
    select: keys.reduce((obj, k) =>({...obj, [k]: true}),{})
  })

  return updateUser as Pick<User, Key>|null
}


export default {
    getUserbyEmail,
    getUserbyId,
    createUser,
    updateUserById
}