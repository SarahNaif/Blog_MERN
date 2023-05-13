import nodemailer from "nodemailer";
import {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASSWORD,
} from "../constants";

const sendMail = async (receiverEmail, senderName, subject, text, html) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service:"gmail",
      host: MAIL_HOST,
      port: MAIL_PORT,
      tls: true,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASSWORD,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"${senderName}" <${MAIL_USER}>`, // sender address
      to: receiverEmail, // list of receivers
      subject, // Subject line
      text, // plain text body
      html,
    });
    
  } catch (error) {
    
  } finally {
    return;
  }
};

export default sendMail;