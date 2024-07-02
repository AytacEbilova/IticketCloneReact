require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendVerifyEmail(email, randomCode) {
  //send email with token
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailData = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your Account (iTicket.az)",
    text: "That was easy!",
    html: `Click <b style="color:red;">here</b> Your authentication code : ${randomCode}`,
  };

  await transporter.sendMail(mailData);
}

module.exports = sendVerifyEmail;