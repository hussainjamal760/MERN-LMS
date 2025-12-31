import nodemailer , {Transporter} from 'nodemailer'
import path from 'path';
import ejs from "ejs"
require('dotenv').config();

interface EmailOptions{
    email:string;
    subject:string;
    template:string;
    data:{[key:string] : any}
}

const sendMail = async(options : EmailOptions):Promise <void> =>{
    const transporter:Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '465'),
        secure:true,
        logger: true,
        debug: true,
        auth: {user: process.env.SMTP_USER, 
               pass : process.env.SMTP_PASSWORD
        },
    })   
    
    const {email , subject , template , data } = options;

    const templatePath = path.join(__dirname , '../mails',template);

    const html:string = await ejs.renderFile(templatePath ,data);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    }

    await transporter.sendMail(mailOptions)
}

export default sendMail;