import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt'
import prisma from "../../client.js";
import { Prisma, Role } from "../../../generated/prisma/client.js";

const password = "password1";
const salt = bcrypt.genSaltSync(8);


export const userOne = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password,
    role: Role.USER,
    isEmailVerified: false
}


export const userTwo = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password,
    role: Role.USER,
    isEmailVerified: false
}


export const admin = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password,
    role: Role.ADMIN,
    isEmailVerified: false
}



export const insertUsers = async(users : Prisma.UserCreateManyInput[]) => {
   await prisma.user.createMany({
    data: users.map((user) => ({...user, password: bcrypt.hashSync(user.password, salt)}))
   })
}