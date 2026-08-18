import nodemailer from 'nodemailer'
import config from '../config/config.js'

const transport = nodemailer.createTransport(config.email.smtp);

if(config.env !== 'test') {
    transport
        .verify()
        .then(() => console.log('Connected to emal server'))
        .catch(() => console.log('unable to connecto to email server'))
}

const sendEmail = async(to: string, subject: string, text: string) => {
    const msg = {from: config.email.smtp.from, to, subject, text};
    await transport.sendMail(msg)
}


const sendResetPasswordEmail = async(to: string, token: string) => {
    const subject = 'Reset Password'
    const resetPasswordUrl = `http://localhost:5000/api/auth/reset-password?token=${token}`;
    const text = `Dear user, To verify email click on this linke ${resetPasswordUrl}`

    await sendEmail(to, subject, text);
}

const sendVarificationEmail = async(to: string, token: string) => {
    const subject = 'Email Varification'
    const varificationEmailUrl = `http://localhost:5000/api/auth/verify-email?token=${token}`
    const text = `Dear User , to verify your eamil click on the link ${varificationEmailUrl}`
    sendEmail(to, subject, text)
}

export default {
    sendResetPasswordEmail,
    sendVarificationEmail
}