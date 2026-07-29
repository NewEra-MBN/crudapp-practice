import Joi from "joi";
import { password } from "./custom.validation.js";
const register = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required().custom(password)
    })
};
const login = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
};
export default {
    register,
    login
};
//# sourceMappingURL=auth.validation.js.map