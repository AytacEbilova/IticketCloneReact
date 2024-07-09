
import nodemailer from 'nodemailer';
import { jsPDF } from 'jspdf';


async function sendTicketByMail(email, content) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "bd89u19l1@code.edu.az",
      pass: "rjxl uguw vzut zhfa",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // const doc = new jsPDF();
  // doc.text("Order Details", 10, 10);
  // orders.forEach(({ event, order }, index) => {
  //   doc.text(
  //     `${index + 1}. Event: ${event.title}, Seat: ${order.seat}, Price: ${event.price} ₼`,
  //     10,
  //     20 + index * 10
  //   );
  // });
  // const pdfData = Buffer.from(doc.output("arraybuffer"));

  const mailData = {
    from: "bd89u19l1@code.edu.az",
    to: email,
    subject: "Your Order Details (iTicket.az)",
    text: `${content}`,
    // attachments: [
    //   {
    //     filename: "order.pdf",
    //     content: pdfData,
    //     contentType: "application/pdf",
    //   },
    // ],
  };

  await transporter.sendMail(mailData);
}

export default sendTicketByMail;
