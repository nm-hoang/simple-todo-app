const nodemailer = require('nodemailer');
// EMAIL_USERNAME = 'helloweb2byhoang@gmail.com';
// EMAIL_PASSWORD = 'minhhoang121';
async function send(to, subject, content){

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          // user: process.env.EMAIL_USERNAME,
          // pass: process.env.EMAIL_PASSWORD,
         user: 'helloweb2byhoang@gmail.com',
        pass: 'minhhoang121',
        }
      });
      
      transporter.sendMail({
        from: 'helloweb2byhoang@gmail.com',
        to,
        subject,
        text: content,
      });
}

module.exports = {send};