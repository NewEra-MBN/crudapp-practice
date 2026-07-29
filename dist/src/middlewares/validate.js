import { ApiError } from "../utils/ApiError.js";
import httpStatus from 'http-status';
import pick from "../utils/pick.js";
import Joi from "joi";
export const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const obj = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(obj);
    console.log(value, error);
    if (error) {
        console.log(error);
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new ApiError(httpStatus.BAD_REQUEST, error.message));
    }
    Object.assign(req, value);
    return next();
};
//# sourceMappingURL=validate.js.map