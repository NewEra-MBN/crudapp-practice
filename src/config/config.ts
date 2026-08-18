import dotenv from 'dotenv';
import path from 'node:path';
import Joi, { valid } from 'joi';

dotenv.config({ path: path.join(process.cwd(), '.env') });


const envVarsSchema = Joi.object().keys({
    NODE_ENV : Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(5000),
    DATABASE_URL: Joi.string().uri({ scheme: [/postgres(?:ql)?/] }).required(),
    JWT_SECRET: Joi.string().required().description('jwt secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
        .default(30)
        .description('minutes after which access tokens expired'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
        .default(30)
        .description('days after which refresh token expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the email'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in theemails sent by the appp')
})
.unknown()


const {value: envVars, error} = envVarsSchema
    .prefs({errors : {label : 'key'}})
    .validate(process.env)


if(error) {
    throw new Error (`Config validation error: ${error.message}`)
}



export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    JWT: {
        secret: envVars.JWT_SECRET,
        accesExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD
            },
            from: envVars.EMAIL_FROM
        }
    }
}