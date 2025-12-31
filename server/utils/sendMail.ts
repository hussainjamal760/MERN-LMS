import sgMail from '@sendgrid/mail';
import path from 'path';
import ejs from "ejs";
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

interface EmailOptions {
    email: string;
    subject: string;
    template: string;
    data: { [key: string]: any };
}

const sendMail = async (options: EmailOptions): Promise<void> => {
    const { email, subject, template, data } = options;

    // Template path setup
    const templatePath = path.join(__dirname, '../mails', template);

    // EJS file render karein
    const html: string = await ejs.renderFile(templatePath, data);

    const msg = {
        to: email,
        from: process.env.SENDGRID_MAIL as string, // Verified Sender Email
        subject,
        html,
    };

    try {
        await sgMail.send(msg);
        console.log("Email sent successfully via SendGrid");
    } catch (error: any) {
        console.error("SendGrid Error:", error.response?.body || error.message);
        throw new Error(error.message);
    }
};

export default sendMail;