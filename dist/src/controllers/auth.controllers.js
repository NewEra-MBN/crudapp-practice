import catchAsync from "../utils/catchAsync.js";
import userService from "../services/user.service.js";
import exclude from "../utils/exclude.js";
import tokenService from "../services/token.service.js";
import httpStatus from 'http-status';
const register = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.createUser(email, password);
    const userWithoutPassword = exclude(user, ['password', 'createdAt', 'updatedAt']);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user: userWithoutPassword, tokens });
});
export default {
    register
};
//# sourceMappingURL=auth.controllers.js.map