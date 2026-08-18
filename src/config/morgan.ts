import { response, Response } from "express";
import morgan from "morgan";
import config from "./config.js";
import logger from "./logger.js";


morgan.token('message', (req, res:Response) => res.locals.errorMessage || '');


const getIpAddress = () => (config.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpAddress()}:method :url :status -:response-time ms`;
const errorResponseFormat = `${getIpAddress()}:method :url :status -:response-time ms --message: :message`;



export const successHandler = morgan(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: {write: (message) => logger.info(message.trim())}
});


export const errorHandler = morgan(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: {write: (message) => logger.error(message)}
})



export default {
    successHandler, 
    errorHandler
}