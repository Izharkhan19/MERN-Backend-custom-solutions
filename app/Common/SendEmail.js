const nodemailer = require("nodemailer");

// Function to send registration confirmation email
function sendConfirmationEmail(email, username, password, Registering) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "izhar.khan@softqubes.com",
      pass: "SQT12345@",
    },
  });
  let mailOptions = {};
  if (Registering === "register") {
    mailOptions = {
      from: "izhar.khan@softqubes.com",
      to: email,
      subject: "Registration Successful",
      text: `Hello ${username},\nYour credentials -\n    Username : "${username}",\n    Password :"${password}"\nThank you for registering with us!`,
    };
  } else {
    mailOptions = {
      from: "izhar.khan@softqubes.com",
      to: email,
      subject: "Get Forgetted Password",
      text: `Hello ${username},\nYour Forgetted Details -\n    Username : "${username}",\n    Password :"${password}",\n    Email :"${email}"\nThank you for registering with us!`,
    };
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending registration confirmation email:", error);
    } else {
      console.log("Registration confirmation email sent:", info.response);
    }
  });
}

module.exports = sendConfirmationEmail;
