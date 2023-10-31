const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "20201173@aloe.ulima.edu.pe",
    pass: "ieij roqn knma bixo",
  },
});

transporter.verify().then(() => {
  console.log("Ready for sending emails");
});

module.exports = { transporter };
