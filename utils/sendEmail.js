//new
const { LoggerLevel } = require("mongodb");
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: "behomohamed99@gmail.com",
                pass: "fmscyeanobvukebj",
            },
        });

        await transporter.sendMail({
            from: "behomohamed99@gmail.com",
            to: email,
            subject: 'oops looks like you forgot your password',
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;