import { object } from "joi";
import { Role } from "../../generated/prisma/enums.js";

const allRoles = {
    [Role.USER]: ["verify-email"],
    [Role.ADMIN] : ['getUsers', 'manageUsers']
}


export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles))

console.log(roleRights)