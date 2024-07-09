require("dotenv").config();
const nodemailer = require("nodemailer");

async function sendTicketByMail(email, content) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
//maile mesaj ne formada getsin, example chixart ona uygun yazaq hazir html sehifeleri olur men bilen tapaq birin

  const mailData = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Order Details (iTicket.az)",
    text: `${content}`,
  };

  await transporter.sendMail(mailData);
}

module.exports = sendTicketByMail;
