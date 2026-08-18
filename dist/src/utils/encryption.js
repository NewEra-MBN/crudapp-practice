import bcrypt from "bcrypt";
export const encryptPassword = async (password) => {
    const encryptPassword = bcrypt.hash(password, 12);
    return encryptPassword;
};
export const isPasswordMatch = async (password, userPassword) => {
    return bcrypt.compare(password, userPassword);
};
//# sourceMappingURL=encryption.js.map