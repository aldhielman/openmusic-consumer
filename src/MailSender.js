const nodemailer = require("nodemailer");
const autoBind = require("auto-bind");

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    autoBind(this);
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: "Open Music Apps",
      to: targetEmail,
      subject: "Ekspor Playlists",
      text: "Terlampir hasil dari ekspor playlists",
      attachments: [
        {
          filename: "playlists.json",
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
